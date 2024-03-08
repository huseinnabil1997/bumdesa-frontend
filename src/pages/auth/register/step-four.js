// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Container, Typography } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
import useResponsive from '../../../hooks/useResponsive';
// guards
import GuestGuard from '../../../guards/GuestGuard';
// components
import Page from '../../../components/Page';
import Image from '../../../components/Image';
// sections
import { useRouter } from 'next/router';
import { useState } from 'react';
import VerticalLinearStepper from '../../../sections/auth/register/Stepper';
import StepFourForm from 'src/sections/auth/register/StepFourForm';
import { CheckCircle } from '@mui/icons-material';
import { BtnLightPrimary } from 'src/theme/custom/Button';

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
  const { method } = useAuth();

  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const [isSuccess, setSuccess] = useState(false);

  return (
    <GuestGuard>
      <Page title="Login">
        <RootStyle>
          {mdUp && (
            <SectionStyle>
              <Image id="bg" visibleByDefault disabledEffect src="/image/login.svg" alt="login" />
              <SideContainer>
                <SideContent justifyContent="center">
                  <Image
                    visibleByDefault
                    disabledEffect
                    src="/image/bri-square.svg"
                    alt="bri"
                    sx={{ width: 160, mx: 'auto', mb: 1, mt: 5 }}
                  />
                  <Typography sx={{ mt: 5, maxWidth: '420px', mx: 'auto', fontWeight: 'bold' }}>
                    Akun Anda berhasil dibuat, silakan lengkapi informasi berikut untuk melanjutkan
                  </Typography>
                  <VerticalLinearStepper activeStep={isSuccess ? 4 : 3} />
                </SideContent>
              </SideContainer>
            </SectionStyle>
          )}

          <Container maxWidth="md">
            <ContentStyle>
              {!isSuccess && (
                <Card sx={{ p: 5 }} elevation={3}>
                  <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                    <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                      <Typography variant="h4" gutterBottom>
                        Tambahkan Data Manager Unit Usaha
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        Silahkan masukkan informasi Manager Unit Usaha.
                      </Typography>
                    </Box>
                  </Stack>

                  <StepFourForm setSuccess={setSuccess} />
                </Card>
              )}

              {isSuccess && (
                <Stack>
                  <CheckCircle sx={{ m: 'auto', fontSize: 60 }} color="success" />
                  <Typography align="center" variant="h4">
                    Selamat!
                  </Typography>
                  <Typography align="center" variant="body2">
                    Akun Anda telah terdaftar.
                  </Typography>
                  <BtnLightPrimary
                    onClick={() => router.push('/auth/login')}
                    sx={{ width: 300, mx: 'auto', mt: 3 }}
                    size="large"
                  >
                    <Typography variant="subtitle2">Masuk</Typography>
                  </BtnLightPrimary>
                </Stack>
              )}
            </ContentStyle>
          </Container>
        </RootStyle>
      </Page>
    </GuestGuard>
  );
}
