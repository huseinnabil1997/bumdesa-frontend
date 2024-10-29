import axiosUnregistered from 'src/utils/axiosUnregistered';
import axios from 'src/utils/axiosCoreService';
import axiosInstance from 'src/utils/axiosCoreService';

// const token = getSessionToken();

export function getRegistrationSequence(sequence) {
  return axiosUnregistered.get('/signup-form', {
    params: { sequence },
    // headers: { Authorization: token },
  });
}

export function getMenus() {
  return axios.get('/menus');
}

export function getUserMe() {
  return axiosInstance.get('/users/me');
}
