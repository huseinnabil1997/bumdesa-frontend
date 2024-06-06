import jwtDecode from 'jwt-decode';
//
import axios from './axios';
import axiosCoreService from './axiosCoreService';
import axiosReportService from './axiosReportService';

// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

//  const handleTokenExpired = (exp) => {
//   let expiredTimer;

//   window.clearTimeout(expiredTimer);
//   const currentTime = Date.now();
//   const timeLeft = exp * 1000 - currentTime;
//   console.log(timeLeft);
//   expiredTimer = window.setTimeout(() => {
//     console.log('expired');
//     // You can do what ever you want here, like show a notification
//   }, timeLeft);
// };

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('token', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    axiosCoreService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    axiosReportService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // This function below will handle when token is expired
    // const { exp } = jwtDecode(accessToken);
    // handleTokenExpired(exp);
  } else {
    localStorage.removeItem('token');
    localStorage.removeItem('@menu');
    localStorage.removeItem('userData');
    if (localStorage.getItem('remember') === 'false') {
      localStorage.removeItem('email');
      localStorage.removeItem('remember');
    }
    delete axios.defaults.headers.common.Authorization;
    delete axiosCoreService.defaults.headers.common.Authorization;
    delete axiosReportService.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession };
