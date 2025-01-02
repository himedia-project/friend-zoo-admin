import { API_SERVER_HOST } from '../config/apiConfig';
import axiosInstance from './axiosInstance';
import axios from 'axios';

const host = `${API_SERVER_HOST}/api/admin/content`;

export const getList = async (pageParam) => {
  const { page, size, sort, name, divisionId } = pageParam;
  const response = await axiosInstance.get(`${host}/list`, {
    params: {
      page: page,
      size: size,
      sort: sort,
      searchTerm: name,
      divisionId: divisionId,
    },
  });
  return response.data;
};

export const getOne = async (contentId) => {
  const response = await axiosInstance.get(`${host}/${contentId}`);
  return response.data;
};

export const register = async (content) => {
  const header = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axiosInstance.post(`${host}`, content, header);
  return response.data;
};

export const modify = async (contentId, content) => {
  const header = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axiosInstance.put(
    `${host}/${contentId}`,
    content,
    header,
  );
  return response.data;
};

export const remove = async (contentId) => {
  const response = await axiosInstance.delete(`${host}/${contentId}`);
  return response.data;
};

export const getImageView = async (fileName) => {
  const response = await axios.get(`${host}/view/${fileName}`);
  return response.data;
};
