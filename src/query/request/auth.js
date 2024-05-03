import axiosUnregistered from 'src/utils/axiosUnregistered';
import axios from 'src/utils/axiosCoreService';

export function getRegistrationSequence(sequence) {
  return axiosUnregistered.get('/signup-form', { params: { sequence } });
}

export function getMenus() {
  return axios.get('/menus');
}
