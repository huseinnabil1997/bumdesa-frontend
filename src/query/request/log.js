import axiosInstance from 'src/utils/axiosCoreService';

export function getLogs(params) {
  return axiosInstance.get(`logs/activity`, { params });
}

export function downloadLog(param) {
  return axiosInstance.get(`logs/generate/activity`, {
    params: param,
    responseType: 'blob',
  });
}
