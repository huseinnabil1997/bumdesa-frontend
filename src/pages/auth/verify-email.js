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
import AlertVerifyEmail from 'src/components/modal/VerifyEmail';
import { useEffect, useState } from 'react';
import { PATH_AUTH } from 'src/routes/paths';
import useAuth from 'src/hooks/useAuth';
import { useSnackbar } from 'notistack';
import axiosInstance from 'src/utils/axiosCoreService';

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
  const [alertVerify, setAlertVerify] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const router = useRouter();
  const { verifyEmail } = useAuth();

  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem('token');
  console.log('token', token)

  const fetchVerifyEmail = async () => {
    try {
      const res = await axiosInstance.post('/business-units/email-verify', { unit_otp: router.query.unit_otp });
      // const res = await verifyEmail({ unit_otp: router.query.unit_otp });
      console.log('res verifyEmail', res);
      setAlertVerify(true);
    } catch (error) {
      console.log('error verifyEmail', error)
      enqueueSnackbar(error?.message, { variant: 'error' });
    }
  }

  useEffect(() => {
    fetchVerifyEmail();
    // setAlertVerify(true);
    // setIsExpired(true);
  }, [])

  return (
    <Page title="Verify Email">
      <RootStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            {isExpired ? (
              <Box sx={{ maxWidth: 480, mx: 'auto' }}>
                <Typography variant="h3" paragraph>
                  Link pada email sudah kadaluarsa!
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
                  Silakan periksa email Anda!
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Email konfirmasi telah dikirim, mohon segera cek kotak masuk Anda.
                </Typography>
                <Box display="flex" sx={{ justifyContent: 'center', alignItems: 'center', mt: '10px' }}>
                  <Image
                    visibleByDefault
                    disabledEffect
                    src="/image/delete_unit.svg"
                    alt="Verify Email"
                    sx={{ width: '216px', height: '216px' }}
                  />
                </Box>
              </Box>
            )}
          </ContentStyle>
          <AlertVerifyEmail
            open={alertVerify}
            onClose={() => {
              setAlertVerify(false);
              router.replace(PATH_AUTH.login)
            }}
          />
        </Container>
      </RootStyle>
    </Page>
  );
}
