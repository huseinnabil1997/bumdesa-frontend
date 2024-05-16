import axiosInstance from 'src/utils/axiosReportService';

export function getLedgers(params) {
  return axiosInstance.get(`report/ledger`, { params });
}

export function downloadLedger(params) {
  return axiosInstance.get(`report/generate/ledger`, {
    params,
    responseType: 'blob',
  });
}
