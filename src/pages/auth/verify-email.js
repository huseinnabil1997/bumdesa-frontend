// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
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
import axiosCore from 'src/utils/axiosCoreService';
import axiosAuth from 'src/utils/axios';
// import { setSession } from 'src/utils/jwt';
import { StyledLoadingButton } from 'src/theme/custom/Button';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: '100vw',
  width: '100%',
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
  backgroundImage: 'url("/image/email-verification.svg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
}));

// ----------------------------------------------------------------------

export default function Login() {
  const [error, setError] = useState('');
  const [isExpired, setIsExpired] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchVerifyEmailUnit = async (unit_verify) => {
    setLoading(false);
    try {
      await axiosCore.post('/business-units/email-verify', { unit_verify });
      setLoading(false);
      setIsExpired(false);
      setError('');
      // setSession(null);
    } catch (error) {
      console.log('error verifyEmail', error);
      setIsExpired(true);
      setError(error?.message);
      setLoading(false);
    }
  };

  const fetchVerifyEmailSupervisor = async (inspector_verify) => {
    setLoading(false);
    try {
      await axiosAuth.post('/business-units/email-verify', { inspector_verify });
      setLoading(false);
      setIsExpired(false);
      setError('');
      // setSession(null);
    } catch (error) {
      console.log('error verifyEmail', error);
      setIsExpired(true);
      setError(error?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (router.query.unit_verify) {
      fetchVerifyEmailUnit(router.query.unit_verify);
    }
    if (router.query.inspector_verify) { 
      fetchVerifyEmailSupervisor(router.query.inspector_verify);
    }
  }, [router.query.unit_verify, router.query.inspector_verify]);

  return (
    <Page title="Verify Email">
      <RootStyle>
        {/* <Container> */}
        {!loading && (
          <ContentStyle>
            {isExpired ? (
              <Box sx={{ maxWidth: 480, mx: 'auto' }}>
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ justifyContent: 'center', alignItems: 'center', mt: '10px' }}
                >
                  <Image
                    visibleByDefault
                    disabledEffect
                    src="/image/delete_active_unit.svg"
                    alt="Verify Email"
                    sx={{ width: '216px', height: '216px', mb: 3 }}
                  />
                  <Typography fontSize="24px" fontWeight={700} color="#292929" paragraph>
                    {error}
                  </Typography>
                  <Typography textAlign="center" fontSize="16px" fontWeight={500} color="#666666">
                    Silakan hubungi admin BUM Desa Anda untuk mengirimkan kembali link verifikasi.
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box sx={{ maxWidth: 480, mx: 'auto' }}>
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ justifyContent: 'center', alignItems: 'center', mt: '10px' }}
                >
                  <Image
                    visibleByDefault
                    disabledEffect
                    src="/image/email-verification-success.svg"
                    alt="Verifikasi email berhasil"
                    sx={{ width: '216px', height: '216px', mb: 3 }}
                  />
                  <Typography fontSize="24px" fontWeight={700} color="#292929" paragraph>
                    Email Anda Telah Terverifikasi
                  </Typography>
                  <Typography fontSize="16px" fontWeight={500} color="#666666">
                    Verifikasi Anda telah berhasil diproses.
                  </Typography>
                  <Typography fontSize="16px" fontWeight={500} color="#666666">
                    Anda dapat menggunakan akun Anda untuk mengakses
                  </Typography>
                  <Typography fontSize="16px" fontWeight={500} color="#666666" mb={3}>
                    semua fitur yang tersedia.
                  </Typography>
                  <StyledLoadingButton
                    sx={{ width: 432, height: 48, fontSize: '16px', fontWeight: 700 }}
                    variant="contained"
                    onClick={() => router.push(PATH_AUTH.login)}
                  >
                    Kembali ke Halaman Login
                  </StyledLoadingButton>
                </Box>
              </Box>
            )}
          </ContentStyle>
        )}
      </RootStyle>
    </Page>
  );
}
