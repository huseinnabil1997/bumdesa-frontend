import axios from 'src/utils/axiosCoreService';

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

export function generateEvidenceNumber() {
  return axios.get('number-of-evidence');
}
