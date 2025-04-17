import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // update if your backend is on a different port

export const registerUser = async (formData) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, formData);
  return response.data;
};