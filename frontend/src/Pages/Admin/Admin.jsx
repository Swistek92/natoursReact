import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Admin = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (user.data.user.role !== 'admin') {
      navigate('/');
    }
  });

  return <div>Admin</div>;
};

export default Admin;
