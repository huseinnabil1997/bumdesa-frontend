import axiosInstance from 'src/utils/axiosReportService';

export function getCashFlows(params) {
  return axiosInstance.get(`report/lak`, { params });
}

export function getBusinessUnits() {
  return axiosInstance.get('/units');
}

export function getDownloadCashflows(params) {
  return axiosInstance.get(`/report/generate/lak`, { params, responseType: 'blob' });
}

