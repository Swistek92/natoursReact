import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const UpdatePassword = () => {
  const [passwords, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    contrimPassword: '',
  });

  const sumbitHandler = () => {};
  return (
    <div>
      <h4>Update Password</h4>
      <Form onSubmit={sumbitHandler}>
        <Container>
          <Row>
            <Form.Group className="mb-3" controlId="currentPassword">
              <Form.Label>Current Password</Form.Label>

              <Form.Control
                type="password"
                name="currentPassword"
                // value={newName}
                onChange={onchange}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>New Password</Form.Label>

              <Form.Control
                type="password"
                name="password"
                // value={newName}
                onChange={onchange}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Paswword</Form.Label>

              <Form.Control
                type="password"
                name="confirmPassword"
                // value={newName}
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

export default UpdatePassword;
