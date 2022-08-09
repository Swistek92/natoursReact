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
import UpdateName from '../../Components/Forms/UpdateName';
import UpdateImg from '../../Components/Forms/UpdateImg';
import UpdatePassword from '../../Components/Forms/UpdatePassword';
import Spinner from '../../Components/Spinner/Spinner';
import { updateUser } from '../../store/user-slice';

import host from '../../utilites/host';
import { updateSettings } from './UpdateSettings';

const API_URL = `${host()}users/updateMe/`;

const User = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = user.data.user.name;
  const email = user.data.user.email;
  const jwt = user.token;
  const role = user.data.user.role;
  let img = user.data.user.photo;
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newImg, setNewImg] = useState();
  const [data, setData] = useState({
    name: '',
    email: '',
    image: null,
  });
  // console.log(user.data.user);
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate, name]);

  useEffect(() => {}, [img, navigate]);

  const onChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onChangeImg = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e,
    }));
  };

  const submitHanlder = async (e) => {
    e.preventDefault();

    let data = new FormData();

    data.append('name', newName);
    data.append('email', newEmail);
    data.append('photo', newImg);

    const res = await axios({
      method: 'PATCH',
      url: API_URL,
      data,
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    });
    console.log('res', res);
    console.log(res.data.data.user);
    dispatch(updateUser(res.data.data.user));
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center mb-4">
        <img
          alt="da"
          style={{ height: '30vh', maxHeight: '40vh' }}
          src={`/img/users/${img}`}
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
                <Form>
                  <Container>
                    <Row>
                      <Form.Group className="mb-3" controlId="photo">
                        <Form.Control
                          className="form-control"
                          type="file"
                          name="photo"
                          onChange={(e) => {
                            console.log(e.target.files[0]);
                            setNewImg(e.target.files[0]);
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
                      <Button onClick={submitHanlder}>Edit </Button>
                    </Row>
                  </Container>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default User;
