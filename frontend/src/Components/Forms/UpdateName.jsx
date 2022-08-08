import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/user-slice';
import host from '../../utilites/host';

const API_URL = `${host()}users/updateMe/`;

const UpdateName = () => {
  const dispatch = useDispatch();
  const [newName, setNewName] = useState('');
  const { user } = useSelector((state) => state.user);

  const name = user.data.user.name;
  const jwt = user.token;

  useEffect(() => {
    setNewName(name);
  }, [name, user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: newName,
    };
    let config = {
      headers: {
        Authorization: 'Bearer ' + jwt,
      },
    };

    const res = await axios.patch(API_URL, data, config);

    if (res.status === 200) {
      dispatch(updateUser(res.data.data.user));
    }
  };

  const onchange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <h4>Update Name</h4>
      <Form onSubmit={onSubmit}>
        <Container>
          <Row>
            <Form.Group className="mb-3" controlId="name">
              <Form.Control
                type="text"
                name="name"
                value={newName}
                onChange={onchange}
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
    </div>
  );
};

export default UpdateName;
