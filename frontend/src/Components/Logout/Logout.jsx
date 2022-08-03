import React from 'react';
import { Button, NavLink } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../../store/user-slice';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logouthandler = async () => {
    dispatch(logout());
    navigate('/');
  };

  return <Button onClick={logouthandler}>Logout</Button>;
};

export default Logout;
