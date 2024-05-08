import axiosInstance from 'src/utils/axiosReportService';

export function getEquities(params) {
  return axiosInstance.get(`report/lpe?unit=${params.unit}&date=${params.date}`);
}

export function getBusinessUnits() {
  return axiosInstance.get('/units');
}

export function getDownloadEquities(params) {
  return axiosInstance.get(`/report/generate/lpe?unit=${params.unit}&date=${params.date}&type=${params.type}`, { responseType: 'blob' });
}