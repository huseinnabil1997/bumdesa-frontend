import PropTypes from 'prop-types';
import { Container, Alert, AlertTitle } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  children: PropTypes.node,
};

const useCurrentRole = () => {
  const { unit_id } = useSelector(state => state.user.userData);
  return unit_id !== 0 ? 'unit' : 'bumdesa';
};

const RESTRICTED_PATHS = {
  unit: ['unit', 'manager', 'kanpus'],
  bumdesa: ['employee', 'kanpus'],
};

export default function RoleBasedGuard({ children }) {
  const router = useRouter();
  const path = router.pathname.split('/')[1];
  const currentRole = useCurrentRole();
  
  console.log('rolebaseguard', currentRole);

  useEffect(() => {
    if (RESTRICTED_PATHS[currentRole]?.includes(path)) {
      router.push('/403');
    }
  }, [path, currentRole, router]);

  if (RESTRICTED_PATHS[currentRole]?.includes(path)) {
    return (
      <Container>
        <Alert severity="error">
          <AlertTitle>Izin Ditolak</AlertTitle>
          Anda tidak memiliki izin untuk mengakses halaman ini
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
}