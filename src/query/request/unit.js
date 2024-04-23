import axiosInstance from 'src/utils/axiosCoreService';

export function getUnits(params) {
  return axiosInstance.get('/business-units', { params });
}
