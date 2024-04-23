import axios from 'src/utils/axios';
import axiosInstance from 'src/utils/axiosCoreService';

export function getProfits() {
  return axios.get('https://8cd325cc6b2c428e96ca7ccc9d1155e8.api.mockbin.io/');
}

export function getBusinessUnits() {
  return axiosInstance.get('/units');
}
