import axiosInstance from 'src/utils/axiosReportService';

export function getProfits(params) {
  return axiosInstance.get(`report/laba-rugi?unit=${params.unit}&date=${params.date}`);
  // return axiosInstance.get('report/laba-rugi?unit=38&date=2024-04');
}

export function getBusinessUnits() {
  return axiosInstance.get('/units');
}

export function getDownloadProfits(params) {
  return axiosInstance.get(`/report/generate/laba-rugi?unit=${params.unit}&date=${params.date}&type=${params.type}`);
}