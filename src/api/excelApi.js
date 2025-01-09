import axiosInstance from './axiosInstance';

// product excel register
export const registerProductExcel = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axiosInstance.post(
    `/product/excel/register`,
    formData,
  );
  return response.data;
};

// product excel download
export const downloadProductExcel = async (idList) => {
  const response = await axiosInstance.post(
    `/product/excel/download`,
    { idList: idList },
    {
      responseType: 'blob',
      headers: {
        Accept:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Type': 'application/json',
      },
      transformResponse: [(data) => data],
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
    `/content/excel/register`,
    formData,
  );
  return response.data;
};
