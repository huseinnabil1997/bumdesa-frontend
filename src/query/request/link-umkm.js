import axiosCore from 'src/utils/axiosCoreService';

export function createLink() {
  return axiosCore.post(`integration-linkumkm`);
}

export function getLink() {
  return axiosCore.get(`integration-linkumkm`);
}
