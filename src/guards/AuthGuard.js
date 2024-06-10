import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// hooks
import useAuth from '../hooks/useAuth';
// import Login from '../pages/auth/login';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isInitialized } = useAuth();

  const isLogin = localStorage.getItem('token') ?? sessionStorage.getItem('token');

  const { router, pathname, push } = useRouter();

  const [requestedLocation, setRequestedLocation] = useState(null);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      setRequestedLocation(null);
      push(requestedLocation);
    }
  }, [pathname, push, requestedLocation]);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isLogin) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    // return <Login />;
    window.location.href = '/auth/login'
  }

  if (router?.asPath?.includes('/auth')) return <>{children}</>;
  else if (isLogin) return <>{children}</>;
  return <></>;
}
