import axiosUnregistered, { getSessionToken } from 'src/utils/axiosUnregistered';
import axios from 'src/utils/axios';

const isRegis = !!getSessionToken();
const service = isRegis ? axiosUnregistered : axios;

console.log(isRegis);

export function getProvincies() {
  return service.get('/address/province');
}

export function getCities(param) {
  return service.get('/address/city', { params: param });
}

export function getDistricts(param) {
  return service.get('/address/district', { params: param });
}

export function getSubdistricts(param) {
  return service.get('/address/sub-district', { params: param });
}

export function getPostalCode(param) {
  return service.get('/address/postal-code', { params: param });
}
