import { API_SERVER_HOST } from '../config/apiConfig';
import axiosInstance from './axiosInstance';

const host = `${API_SERVER_HOST}/api/admin`;

export const getProductCategoryList = async () => {
  const response = await axiosInstance.get(`${host}/product/category/list`);
  return response.data;
};

export const getContentCategoryList = async () => {
  const response = await axiosInstance.get(`${host}/content/category/list`);
  return response.data;
};
