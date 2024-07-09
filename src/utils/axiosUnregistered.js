import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || '',
  headers: {
    Authorization: getSessionToken(),
  },
});

const checkAuth = (error) => {
  if ([401].includes(error.response?.status ?? 0)) {
    localStorage.removeItem('@token');
    sessionStorage.removeItem('@token');

    if (window.location.pathname !== '/auth/login/') {
      setTimeout(() => {
        window.location.href = '/auth/login';
      }, 5000);
    }
  }

  if ([403].includes(error.response?.status ?? 0)) {
    window.location.href = '/403';
  }

  return Promise.reject((error.response && error.response.data) || 'Something went wrong');
};

axiosInstance.interceptors.response.use((response) => response, checkAuth);

export function getSessionToken() {
  // Check if window is defined before accessing localStorage
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('@token') ?? sessionStorage.getItem('@token');
    return token ? `Bearer ${token}` : undefined;
  }
  return undefined;
}

export default axiosInstance;
