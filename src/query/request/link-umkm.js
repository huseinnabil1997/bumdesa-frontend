import axiosCore from 'src/utils/axiosCoreService';

export function createLink(payload) {
  return axiosCore.post(`integration-linkumkm`, payload);
}

export function getLink() {
  return axiosCore.get(`integration-linkumkm`);
}
