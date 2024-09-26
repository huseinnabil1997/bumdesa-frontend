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

export function getAreaSummary(params) {
  return axiosInstance.get(`dashboard/demografi/summary`, { params });
}

export function getDetailSummary(params) {
  if (params.area) {
    params['province'] = params.area.substring(0, 2);
    params['city'] = params.area.substring(2, 4);
    params['district'] = params.area.substring(4, 6);

    delete params.area;
  }

  return axiosInstance.get(`report/summary-bumdesa`, { params });
}

export function downloadAreaSummary(param) {
  return axiosInstance.get(`/dashboard/generate/demografi/summary`, {
    params: param,
    responseType: 'blob',
  });
}
