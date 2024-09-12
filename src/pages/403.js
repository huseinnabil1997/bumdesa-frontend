// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// routes
// hooks
// guards
// components
import Page from '../components/Page';
// sections
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import Image from 'src/components/Image';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(() => ({
  maxWidth: '100vw',
  width: '100%',
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundImage: 'url("/image/email-verification.svg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
}));

// ----------------------------------------------------------------------

export default function Page403() {
  const router = useRouter();
  const userData = useSelector((state) => state.user.userData);

  const isLogin = localStorage.getItem('token') || sessionStorage.getItem('token');

  return (
    <Page title="403 Akses Ditolak">
      <RootStyle>
        {/* <Container> */}
        <ContentStyle>
          <Box sx={{ maxWidth: 500, mx: 'auto' }}>
            <Box
              display="flex"
              flexDirection="column"
              sx={{ justifyContent: 'center', alignItems: 'center', mt: '10px', textAlign: 'center' }}
            >
              <Typography variant="h3" paragraph>
                Maaf, akses ditolak!
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.
              </Typography>
              <Image
                visibleByDefault
                disabledEffect
                src="/image/delete_active_unit.svg"
                alt="403"
                sx={{ width: '216px', height: '216px', m: 5 }}
              />
              <StyledLoadingButton
                sx={{ width: 432, height: 48, fontSize: '16px', fontWeight: 700 }}
                variant="contained"
                onClick={() => router.push(isLogin ? userData.role === 1 ? PATH_DASHBOARD.kanpus.dashboard : PATH_DASHBOARD.root : '/auth/login')}>
                Kembali ke Halaman Utama
              </StyledLoadingButton>
            </Box>
          </Box>
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}