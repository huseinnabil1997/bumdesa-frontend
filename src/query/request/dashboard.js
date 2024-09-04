import axiosInstance from 'src/utils/axiosReportService';

export function getSales(params) {
  return axiosInstance.get(`report/dashboard/penjualan`, { params });
}

export function getFinances(params) {
  return axiosInstance.get('report/dashboard/keuangan', { params });
}

export function getProfileLoss(params) {
  return axiosInstance.get(`report/dashboard/laba-rugi`, { params });
}

export function getDemographic() {
  return axiosInstance.get(`dashboard/demografi`);
}

export function getStatistics() {
  return axiosInstance.get(`dashboard/static`);
}

export function getProvinceSummary(params) {
  return axiosInstance.get(`dashboard/demografi/summary`, { params });
}
