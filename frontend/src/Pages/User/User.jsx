import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  Accordion,
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import Spinner from '../../Components/Spinner/Spinner';
import { updateUser } from '../../store/user-slice';

import host from '../../utilites/host';
import { updateSettings } from './UpdateSettings';

const API_URL = `${host()}users/updateMe/`;
const API_URL2 = `${host()}users/logoImg/`;
const API_URL3 = `${host()}users/me/`;

const User = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = user.data.user.name;
  const id = user.data.user.id;
  const email = user.data.user.email;
  const jwt = user.token;
  const role = user.data.user.role;
  let img = user.data.user.photo;
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  // const [newImg, setNewImg] = useState();
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const submitHanlder = async (e) => {
    e.preventDefault();

    let data = new FormData();

    data.append('name', newName);
    data.append('email', newEmail);
    //  data.append('photo', newImg);

    console.log(data);
    const res = await axios({
      method: 'PATCH',
      url: API_URL,
      // url: '/api/v1/users/updateMe',
      data: data,
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    });
    console.log(res.data.data.user);

    if (res.status === 200) {
      dispatch(updateUser(res.data.data.user));
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error('AHHHHHHHH!!');
      setErrMsg('something went wrong!');
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    // console.log(base64EncodedImag;
    try {
      const response = await fetch(API_URL2, {
        method: 'POST',
        body: JSON.stringify({ data: base64EncodedImage, id: id }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + user.token,
        },
      });

      if (response.status === 200) {
        const user1 = await axios.get(API_URL3, {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        });
        console.log(user1.data.data.data);
        dispatch(updateUser(user1.data.data.data));
      }
      setFileInputState('');
      setPreviewSource('');
      setSuccessMsg('Image uploaded successfully');
    } catch (err) {
      console.error(err);
      setErrMsg('Something went wrong!');
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center mb-4">
        <img
          alt="da"
          style={{ height: '30vh', maxHeight: '40vh' }}
          src={`${img}`}
        />
      </div>
      <div className="text-center">
        <p>
          <b>Role:</b> {role === 'admin' ? <b>Administrator</b> : role}
        </p>
        {role === 'admin' && (
          <h4>
            <Link to="/admin">AdminPanel</Link>
          </h4>
        )}
        <p>
          <b>Name: </b> {name}
        </p>
        <p>
          <b>E-mail: {email}</b>
        </p>
        <div>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Update Name</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Container>
                    <Row>
                      <Form.Group className="mb-3" controlId="name">
                        <Form.Control
                          type="text"
                          name="name"
                          onChange={(e) => {
                            setNewName(e.target.value);
                          }}
                        />
                      </Form.Group>
                    </Row>
                    <Row>
                      <Button onClick={submitHanlder}>Edit </Button>
                    </Row>
                  </Container>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
            {/* NAME */}
            <Accordion.Item eventKey="1">
              {/* IMG */}
              <Accordion.Header>Update profile image</Accordion.Header>
              <Accordion.Body>
                <Form onSubmit={handleSubmitFile}>
                  <Container>
                    <Row>
                      <Form.Group className="mb-3" controlId="photo">
                        <Form.Control
                          className="form-control"
                          type="file"
                          name="photo"
                          onChange={handleFileInputChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row>
                      <Button type="submit">Edit </Button>
                    </Row>
                  </Container>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
            {/* IMG */}
            <Accordion.Item eventKey="2">
              <Accordion.Header>Update your email</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Container>
                    <Row>
                      <Form.Group className="mb-3" controlId="email">
                        <Form.Control
                          className="form-control"
                          type="email"
                          name="email"
                          onChange={(e) => {
                            setNewEmail(e.target.value);
                          }}
                        />
                      </Form.Group>
                    </Row>
                    <Row>
                      <Button type="submit">Edit </Button>
                    </Row>
                  </Container>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          {previewSource && (
            <div className="container">
              <h1> Preview new Profile Image</h1>
              <img
                style={{ height: '30vh', maxHeight: '40vh' }}
                src={previewSource}
                alt={'chosen'}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
