import PropTypes from 'prop-types';
import { Container, Alert, AlertTitle } from '@mui/material';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  accessibleRoles: PropTypes.array,
  children: PropTypes.node,
};

const useCurrentRole = () => {
  const userData = useSelector(state => state.user.userData);
  const role = userData.unit_id !== 0 ? 'unit' : 'bumdesa';
  return role;
};

export default function RoleBasedGuard({ accessibleRoles, children }) {
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

  if ((path === 'unit' && currentRole === 'unit') 
    || (path === 'manager' && currentRole === 'unit')
    || (path === 'employee' && currentRole === 'bumdesa')) {
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