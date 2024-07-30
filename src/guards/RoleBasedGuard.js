import PropTypes from 'prop-types';
import { Container, Alert, AlertTitle } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getSessionToken } from 'src/utils/axiosReportService';
import jwtDecode from 'jwt-decode';

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  accessibleRoles: PropTypes.array,
  children: PropTypes.node,
};

const RoleType = (role) => {
  if (role === 3) return 'unit';
  if (role === 2) return 'bumdesa';
  if (role === 1) return 'kanpus';
};

export default function RoleBasedGuard({ accessibleRoles, children }) {
  const router = useRouter();
  const path = router.pathname.split('/')[1];
  const token = getSessionToken();
  const user = jwtDecode(token);
  const role = RoleType(user?.sub?.role);
  console.log('role', role);
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
    if ((path === 'unit' && role === 'unit') 
      || (path === 'manager' && role === 'unit')
      || (path === 'employee' && role === 'bumdesa')) {
      // || (path === 'bumdesa' && (role === 'bumdesa' || role === 'unit'))) {
      router.push('/403');
    }
  }, [path, role, router]);

  if ((path === 'unit' && role === 'unit') 
    || (path === 'manager' && role === 'unit')
    || (path === 'employee' && role === 'bumdesa')) {
    // || (path === 'bumdesa' && (role === 'bumdesa' || role === 'unit'))) {
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