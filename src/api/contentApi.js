import axiosInstance from './axiosInstance';
import axios from 'axios';

export const getList = async (pageParam) => {
  const { page, size, sort, name, divisionId } = pageParam;
  const response = await axiosInstance.get(`/content/list`, {
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
  const response = await axiosInstance.get(`/content/${contentId}`);
  return response.data;
};

export const register = async (content) => {
  const header = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axiosInstance.post(`/content`, content, header);
  return response.data;
};

export const modify = async (contentId, content) => {
  const header = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axiosInstance.put(
    `/content/${contentId}`,
    content,
    header,
  );
  return response.data;
};

export const remove = async (contentId) => {
  const response = await axiosInstance.delete(`/content/${contentId}`);
  return response.data;
};
