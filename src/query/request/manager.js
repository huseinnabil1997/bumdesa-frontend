import axios from 'src/utils/axiosCoreService';

export function deleteManager(id) {
  return axios.delete(`manager/${id}`);
}