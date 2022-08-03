import axios from 'axios';

const API_URL = '/api/v1/users/';
// const API_URL = 'http://localhost:3001/api/v1/users/';

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'signup', userData);
  console.log(userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  console.log(userData);
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
