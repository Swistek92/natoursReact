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

  const [newImg, setNewImg] = useState([]);
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );
  // const img = user.data.user.photo;
  const jwt = user.token;

  // useEffect(() => {
  //   setNewImg(img);
  // }, [img]);

  const submitHandler = async (event) => {
    event.preventDefault();
    // console.log(event.target[0].value);
    let formData = new FormData();

    formData.append('photo', event.target[0].value);

    let config = {
      headers: {
        Authorization: 'Bearer ' + jwt,
      },
    };
    console.log(formData.keys);
    try {
      const res = await axios.patch(API_URL, formData, config);

      if (res.status === 200) {
        console.log('dispatching status 200');
        console.log(res.data.data.user);
        await dispatch(updateUser(res.data.data.user));
        console.log(user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h4>Update Image</h4>
      <Form onSubmit={submitHandler}>
        <Container>
          <Row>
            <Form.Group className="mb-3" controlId="image">
              <Form.Control
                type="file"
                name="image"
                onChange={(e) => {
                  setNewImg(e.target.files[0]);
                  // console.log(e.target.files[0]);
                  // console.log(newImg);
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
