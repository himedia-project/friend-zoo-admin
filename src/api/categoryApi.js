import axiosInstance from './axiosInstance';

// list
export const getProductCategoryList = async () => {
  const response = await axiosInstance.get(`/product/category/list`);
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
  const response = await axiosInstance.post(`/product/category`, data, header);
  return response.data;
};

// remove
export const removeProductCategory = async (id) => {
  const response = await axiosInstance.delete(`/product/category/${id}`);
  return response.data;
};

// list
export const getContentCategoryList = async () => {
  const response = await axiosInstance.get(`/content/category/list`);
  return response.data;
};

// register
export const registerContentCategory = async (data) => {
  const header = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axiosInstance.post(`/content/category`, data, header);
  return response.data;
};

// remove
export const removeContentCategory = async (id) => {
  const response = await axiosInstance.delete(`/content/category/${id}`);
  return response.data;
};
