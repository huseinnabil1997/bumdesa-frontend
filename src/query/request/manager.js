import axios from 'src/utils/axiosCoreService';

export function getOrganizations(params) {
  return axios.get('/organizations', { params });
}

export function getOrganizationDetail(id) {
  return axios.get(`/organizations/${id}`);
}

export function updateOrganization({ id, payload, headers }) {
  return axios.patch(`/organizations/${id}`, payload, { headers });
}

export function addOrganization({ payload, headers }) {
  return axios.post(`/organizations`, payload, { headers });
}

export function deleteOrganization(id) {
  return axios.delete(`/organizations/${id}`);
}

export function getPositions(params) {
  return axios.get('/positions', { params });
}

