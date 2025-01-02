import { API_SERVER_HOST } from '../config/apiConfig';
import axiosInstance from './axiosInstance';
import axios from 'axios';

const host = `${API_SERVER_HOST}/api/admin/member`;

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
