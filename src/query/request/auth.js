import axios from 'src/utils/axiosUnregistered';

export function getRegistrationSequence(sequence) {
  return axios.get('/signup-form', { params: { sequence } });
}
