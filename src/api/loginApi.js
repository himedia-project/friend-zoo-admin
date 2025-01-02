import axiosInstance from './axiosInstance';
import axios from 'axios';
import { API_SERVER_HOST } from '../config/apiConfig';

const host = `${API_SERVER_HOST}/api/admin/member`;

export const loginPost = async (email, password) => {
  const response = await axios.post(
    `${host}/login`,
    { email, password },
    {
      withCredentials: true,
    },
  );
  console.log(response.data);
  return response.data;
};
