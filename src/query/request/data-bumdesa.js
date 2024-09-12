import axiosReport from 'src/utils/axiosReportService';

export function getListBumdesa(params) {
  return axiosReport.get('/report/summary-bumdesa', { params });
}

export function downloadBumdesa(param) {
  return axiosReport.get(`/report/generate/summary-bumdesa`, {
    params: param,
    responseType: 'blob',
  });
}
