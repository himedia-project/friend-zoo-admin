import { API_SERVER_HOST } from '../config/apiConfig';
import axiosInstance from './axiosInstance';

const host = `${API_SERVER_HOST}/api/admin/order`;

export const getList = async (pageParam) => {
  const { page, size, sort, name, year } = pageParam;
  const response = await axiosInstance.get(`${host}/list`, {
    params: {
      page: page,
      size: size,
      sort: sort,
      searchTerm: name,
      year: year,
    },
  });
  return response.data;
};
