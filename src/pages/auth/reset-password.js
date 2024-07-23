import { useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Card, Container, Stack, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// layouts
import Layout from '../../layouts';
// guards
import GuestGuard from '../../guards/GuestGuard';
// components
import Page from '../../components/Page';
import Image from '../../components/Image';
// sections
import { ResetPasswordForm } from '../../sections/auth/reset-password';
// hooks
import useResponsive from 'src/hooks/useResponsive';

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

const Title = styled(Stack)(() => ({
  position: 'absolute',
  top: '35%',
  textAlign: 'center',
  width: '100%',
  margin: 'auto',
  fontWeight: 600,
  fontSize: 22,
  color: 'white',
}));

// ----------------------------------------------------------------------

ResetPassword.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const [sent, setSent] = useState(false);

  // const [countdown, setCountdown] = useState(60);

  const router = useRouter();

  const mdUp = useResponsive('up', 'lg');

  // const startCountdown = () => {
  //   setSent(true);
  //   let timer = setInterval(() => {
  //     setCountdown((prev) => prev - 1);
  //   }, 1000);
  //   setTimeout(() => {
  //     clearInterval(timer);
  //     setCountdown(0);
  //   }, 60000);
  // };

  // const resetCountdown = () => {
  //   setSent(false);
  //   setCountdown(60);
  // };

  // const formatTime = (seconds) => {
  //   const minutes = Math.floor(seconds / 60);
  //   const remainingSeconds = seconds % 60;
  //   return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  // };

  // useEffect(() => {
  //   if (sent) {
  //     startCountdown();
  //   }
  // }, [sent]);

  return (
    <GuestGuard>
      <Page title="Atur ulang Kata Sandi" sx={{ height: 1 }}>
        <RootStyle>
          {mdUp && (
            <SectionStyle>
              <Image visibleByDefault disabledEffect src="/image/login.png" alt="login" />
              <Title>
                <Image
                  visibleByDefault
                  disabledEffect
                  src="/image/bri_square.svg"
                  alt="bri"
                  sx={{ width: 98, m: 'auto', mb: 2.3 }}
                />
                <Image
                  visibleByDefault
                  disabledEffect
                  src="/image/bumdesa_digital.png"
                  alt="bri"
                  sx={{ width: 160, m: 'auto', mb: 2 }}
                />
                <Typography sx={{ mt: '100px', maxWidth: '420px', mx: 'auto' }}>
                  Nikmati layanan BUM Desa Digital, Mudah untuk membuat Laporan keuangan Kamu
                  sendiri.
                </Typography>
              </Title>
            </SectionStyle>
          )}

          <Container maxWidth="sm">
            <ContentStyle>
              <Card sx={{ p: 5 }}>
                <Typography variant="h3" paragraph align="center">
                  Lupa Kata Sandi?
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 5 }} align="center">
                  Silahkan masukkan email akun BUM Desa, untuk memulihkan akun anda.
                </Typography>

                <ResetPasswordForm onSent={() => setSent(true)} sentStatus={sent} />

                <Typography variant="body2" sx={{ mt: 3 }} align="center">
                  {!sent && (
                    <>
                      Anda belum punya akun?{' '}
                      <Button onClick={() => router.push(PATH_AUTH.register)}>
                        <Typography sx={{ textDecoration: 'underline' }} variant="subtitle2">
                          Daftar Sekarang
                        </Typography>
                      </Button>
                    </>
                  )}
                </Typography>
              </Card>
            </ContentStyle>
          </Container>
        </RootStyle>
      </Page>
    </GuestGuard>
  );
}