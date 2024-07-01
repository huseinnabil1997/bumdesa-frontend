import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { Box, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { Check, Close } from '@mui/icons-material';
import OTPInput from 'react-otp-input';
import Iconify from 'src/components/Iconify';
import { useSnackbar } from 'notistack';
import { useSendOtp } from 'src/query/hooks/setting/useSendOtp';
import { useChangeUserEmail } from 'src/query/hooks/setting/useChangeUserEmail';
import { useRouter } from 'next/router';
import useAuth from 'src/hooks/useAuth';
import { PATH_AUTH } from 'src/routes/paths';
import { useSelector } from 'react-redux';

const AccountInfoSchema = Yup.object().shape({
  email: Yup.string()
    .email('Format email tidak valid')
    .required('Alamat Email wajib diisi'),
  new_email: Yup.string()
    .email('Format email baru tidak valid')
    .required('Alamat Email Baru wajib diisi')
    .test('notEqual', 'Alamat Email Baru tidak boleh sama dengan Email sekarang', function (value) {
      return value !== this.parent.email;
    }),
});

const styles = {
  title: {
    minHeight: 84,
    flexGrow: 1,
    p: '24px',
    justifyContent: 'space-between'
  },
  content: {
    minHeight: 192,
    maxHeight: 432,
    flexGrow: 1,
    px: '24px',
  },
  action: {
    minHeight: 88,
    flexGrow: 1,
    p: '24px',
  },
  textfield: {
    '& .MuiInputBase-root': {
      height: '44px',
    },
    '& .MuiInputBase-input': {
      height: '11px',
    },
    id: {
      backgroundColor: '#CCE8FF',
      borderRadius: '8px',
      '& .MuiInputBase-root': {
        height: '44px',
      },
      "& fieldset": {
        border: 'none',
      },
    }
  },
  button: {
    minHeight: 48,
    maxWidth: 466,
    fontWeight: 700,
    fontSize: '16px'
  },
}

ModalUbahEmail.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  email: PropTypes.string,
};

export default function ModalUbahEmail({ open, onClose, email }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(1);
  const [isClicked, setIsClicked] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const { logout } = useAuth();

  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const userData = useSelector(state => state.user.userData);

  const defaultValues = {
    email: userData.email ?? '',
    new_email: '',
  };

  const methods = useForm({
    resolver: yupResolver(AccountInfoSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState,
    watch,
    setValue,
  } = methods;

  const new_email = watch('new_email');

  const { mutate: onSend, isLoading: sending } = useSendOtp({});

  useEffect(() => {
    setValue('email', userData.email);
  }, [userData.email]);

  const handleResend = () => {
    const payload = {
      email: new_email,
    };
    onSend(payload, {
      onSuccess: () => {
        setIsClicked(true);
        setTimeLeft(60);
        setTimeout(() => {
          setIsClicked(false);
        }, 200);
        setIsSuccess(true);
      },
      onError: (err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      },
    });

  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace(PATH_AUTH.login);

    } catch (error) {
      console.error(error);
    }
  };

  const { mutate: onChange, isLoading: updating } = useChangeUserEmail();

  const onSubmit = () => {
    const payload = {
      old_email: email,
      new_email: new_email,
      otp: otp,
    };
    onChange(
      { payload },
      {
        onSuccess: () => {
          onClose();
          methods.reset();
          setOtp('');
          handleLogout();
          router.push('/auth/login');
          setIsSuccess(false);
          enqueueSnackbar('', {
            variant: 'success',
            content: () => (
              <Box
                display="flex"
                sx={{
                  width: '344px',
                  height: '42px',
                  backgroundColor: '#E1F8EB',
                  padding: '12px',
                  borderRadius: '4px',
                  border: '1px solid #27AE60'
                }}
              >
                <Iconify icon={'eva:checkmark-circle-2-fill'} color="#27AE60" mr={1} />
                <Typography
                  fontWeight={500}
                  color="#525252"
                  fontSize="12px"
                >
                  Alamat Email Baru BUM Desa sudah diperbarui!
                </Typography>
              </Box>
            )
          })
        },
        onError: (err) => {
          enqueueSnackbar(err.message, { variant: 'error' });
        },
      }
    );
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onBackdropClick={() => {
        onClose();
        methods.reset();
        setOtp('');
        setIsSuccess(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          minWidth: '514px',
          minHeight: '364px',
          borderRadius: '8px',
        },
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" sx={styles.title}>
          <Typography color="#292929" fontSize="24px" fontWeight={700}>Ubah Alamat Email</Typography>
          <IconButton onClick={() => {
            onClose();
            methods.reset();
            setOtp('');
            setIsSuccess(false);
          }}>
            <Close />
          </IconButton>
        </Stack>
        <Stack spacing={isSuccess ? 1 : 2} sx={styles.content}>
          <RHFTextField
            name="email"
            label="Alamat Email Sekarang"
            sx={styles.textfield}
            require
            disabled
            value={defaultValues.email}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {userData.email ? <Check color="success" /> : <Close color="error" />}
                </InputAdornment>
              ),
            }}
          />
          <RHFTextField
            name="new_email"
            label="Alamat Email Baru"
            placeholder="Alamat Email Baru"
            sx={{ mb: 2, ...styles.textfield }}
            require
          />
          {isSuccess && (
            <Stack display="flex" spacing={2} flexGrow={1} justifyContent="center" alignItems="center">
              <Typography
                color="#292929"
                fontSize="16px"
                fontWeight={700}
                alignSelf="flex-start"
              >
                Masukkan kode OTP
              </Typography>
              <Typography
                variant="caption"
                fontSize="14px"
                fontWeight={500}
                color="#929393"
                alignSelf="flex-start"
              >
                Kode OTP sudah dikirimkan ke email
                <span style={{ fontSize: '14px', fontWeight: 800 }}>
                  {' '}
                  {new_email}
                </span>
              </Typography>
              <OTPInput
                numInputs={6}
                onChange={setOtp}
                renderSeparator={<span> </span>}
                value={otp}
                inputType={'tel'}
                renderInput={(props) => <input {...props} />}
                shouldAutoFocus
                inputStyle={{
                  marginLeft: 7,
                  marginRight: 7,
                  height: '60px',
                  width: '60px',
                  borderRadius: '6px',
                  border: '2px solid #ccc',
                  fontSize: '26px',
                  fontWeight: 600,
                }}
              />
              <Typography color="#F87304" fontSize="16px" fontWeight={700}>{formatTime()}</Typography>
              <Typography fontSize="14px" fontWeight={600} color="#929393">
                Tidak mendapat OTP?{' '}
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 800,
                    color: timeLeft === 0 ? '#1078CA' : '#B5B6B6',
                    textDecoration: 'underline',
                    opacity: isClicked ? 0.7 : 1,
                    transition: 'opacity 0.2s',
                    cursor: 'pointer',
                  }}
                  onClick={timeLeft === 0 ? handleResend : null}
                >
                  Kirim Ulang
                </span>
              </Typography>
            </Stack>
          )}
        </Stack>
        <Stack sx={styles.action} >
          <StyledLoadingButton
            variant="contained"
            sx={styles.button}
            disabled={isSuccess ? otp?.length !== 6 || updating : !formState.isValid || sending}
            onClick={isSuccess ? handleSubmit(onSubmit) : handleResend}
          >
            {isSuccess ? 'Simpan Alamat Email Baru' : 'Kirim Kode OTP'}
          </StyledLoadingButton>
        </Stack>
      </FormProvider>
    </Dialog>
  );
}