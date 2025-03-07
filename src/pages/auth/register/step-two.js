// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Container, Typography, Button } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// guards
import GuestGuard from '../../../guards/GuestGuard';
// components
import Page from '../../../components/Page';
import Image from '../../../components/Image';
// sections
import { useEffect, useState } from 'react';
import VerticalLinearStepper from '../../../sections/auth/register/Stepper';
import StepTwoForm from 'src/sections/auth/register/StepTwoForm';
import { useRouter } from 'next/router';
import { PATH_AUTH } from 'src/routes/paths';
import { setRegisSession } from 'src/utils/jwt';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionStyle = styled('div')(() => ({
  position: 'sticky',
  top: 0,
  left: 0,
  width: '100%',
  maxWidth: '50%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100vh',
  //   '#bg': { opacity: 0.7 },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 540,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

const SideContainer = styled(Stack)(() => ({
  position: 'absolute',
  top: '0',
  height: '100vh',
  width: '100%',
  fontWeight: 600,
  fontSize: 22,
  color: 'white',
}));

const SideContent = styled(Stack)(() => ({
  height: '100vh',
  width: '100%',
  maxWidth: '360px',
  margin: 'auto',
}));

// ----------------------------------------------------------------------

export default function Register() {
  const mdUp = useResponsive('up', 'lg');

  const [isSuccess, setSuccess] = useState(false);

  const router = useRouter();

  useEffect(() => {
    localStorage.setItem('previousUrl', '/auth/register/step-two');
  }, []);

  const handleLogin = () => {
    setRegisSession();
    router.push(PATH_AUTH.login);
  };

  return (
    <GuestGuard>
      <Page title="Login">
        <RootStyle>
          {mdUp && (
            <SectionStyle>
              <Image id="bg" visibleByDefault disabledEffect src="/image/login.png" alt="login" />
              <SideContainer>
                <SideContent justifyContent="center">
                  <Box alignItems="center" bgcolor="white" borderRadius={2} width="fit-content" mx="auto" p={2} mb={6} mt={5}>
                    <Image
                      visibleByDefault
                      disabledEffect
                      src="/image/fa_bumdesa_digital.png"
                      alt="bri"
                      sx={{ height: 60 }}
                    />
                  </Box>
                  <Typography sx={{ mt: 5, maxWidth: '420px', mx: 'auto', fontWeight: 'bold' }}>
                    Akun Anda berhasil dibuat, silakan lengkapi informasi berikut untuk melanjutkan
                  </Typography>
                  <VerticalLinearStepper activeStep={1} />
                </SideContent>
              </SideContainer>
            </SectionStyle>
          )}

          <Container maxWidth="md">
            <ContentStyle>
              {!isSuccess && (
                <Card sx={{ p: 5 }}>
                  <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                    <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                      <Typography variant="h4" gutterBottom>
                        Tambahkan Data Pengurus BUM Desa
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        Silakan masukkan informasi pengurus.
                      </Typography>
                    </Box>
                  </Stack>

                  <StepTwoForm setSuccess={setSuccess} />
                </Card>
              )}
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Anda sudah punya akun?{' '}
                <Button onClick={handleLogin}>
                  <Typography variant="subtitle2">Masuk Sekarang</Typography>
                </Button>
              </Typography>
            </ContentStyle>
          </Container>
        </RootStyle>
      </Page>
    </GuestGuard>
  );
}
