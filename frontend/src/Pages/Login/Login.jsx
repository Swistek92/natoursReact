import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import Spinner from '../../Components/Spinner/Spinner';
import { login, reset } from '../../store/user-slice';
// import { userActions } from '../../store/user-slice';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );
  const [error, setError] = useState(message);

  useEffect(() => {
    if (isError) {
      setError(message);
    }

    if (user || isSuccess) {
      navigate('/');
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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center mb-4">
        <Image style={{ maxHeight: '30vh' }} src="/img/users/default.jpg" />
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
  );
};

export default Login;
