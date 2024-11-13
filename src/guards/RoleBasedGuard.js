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

const isAccessDenied = (path, subPath, role) => {
  const accessRules = {
    unit: ['unit', 'pengawas'],
    dashboard: ['kanpus'],
    manager: ['unit', 'pengawas'],
    employee: ['bumdesa', 'pengawas'],
    'link-umkm': ['unit', 'kanpus', 'pengawas'],
    kanpus: ['bumdesa', 'unit', 'pengawas'],
    setting: ['kanpus'],
    profile: ['kanpus'],
    log: ['kanpus', 'pengawas'],
    faqs: ['kanpus', 'pengawas'],
    jurnal: ['kanpus', 'pengawas'],
    ledger: ['kanpus', 'pengawas'],
    profit: ['pengawas', 'kanpus'],
    report: ['kanpus'],
  };

  if (subPath === 'profit') {
    return accessRules[subPath]?.includes(role);
  }

  if (path) {
    return accessRules[path]?.includes(role);
  }

  return false;
};

export default function RoleBasedGuard({ children }) {
  const router = useRouter();
  const path = router.pathname.split('/')[1];
  const subPath = router.pathname.split('/')[2];
  const currentRole = useCurrentRole();

  useEffect(() => {
    if (isAccessDenied(path, subPath, currentRole)) {
      setTimeout(() => {
        window.location.href = '/403';
      }, 3000);
    }
  }, [path, subPath, currentRole, router]);

  if (isAccessDenied(path, subPath, currentRole)) {
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