// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Button, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// guards
import GuestGuard from '../../guards/GuestGuard';
// components
import Page from '../../components/Page';
import Image from '../../components/Image';
// sections
import { RegisterForm } from '../../sections/auth/register';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionStyle = styled('div')(() => ({
  position: 'relative',
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

export default function Register() {
  const { method } = useAuth();

  const router = useRouter();

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <GuestGuard>
      <Page title="Login">
        <RootStyle>
          {mdUp && (
            <SectionStyle>
              <Image visibleByDefault disabledEffect src="/image/login.svg" alt="login" />
              <Title>
                <Image
                  visibleByDefault
                  disabledEffect
                  src="/image/bri-square.svg"
                  alt="bri"
                  sx={{ width: 100, m: 'auto', mb: 1 }}
                />
                <Typography variant="h3">BUM Desa Digital</Typography>
                <Typography sx={{ mt: '100px', maxWidth: '420px', mx: 'auto' }}>
                  Nikmati layanan BUM Desa Digital, Mudah untuk membuat Laporan keuangan Kamu sendiri.
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
                      Silahkan isi form berikut untuk membuat akun
                    </Typography>
                  </Box>
                </Stack>

                <RegisterForm />

                <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                  Apakah Anda sudah memiliki Akun?{' '}
                  <Button onClick={() => router.push(PATH_AUTH.register)}>
                    <Typography variant="subtitle2">Masuk</Typography>
                  </Button>
                </Typography>
              </Card>
            </ContentStyle>
          </Container>
        </RootStyle>
      </Page>
    </GuestGuard>
  );
}
