import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Register user
const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

// Login user
const loginUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

// Get current user
const getCurrentUser = async (token) => {
  const config = {
    headers: {
      'x-auth-token': token
    }
  };
  const response = await axios.get(`${API_URL}/me`, config);
  return response.data;
};

export { registerUser, loginUser, getCurrentUser };