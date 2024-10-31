import axios from 'src/utils/axios';

export function getSupervisors(param) {
  return axios.get('inspector', { params: param });
}

export function getSupervisor(id) {
  return axios.get(`inspector/${id}`);
}

export function createSupervisor(payload) {
  return axios.post(`inspector`, payload);
}

export function updateSupervisor({ id, payload }) {
  return axios.patch(`inspector/${id}`, payload);
}

export function deleteSupervisor(id) {
  return axios.delete(`inspector/${id}`);
}
