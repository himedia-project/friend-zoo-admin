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
  const response = await axiosInstance.post(
    `${host}/product/excel/download`,
    { idList: idList },
    {
      responseType: 'blob',
      headers: {
        Accept: 'application/octet-stream',
        'Content-Type': 'application/json',
      },
      // axios가 헤더를 처리하는 방식 설정
      transformResponse: [(data) => data], // 응답 데이터 변환 방지
      maxRedirects: 0,
      validateStatus: (status) => status >= 200 && status < 400,
    },
  );
  return response;
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
