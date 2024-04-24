import axiosInstance from 'src/utils/axiosReportService';

export function getBalances(params) {
  return axiosInstance.get(`report/laba-rugi?unit=${params.unit}&date=${params.date}`);
}

export function getBusinessUnits() {
  return axiosInstance.get('/units');
}
