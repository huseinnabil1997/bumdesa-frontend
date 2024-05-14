import axios from 'src/utils/axiosCoreService';

export function sendOtp(payload) {
  return axios.post(`otp`, payload);
}

export function changeUserEmail({ payload }) {
  return axios.patch(`users/email`, payload);
}