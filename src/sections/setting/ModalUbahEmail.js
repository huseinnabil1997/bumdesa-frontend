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
};

export default function ModalUbahEmail({ open, onClose }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(1);
  const [isClicked, setIsClicked] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

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

  const userData = JSON.parse(localStorage.getItem('userData'));

  const defaultValues = {
    email: userData?.email ?? '',
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
  } = methods;

  const new_email = watch('new_email');

  const handleResend = () => {
    console.log('resend')
    setIsClicked(true);
    setTimeLeft(60);
    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  };

  const onSubmit = (data) => {
    console.log('onSubmit', data);
    if (otp) {
      onClose();
      methods.reset();
      setOtp('');
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
    } else {
      setTimeLeft(60);
      setIsSuccess(true);
    }
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Check color="success" />
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
            disabled={isSuccess ? otp?.length !== 6 : !formState.isValid}
            onClick={handleSubmit(onSubmit)}
          >
            {isSuccess ? 'Simpan Alamat Email Baru' : 'Kirim Kode OTP'}
          </StyledLoadingButton>
        </Stack>
      </FormProvider>
    </Dialog>
  );
}