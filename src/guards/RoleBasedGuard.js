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
  const userData = useSelector((state) => state.user.userData);

  if (userData.role === 1) return 'kanpus';
  if (userData.role === 2) return 'bumdesa';
  if (userData.role === 3) return 'unit';
  if (userData.role === 4) return 'pengawas';
  else return 'pengawas';
};

const isAccessDenied = (path, role) => {
  const accessRules = {
    unit: ['unit', 'pengawas'],
    dashboard: ['kanpus'],
    manager: ['unit', 'pengawas'],
    employee: ['bumdesa', 'pengawas'],
    'link-umkm': ['unit', 'kanpus', 'pengawas'],
    kanpus: ['bumdesa', 'unit', 'pengawas'],
    setting: ['kanpus'],
    profile: ['kanpus'],
  };

  return accessRules[path]?.includes(role);
};

export default function RoleBasedGuard({ children }) {
  const router = useRouter();
  const path = router.pathname.split('/')[1];
  const currentRole = useCurrentRole();

  useEffect(() => {
    if (isAccessDenied(path, currentRole)) {
      router.push('/403');
    }
  }, [path, currentRole, router]);

  if (isAccessDenied(path, currentRole)) {
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