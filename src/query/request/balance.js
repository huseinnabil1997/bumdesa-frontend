import axiosInstance from 'src/utils/axiosReportService';

export function getBalances(params) {
  return axiosInstance.get(`report/neraca?unit=${params.unit}&date=${params.date}`);
}

export function getBusinessUnits() {
  return axiosInstance.get('/units');
}
