import axiosInstance from 'src/utils/axiosCoreService';
import axiosInstanceReport from 'src/utils/axiosReportService';

export function getListUnit(params) {
  return axiosInstanceReport.get('/report/summary-unit', { params });
}

export function getUnitById(id) {
  return axiosInstance.get(`/business-units/${id}`);
}

export function downloadUnit(param) {
  return axiosInstanceReport.get(`/report/generate/summary-unit`, {
    params: param,
    responseType: 'blob',
  });
}
