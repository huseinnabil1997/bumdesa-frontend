import axiosInstance from 'src/utils/axiosCoreService';

export function getLogs(params) {
  return axiosInstance.get(`logs/activity`, { params });
}
