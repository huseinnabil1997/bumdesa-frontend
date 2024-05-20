import axiosInstance from 'src/utils/axiosReportService';

export function getEquities(params) {
  return axiosInstance.get(`report/lpe`, { params });
}

export function getBusinessUnits() {
  return axiosInstance.get('/units');
}

export function getDownloadEquities(params) {
  return axiosInstance.get(`/report/generate/lpe`, { params, responseType: 'blob' });
}

