import axiosInstance from 'src/utils/axiosReportService';

export function getLedgers(params) {
  return axiosInstance.get(`report/ledger`, { params });
}
