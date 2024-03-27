import axios from 'src/utils/axios';

export function getJurnals() {
  return axios.get('https://c33121c9c0d541f1a89cbf035bf19571.api.mockbin.io/');
}
