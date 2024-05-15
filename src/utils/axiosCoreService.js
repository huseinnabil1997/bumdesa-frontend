import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CORE_SERVICE || '',
  // headers: {
  //   Authorization: getSessionToken(),
  // },
});

const checkAuth = (error) => {
  if ([401, 403].includes(error.response?.status ?? 0)) {
    // if ([444].includes(error.response?.status ?? 0)) {
    localStorage.removeItem('token');
    window.location.href = '/auth/login';
  }

  return Promise.reject((error.response && error.response.data) || 'Something went wrong');
};

axiosInstance.interceptors.response.use((response) => response, checkAuth);

export function getSessionToken() {
  // Check if window is defined before accessing localStorage
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    return token ? `Bearer ${token}` : undefined;
  }
  return undefined;
}

export default axiosInstance;
