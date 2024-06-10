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
