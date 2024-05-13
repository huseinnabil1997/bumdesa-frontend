import axiosInstance from 'src/utils/axiosCoreService';

export function getFaqs(params) {
  return axiosInstance.get('/faq', { params });
}
