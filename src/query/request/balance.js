import axiosInstance from 'src/utils/axiosReportService';

export function getBalances(params) {
  return axiosInstance.get(`report/neraca`, { params });
}

export function getBusinessUnits() {
  return axiosInstance.get('/units');
}

export function getDownloadBalances(params) {
  return axiosInstance.get(`/report/generate/neraca`, { params, responseType: 'blob' });
}
