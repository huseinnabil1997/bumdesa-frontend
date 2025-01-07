import axios from 'src/utils/axiosCoreService';
import axiosMinio from 'axios';

export function getJurnals(param) {
  return axios.get('journals', { params: param });
}

export function getJurnal(id) {
  return axios.get(`journals/${id}`);
}

export function createJurnal(payload) {
  return axios.post(`journals`, payload);
}

export function updateJurnal({ id, payload }) {
  return axios.patch(`journals/${id}`, payload);
}

export function deleteJurnal(id) {
  return axios.delete(`journals/${id}`);
}

export function downloadJurnal(param) {
  return axios.get(`journals/report-generate`, {
    params: param,
    responseType: 'blob',
  });
}

export function downloadJurnalTemplate(param) {
  return axiosMinio.get(`${process.env.NEXT_PUBLIC_BUMDESA_ASSET}/journal-template/template-jurnal.xlsm`, {
    params: param,
    responseType: 'blob',
  });
}

export function generateEvidenceNumber(params) {
  return axios.get('number-of-evidence', { params });
}
