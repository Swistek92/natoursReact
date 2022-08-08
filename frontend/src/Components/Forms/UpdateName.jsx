import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/user-slice';

const UpdateImg = () => {
  const dispatch = useDispatch();

  const [newImg, setNewImg] = useState('');
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );
  const img = user.data.user.photo;
  const jwt = user.token;

  useEffect(() => {
    setNewImg(img);
  }, [img]);

  const submitHandler = async (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append('photo', newImg);

    let config = {
      headers: {
        Authorization: 'Bearer ' + jwt,
      },
    };

    const res = await axios.patch(
      // 'http://localhost:3001/api/v1/users/updateMe',
      '/api/v1/users/updateMe',
      formData,
      config
    );
    console.log(res);

    if (res.status === 200) {
      await dispatch(updateUser(res.data.data.user));
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
