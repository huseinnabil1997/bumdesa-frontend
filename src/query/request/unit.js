import axiosInstance from 'src/utils/axiosCoreService';
import axios from 'src/utils/axios';

export function getUnits(params) {
  return axiosInstance.get('/business-units', { params });
}

export function getUnitById(id) {
  return axiosInstance.get(`/business-units/${id}`);
}

export function getSectors() {
  return axios.get('/sector');
}
