import axiosInstance from './axiosInstance';

export const getList = async (pageParam) => {
  const { page, size, sort, name, year } = pageParam;
  const response = await axiosInstance.get(`/order/list`, {
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
