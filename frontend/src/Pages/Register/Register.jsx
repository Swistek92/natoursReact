import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import Spinner from '../../Components/Spinner/Spinner';
import { register } from '../../store/user-slice';
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { name, email, password, confirmPassword } = formData;

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
    if (isLoading) {
      return <Spinner />;
    }
  }, [isError, user, message, isSuccess, navigate, isLoading]);

  const onchange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendData = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Password are not same!');
    }

    const userData = {
      name,
      email,
      password,
      passwordConfirm: confirmPassword,
    };

    dispatch(register(userData));
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center mb-4">
        <Image style={{ maxHeight: '20vh' }} src="/img/users/default.jpg" />
      </div>

      <Form>
        <p>{error}</p>
        <Form.Group className="mb-3" controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="name"
            onChange={onchange}
          />
        </Form.Group>
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
        <Form.Group className="mb-3" controlId="passwordConfirm">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Confirm password "
            onChange={onchange}
          />
        </Form.Group>
        <Button variant="primary" onClick={sendData}>
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
