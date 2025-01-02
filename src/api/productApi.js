import { API_SERVER_HOST } from '../config/apiConfig';
import axiosInstance from './axiosInstance';
import axios from 'axios';

const host = `${API_SERVER_HOST}/api/admin/product`;

// /api/admin/product/list
export const getList = async (pageParam) => {
  const { page, size, sort, name, categoryId } = pageParam;
  const response = await axiosInstance.get(`${host}/list`, {
    params: {
      page: page,
      size: size,
      sort: sort,
      searchTerm: name,
      categoryId: categoryId,
    },
  });
  return response.data;
};

// /api/admin/product/{id}
export const getOne = async (productId) => {
  const response = await axiosInstance.get(`${host}/${productId}`);
  return response.data;
};

// /api/admin/product
export const register = async (product) => {
  const header = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const response = await axiosInstance.post(`${host}`, product, header);
  return response.data;
};

// /api/admin/product/{id}
export const modify = async (productId, product) => {
  const header = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axiosInstance.put(
    `${host}/${productId}`,
    product,
    header,
  );
  return response.data;
};

// /api/admin/product/{id}
export const remove = async (productId) => {
  const response = await axiosInstance.delete(`${host}/${productId}`);
  return response.data;
};

// /api/admin/product/view/{fileName}
export const getImageView = async (fileName) => {
  const response = await axios.get(`${host}/view/${fileName}`);
  return response.data;
};
