import axiosInstance from 'src/utils/axiosCoreService';

export function getProfiles(id) {
  return axiosInstance.get(`bumdesa/${id}`);
}

export function updateProfile({ id, payload, headers }) {
  return axiosInstance.patch(`bumdesa/${id}`, payload, { headers });
}
