import PropTypes from 'prop-types';
import { Container, Alert, AlertTitle } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  accessibleRoles: PropTypes.array,
  children: PropTypes.node,
};

const useCurrentRole = () => {
  const userData = useSelector((state) => state.user.userData);

  if (userData.role === 1) return 'kanpus';
  if (userData.role === 2) return 'bumdesa';
  if (userData.role === 3) return 'unit';
  else return 'pengawas';
};

export default function RoleBasedGuard({ children }) {
  const router = useRouter();
  const path = router.pathname.split('/')[1];
  const currentRole = useCurrentRole();

  // if (!accessibleRoles.includes(currentRole)) {
  //   return (
  //     <Container>
  //       <Alert severity="error">
  //         <AlertTitle>Izin Ditolak</AlertTitle>
  //         Anda tidak memiliki izin untuk mengakses halaman ini
  //       </Alert>
  //     </Container>
  //   );
  // }

  useEffect(() => {
    if (
      (path === 'unit' && currentRole === 'unit') ||
      (path === 'dashboard' && currentRole === 'kanpus') ||
      (path === 'manager' && currentRole === 'unit') ||
      (path === 'employee' && currentRole === 'bumdesa') ||
      (path === 'kanpus' && (currentRole === 'bumdesa' || currentRole === 'unit'))
    ) {
      router.push('/403');
    }
  }, [path, currentRole, router]);

  if (
    (path === 'unit' && currentRole === 'unit') ||
    (path === 'dashboard' && currentRole === 'kanpus') ||
    (path === 'manager' && currentRole === 'unit') ||
    (path === 'employee' && currentRole === 'bumdesa') ||
    (path === 'kanpus' && (currentRole === 'bumdesa' || currentRole === 'unit'))
  ) {
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
