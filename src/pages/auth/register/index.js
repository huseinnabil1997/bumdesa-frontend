// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Button, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useResponsive from '../../../hooks/useResponsive';
// guards
import GuestGuard from '../../../guards/GuestGuard';
// components
import Page from '../../../components/Page';
import Image from '../../../components/Image';
import OtpInput from 'react-otp-input';
// sections
import { RegisterForm } from '../../../sections/auth/register';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSnackbar } from 'notistack';

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

export default function Register() {
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const { verify } = useAuth();

  const mdUp = useResponsive('up', 'md');

  const [isSuccess, setSuccess] = useState(false);
  const [otp, setOtp] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');

  const onSubmit = async () => {
    try {
      await verify({ id, otp });

      router.push('/auth/register/step-one');
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: 'error' });
    }
  };

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
              {!isSuccess && (
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

                  <RegisterForm setEmail={setEmail} setSuccess={setSuccess} setId={setId} />

                  <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                    Apakah Anda sudah memiliki Akun?{' '}
                    <Button onClick={() => router.push(PATH_AUTH.login)} type="button">
                      <Typography variant="subtitle2">Masuk</Typography>
                    </Button>
                  </Typography>
                </Card>
              )}

              {isSuccess && (
                <Card sx={{ p: 5 }}>
                  <Stack direction="row" alignItems="center" sx={{ mb: 3 }}>
                    <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                      <Image
                        visibleByDefault
                        disabledEffect
                        src="/image/smartphone.svg"
                        alt="bri"
                        sx={{ width: 100, m: 'auto', mb: 1 }}
                      />
                      <Typography variant="h4" gutterBottom>
                        Verifikasi Akun Anda
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        Masukkan 6 digit kode OTP yang dikirimkan ke email
                      </Typography>
                      <Typography sx={{ color: '#1078CA', textDecoration: 'underline' }}>
                        {email}
                      </Typography>
                    </Box>
                  </Stack>

                  <Box sx={{ width: '100%' }}>
                    <OtpInput
                      numInputs={6}
                      onChange={setOtp}
                      renderSeparator={<span> </span>}
                      value={otp}
                      inputType={'tel'}
                      renderInput={(props) => <input {...props} />}
                      shouldAutoFocus
                      inputStyle={{
                        width: '100%',
                        height: '56px',
                        margin: '4px',
                        borderRadius: 8,
                        border: '1px solid #ccc',
                      }}
                    />
                  </Box>

                  <Button
                    size="large"
                    fullWidth
                    sx={{ mt: 3 }}
                    type="submit"
                    variant="contained"
                    loading={false}
                    onClick={onSubmit}
                  >
                    Lanjutkan
                  </Button>

                  <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                    Tidak mendapat OTP?
                    <Button onClick={() => router.push(PATH_AUTH.register)}>
                      <Typography variant="subtitle2">Kirim Ulang</Typography>
                    </Button>
                  </Typography>
                </Card>
              )}
            </ContentStyle>
          </Container>
        </RootStyle>
      </Page>
    </GuestGuard>
  );
}
