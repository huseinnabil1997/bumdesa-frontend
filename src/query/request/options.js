import axiosUnregistered, { getSessionToken } from 'src/utils/axiosUnregistered';
import axios from 'src/utils/axios';
import axiosCore from 'src/utils/axiosCoreService';

const isRegis = !!getSessionToken();
const service = isRegis ? axiosUnregistered : axios;

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

export function getSector(param) {
  return service.get('/sector', { params: param });
}

export function getAccountOpt() {
  return axiosCore.get('/accounts');
}

export function getCashFlowOpt(params) {
  return axiosCore.get('/cash-flow', { params });
}

export function getUnitOpt() {
  return axiosCore.get('/units');
}
