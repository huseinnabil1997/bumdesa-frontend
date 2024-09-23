import PropTypes from 'prop-types';
import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const userData = useSelector((state) => state.user.userData);
  const { push } = useRouter();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      if (userData.role === 1) {
        push(PATH_DASHBOARD.kanpus.dashboard);
      } else {
        push(PATH_DASHBOARD.root);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return <>{children}</>;
}
