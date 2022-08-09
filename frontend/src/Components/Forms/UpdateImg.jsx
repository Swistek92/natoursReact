import axios from 'axios';
import { compareSync } from 'bcryptjs';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/user-slice';
import host from '../../utilites/host';

const API_URL = `${host()}users/updateMe/`;

const UpdateImg = () => {
  // console.log(API_URL);
  const dispatch = useDispatch();
  const state = {
    img: [],
  };
  const [newImg, setNewImg] = useState([]);
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );
  // const img = user.data.user.photo;
  const jwt = user.token;

  useEffect(() => {
    console.log(newImg);
  }, [newImg]);

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log('NEW IMG', newImg);
    let formData = new FormData();

    formData.append('photo', newImg);
    let config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: 'Bearer ' + jwt,
      },
    };
    try {
      const res = await axios.patch(API_URL, formData, config);
      dispatch(updateUser(res.data.data.user));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <h4>Update Image</h4>
      <Form onSubmit={submitHandler}>
        <Container>
          <Row>
            <Form.Group className="mb-3" controlId="img">
              <Form.Control
                className="form-control"
                type="file"
                name="image"
                onChange={(e) => {
                  setNewImg(e.target.files[0]);
                }}
              />
            </Form.Group>
          </Row>
          <Row>
            <Button variant="primary" type="submit">
              Edit
            </Button>
          </Row>
        </Container>
      </Form>
    </>
  );
};

export default UpdateImg;
