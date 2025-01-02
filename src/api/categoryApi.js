import { API_SERVER_HOST } from '../config/apiConfig';
import axiosInstance from './axiosInstance';

const host = `${API_SERVER_HOST}/api/admin`;

// list
export const getProductCategoryList = async () => {
  const response = await axiosInstance.get(`${host}/product/category/list`);
  return response.data;
};

// register
export const registerProductCategory = async (data) => {
  // name, logo(file) 등록 formData
  const header = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axiosInstance.post(
    `${host}/product/category`,
    data,
    header,
  );
  return response.data;
};

// remove
export const removeProductCategory = async (id) => {
  const response = await axiosInstance.delete(`${host}/product/category/${id}`);
  return response.data;
};

// list
export const getContentCategoryList = async () => {
  const response = await axiosInstance.get(`${host}/content/category/list`);
  return response.data;
};

// register
export const registerContentCategory = async (data) => {
  const header = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axiosInstance.post(
    `${host}/content/category`,
    data,
    header,
  );
  return response.data;
};

// remove
export const removeContentCategory = async (id) => {
  const response = await axiosInstance.delete(`${host}/content/category/${id}`);
  return response.data;
};
