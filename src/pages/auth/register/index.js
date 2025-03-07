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
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import { LoadingButton } from '@mui/lab';

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

  const { verify, resendOtp } = useAuth();

  const mdUp = useResponsive('up', 'lg');

  const [isSuccess, setSuccess] = useState(false);
  const [otp, setOtp] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [countdown, setCountdown] = useState(300);
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      const res = await verify({ id, otp });
      if (res.code === 200) {
        localStorage.setItem('@token', res.data.token_auth);
        enqueueSnackbar(res.message, { variant: 'success' });
        window.location.href = '/auth/register/step-one';
      } else enqueueSnackbar(res.message, { variant: 'error' });
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: 'error' });
    }
  };

  const handleResendOtp = async () => {
    try {
      resetCountdown();
      setLoading(true);
      const res = await resendOtp({ id });
      if (res.code === 200) startCountdown();
      else enqueueSnackbar(res.message, { variant: 'error' });
      setLoading(false);
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: 'error' });
      setLoading(false);
    }
  };

  const startCountdown = () => {
    setSent(true);
    let timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      setCountdown(0);
    }, 300000); // 300000 ms (5 menit)
  };

  const resetCountdown = () => {
    setSent(false);
    setCountdown(300);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      router.push('/auth/login');
    };

    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [router]);

  return (
    <GuestGuard>
      <Page title="Registrasi">
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
              {!isSuccess && (
                <Card sx={{ p: 5 }}>
                  <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                    <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                      <Typography variant="h4" gutterBottom>
                        Buat Akun BUM Desa
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        Silakan isi form berikut untuk membuat akun
                      </Typography>
                    </Box>
                  </Stack>

                  <RegisterForm
                    setEmail={setEmail}
                    setSuccess={setSuccess}
                    setId={setId}
                    startCountdown={startCountdown}
                  />

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

                  <StyledLoadingButton
                    size="large"
                    fullWidth
                    sx={{ mt: 3 }}
                    type="submit"
                    variant="contained"
                    loading={false}
                    onClick={onSubmit}
                  >
                    Lanjutkan
                  </StyledLoadingButton>

                  <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                    Tidak mendapat OTP?
                    {(!sent || countdown === 0) && (
                      <LoadingButton onClick={handleResendOtp} loading={isLoading} type="button">
                        <Typography variant="subtitle2">
                          {isLoading ? 'Mengirim' : 'Kirim Ulang'}
                        </Typography>
                      </LoadingButton>
                    )}
                    {sent && countdown > 0 && (
                      <Typography sx={{ textDecoration: 'underline' }} variant="subtitle2">
                        Kirim Ulang ({formatTime(countdown)})
                      </Typography>
                    )}
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
