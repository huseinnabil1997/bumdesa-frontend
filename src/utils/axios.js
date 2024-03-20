import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || '',
  headers: {
    Authorization: getSessionToken(),
  },
});

const checkAuth = (error) => {
  if ([401, 403].includes(error.response?.status ?? 0)) {
    sessionStorage.removeItem('token');
    window.location.href = '/auth/login';
  }

  return Promise.reject((error.response && error.response.data) || 'Something went wrong');
};

axiosInstance.interceptors.response.use((response) => response, checkAuth);

export function getSessionToken() {
  // Check if window is defined before accessing sessionStorage
  if (typeof window !== 'undefined') {
    const token = sessionStorage.getItem('token');
    return token ? `Bearer ${token}` : undefined;
  }
  return undefined;
}

export default axiosInstance;
