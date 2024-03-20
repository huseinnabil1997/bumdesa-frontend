import axios from 'src/utils/axios';

export function getProvincies() {
  return axios.get('/address/province');
}

export function getCities(param) {
  return axios.get('/address/city', { params: param });
}

export function getDistricts(param) {
  return axios.get('/address/district', { params: param });
}

export function getSubdistricts(param) {
  return axios.get('/address/sub-district', { params: param });
}

export function getPostalCode(param) {
  return axios.get('/address/postal-code', { params: param });
}
