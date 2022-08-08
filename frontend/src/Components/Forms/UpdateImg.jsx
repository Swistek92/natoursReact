import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/user-slice';
import host from '../../utilites/host';

const API_URL = `${host()}users/updateMe/`;

const UpdateImg = () => {
  // console.log(API_URL);
  const dispatch = useDispatch();

  const [newImg, setNewImg] = useState();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );
  const img = user.data.user.photo;
  const jwt = user.token;

  useEffect(() => {
    setNewImg(img);
  }, [img]);

  const submitHandler = async (event) => {
    event.preventDefault();

    let formData = new FormData();

    formData.append('photo', newImg);
    console.log(newImg);

    let config = {
      headers: {
        Authorization: 'Bearer ' + jwt,
      },
    };

    try {
      const res = await axios.patch('/api/v1/users/updateMe', formData, config);

      if (res.status === 200) {
        console.log('dispatching status 200');
        await dispatch(updateUser(res.data.data.user));
        console.log('200');
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
                  console.log(e.target.files[0]);
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
