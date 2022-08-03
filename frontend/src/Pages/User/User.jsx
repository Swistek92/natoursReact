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
const User = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();
  const name = user.data.user.name;
  const img = user.data.user.photo;
  const jwt = user.token;
  const role = user.data.user.role;

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate, name, img]);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center mb-4">
        <Image
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
          <Accordion defaultActiveKey="0">
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