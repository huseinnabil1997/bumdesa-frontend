import axiosInstance from 'src/utils/axiosCoreService';
import axios, { getSessionToken } from 'src/utils/axios';

export function getListUnit(params) {
  return axiosInstance.get('/business-units/summary', { params });
}

export function getUnitById(id) {
  return axiosInstance.get(`/business-units/${id}`);
}

export function getSectors() {
  return axios.get('/sector', {
    headers: {
      Authorization: getSessionToken(),
    }
  });
}

export function deactivateUnit(id) {
  return axiosInstance.patch(`/business-units/${id}/deactivate`);
}

export function activateUnit(id) {
  return axiosInstance.patch(`/business-units/${id}/activate`);
}

export function downloadUnit(param) {
  return axios.get(`/bumdesa/report-generate`, {
    params: param,
    responseType: 'blob',
  });
}
