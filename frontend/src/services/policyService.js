import axios from 'axios';

const API_URL = 'http://localhost:5000/api/policies';

// Get all policies
const getAllPolicies = async (token) => {
  const config = {
    headers: {
      'x-auth-token': token
    }
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get policy by ID
const getPolicyById = async (id, token) => {
  const config = {
    headers: {
      'x-auth-token': token
    }
  };
  const response = await axios.get(`${API_URL}/${id}`, config);
  return response.data;
};

// Calculate illustration
const calculateIllustration = async (data, token) => {
  const config = {
    headers: {
      'x-auth-token': token
    }
  };
  const response = await axios.post('http://localhost:5000/api/illustrations', data, config);
  return response.data;
};

export { getAllPolicies, getPolicyById, calculateIllustration };