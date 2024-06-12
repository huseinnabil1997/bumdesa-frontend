// @mui
import { styled } from '@mui/material/styles';
import { Card, Container, Stack, Typography } from '@mui/material';
// layouts
import Layout from '../../layouts';
// guards
import GuestGuard from '../../guards/GuestGuard';
// components
import Page from '../../components/Page';
import Image from '../../components/Image';
// hooks
import useResponsive from 'src/hooks/useResponsive';
import { AccountChangePassword } from 'src/sections/@dashboard/user/account';

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

  const mdUp = useResponsive('up', 'md');

  return (
    <GuestGuard>
      <Page title="Mengatur Ulang Kata Sandi" sx={{ height: 1 }}>
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
                  sx={{ width: 160, m: 'auto', mb: 1 }}
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
                <>
                  <Typography variant="h3" paragraph align='center'>
                    Buat Kata Sandi Baru
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', mb: 5 }} align='center'>
                    Silahkan buat kata sandi demi keamanan akun anda.
                  </Typography>

                  <AccountChangePassword />
                </>
              </Card>
            </ContentStyle>
          </Container>
        </RootStyle>
      </Page>
    </GuestGuard>
  );
}
