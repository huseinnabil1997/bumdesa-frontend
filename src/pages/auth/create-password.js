// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Container, Typography } from '@mui/material';
// routes
// hooks
import useResponsive from '../../hooks/useResponsive';
// guards
import GuestGuard from '../../guards/GuestGuard';
// components
import Page from '../../components/Page';
import Image from '../../components/Image';
// sections
import CreatePasswordForm from 'src/sections/auth/login/CreatePasswordForm';

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
  // position: 'relative',
  // width: '100%',
  // maxWidth: '50%',
  // display: 'flex',
  // flexDirection: 'column',
  // justifyContent: 'center',
  // height: '100vh',
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
                    sx={{ height: 60, width: '175px' }}
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
                      Buat Kata Sandi Baru
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Silakan buat kata sandi demi keamanan akun Anda.
                    </Typography>
                  </Box>
                </Stack>

                <CreatePasswordForm />
              </Card>
            </ContentStyle>
          </Container>
        </RootStyle>
      </Page>
    </GuestGuard>
  );
}
