import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  Accordion,
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { updateUser } from '../../store/user-slice';
import { Link } from 'react-router-dom';
import UpdateName from '../../Components/Forms/UpdateName';
import UpdateImg from '../../Components/Forms/UpdateImg';
import UpdatePassword from '../../Components/Forms/UpdatePassword';
import Spinner from '../../Components/Spinner/Spinner';
const User = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();
  const name = user.data.user.name;
  const jwt = user.token;
  const role = user.data.user.role;
  let img = user.data.user.photo;
  console.log(user.data.user);
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate, name]);

  useEffect(() => {
    if (!img) {
      return navigate('/');
    }
  }, [img, navigate]);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center mb-4">
        <img
          alt="da"
          style={{ height: '30vh', maxHeight: '40vh' }}
          src={`/img/users/${img}`}
        />
      </div>
      <div className="text-center">
        <p>
          <b>Role:</b> {role === 'admin' ? <b>Administrator</b> : role}
        </p>
        {role === 'admin' && (
          <h4>
            <Link to="/admin">AdminPanel</Link>
          </h4>
        )}
        <p>
          <b>Name: </b> {name}
        </p>
        <div>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Update Name</Accordion.Header>
              <Accordion.Body>
                <UpdateName />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Update profile image</Accordion.Header>
              <Accordion.Body>
                <UpdateImg />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Update your password</Accordion.Header>
              <Accordion.Body>
                <UpdatePassword />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default User;
