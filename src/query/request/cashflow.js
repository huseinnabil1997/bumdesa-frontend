import axiosInstance from 'src/utils/axiosReportService';

export function getCashFlows(params) {
  return axiosInstance.get(`report/arus-kas?unit=${params.unit}&date=${params.date}`);
}

export function getBusinessUnits() {
  return axiosInstance.get('/units');
}

export function getDownloadCashflows(params) {
  return axiosInstance.get(`/report/generate/arus-kas?unit=${params.unit}&date=${params.date}&type=${params.type}`, { responseType: 'blob' });
}