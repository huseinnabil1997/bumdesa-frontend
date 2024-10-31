import axiosInstance from 'src/utils/axiosCoreService';
import axios, { getSessionToken } from 'src/utils/axios';

export function getUnits(params) {
  return axiosInstance.get('/business-units', { params });
}

export function getUnitById(id) {
  return axiosInstance.get(`/business-units/${id}`);
}

export function createUnit(payload) {
  return axiosInstance.post(`/business-units`, payload, {
    'Content-Type': 'multipart/form-data',
  });
}

export function updateUnit({ id, payload }) {
  return axiosInstance.patch(`/business-units/${id}`, payload, {
    'Content-Type': 'multipart/form-data',
  });
}

export function resendUnit(id) {
  return axiosInstance.post(`/business-units/resend-verify/${id}`);
}

export function deleteUnit(id) {
  return axiosInstance.delete(`/business-units/${id}`);
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