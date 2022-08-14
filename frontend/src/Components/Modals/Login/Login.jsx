import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/esm/Image';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { modalActions } from '../../../store/modals-slice';
import { reset, login } from '../../../store/user-slice';
import Spinner from '../../Spinner/Spinner';
import Form from 'react-bootstrap/Form';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { showLogin } = useSelector((state) => state.modal);
  const handleClose = () => dispatch(modalActions.hideLogin());
  const showRegister = () => dispatch(modalActions.showRegister());
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );
  const [error, setError] = useState(message);

  useEffect(() => {
    if (isError) {
      setError(message);
    }

    if (user || isSuccess) {
      dispatch(modalActions.hideLogin());
    }

    dispatch(reset());
  }, [isError, user, message, isSuccess, navigate, dispatch]);

  const onchange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    console.log(formData);
    dispatch(login(userData));
  };

  return (
    <>
      <Modal show={showLogin} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <Spinner />
          ) : (
            <div>
              <div className="d-flex align-items-center justify-content-center mb-4">
                <Image
                  style={{ maxHeight: '30vh' }}
                  src="/img/users/default.jpg"
                />
              </div>

              <Form onSubmit={onSubmit}>
                <p>{error}</p>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={onchange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={onchange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Form.Text muted>didnt have acount yet? </Form.Text>
          <Button variant="secondary" onClick={showRegister}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Login;
