// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Container, Typography } from '@mui/material';
// routes
// hooks
import useResponsive from '../../../hooks/useResponsive';
// guards
import GuestGuard from '../../../guards/GuestGuard';
// components
import Page from '../../../components/Page';
import Image from '../../../components/Image';
// sections
import { useEffect } from 'react';
import { LoginFormKanpus } from 'src/sections/auth/login';

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

export default function Login() {

  const mdUp = useResponsive('up', 'lg');

  const token = localStorage.getItem('@token');

  useEffect(() => {
    const envVariables = {
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
      NEXT_PUBLIC_CORE_SERVICE: process.env.NEXT_PUBLIC_CORE_SERVICE,
      NEXT_PUBLIC_REPORT_SERVICE: process.env.NEXT_PUBLIC_REPORT_SERVICE,
      NEXT_PUBLIC_BUMDESA_ASSET: process.env.NEXT_PUBLIC_BUMDESA_ASSET,
      NEXT_PUBLIC_IS_TESTING: process.env.NEXT_PUBLIC_IS_TESTING,
    };
    console.log('env:', envVariables);

    if (token) {
      const previousUrl = localStorage.getItem('previousUrl');
      if (previousUrl) {
        window.location.href = previousUrl;
      }
    }
  }, []);

  return (
    <GuestGuard>
      <Page title="Login">
        <RootStyle>
          {mdUp && (
            <SectionStyle>
              <Image visibleByDefault disabledEffect src="/image/login.png" alt="login" />
              <Title>
                <Box alignItems="center" bgcolor="white" borderRadius={2} width="fit-content" mx="auto" p={2} mb={6} mt={5}>
                  <Image
                    visibleByDefault
                    disabledEffect
                    src="/image/fa_bumdesa_digital.png"
                    alt="bri"
                    sx={{ height: 60 }}
                  />
                </Box>
                {/* <Image
                  visibleByDefault
                  disabledEffect
                  src="/image/bumdesa_digital.png"
                  alt="bri"
                  sx={{ width: 160, m: 'auto', mb: 2 }}
                /> */}
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
                <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                  <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom>
                      Masuk ke BUM Desa
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Silahkan masukkan PN dan password.
                    </Typography>
                  </Box>
                </Stack>

                <LoginFormKanpus />

              </Card>
            </ContentStyle>
          </Container>
        </RootStyle>
      </Page>
    </GuestGuard>
  );
}
