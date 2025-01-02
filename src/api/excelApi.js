import { API_SERVER_HOST } from '../config/apiConfig';
import axiosInstance from './axiosInstance';

const host = `${API_SERVER_HOST}/api/admin`;

// product excel register
export const registerProductExcel = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axiosInstance.post(
    `${host}/product/excel/register`,
    formData,
  );
  return response.data;
};

// product excel download
export const downloadProductExcel = async (idList) => {
  const response = await axiosInstance.get(`${host}/product/excel/download`, {
    params: {
      idList: idList,
    },
    responseType: 'blob',
    headers: {
      Accept: 'application/octet-stream',
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

// content excel register
export const registerContentExcel = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axiosInstance.post(
    `${host}/content/excel/register`,
    formData,
  );
  return response.data;
};
