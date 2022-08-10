import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import host from '../utilites/host';
const API_URL = `${host()}users/`;

// Register user
const register = async (userData) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const response = await axios.post(API_URL + 'signup', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  console.log(userData);
  console.log(API_URL);
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const userService = {
  register,
  logout,
  login,
};

export default userService;
