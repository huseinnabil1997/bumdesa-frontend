// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
// routes
// hooks
// guards
// components
import Page from '../../components/Page';
import Image from '../../components/Image';
// sections
import { useRouter } from 'next/router';
// import AlertVerifyEmail from 'src/components/modal/VerifyEmail';
import { useEffect, useState } from 'react';
import { PATH_AUTH } from 'src/routes/paths';
import axiosInstance from 'src/utils/axiosCoreService';
import { setSession } from 'src/utils/jwt';
import { StyledLoadingButton } from 'src/theme/custom/Button';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const [error, setError] = useState('');
  const [isExpired, setIsExpired] = useState(false);
  const router = useRouter();

  const fetchVerifyEmail = async (unit_verify) => {
    try {
      await axiosInstance.post('/business-units/email-verify', { unit_verify });
      setIsExpired(false);
      setError('');
      setSession(null);
    } catch (error) {
      console.log('error verifyEmail', error);
      setIsExpired(true);
      setError(error?.message);
    }
  }

  useEffect(() => {
    fetchVerifyEmail(router.query.unit_verify);
  }, [])

  return (
    <Page title="Verify Email">
      <RootStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            {isExpired ? (
              <Box sx={{ maxWidth: 480, mx: 'auto' }}>
                <Typography variant="h3" paragraph>
                  {error}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Silahkan hubungi admin BUM Desa Anda untuk mengirimkan kembali link verifikasi.
                </Typography>
                <Box display="flex" sx={{ justifyContent: 'center', alignItems: 'center', mt: '10px' }}>
                  <Image
                    visibleByDefault
                    disabledEffect
                    src="/image/delete_active_unit.svg"
                    alt="Verify Email"
                    sx={{ width: '216px', height: '216px' }}
                  />
                </Box>
              </Box>
            ) : (
              <Box sx={{ maxWidth: 480, mx: 'auto' }}>
                <Typography variant="h3" paragraph>
                  Verifikasi Berhasil!
                </Typography>
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ justifyContent: 'center', alignItems: 'center', mt: '10px' }}
                >
                  <Image
                    visibleByDefault
                    disabledEffect
                    src="/image/registration_success.svg"
                    alt="Verifikasi email berhasil"
                    sx={{ width: '216px', height: '216px', mb: 3 }}
                  />
                  <StyledLoadingButton variant="contained" onClick={() => router.push(PATH_AUTH.login)}>
                    Masuk
                  </StyledLoadingButton>
                </Box>
              </Box>
            )}
          </ContentStyle>
          {/* <AlertVerifyEmail
            open={alertVerify}
            onClose={() => {
              setAlertVerify(false);
              router.replace(PATH_AUTH.login)
            }}
          /> */}
        </Container>
      </RootStyle>
    </Page>
  );
}