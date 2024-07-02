import PropTypes from 'prop-types';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Typography } from '@mui/material';
import useAuth from 'src/hooks/useAuth';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { useSnackbar } from 'notistack';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  sentStatus: PropTypes.bool,
};

export default function ResetPasswordForm({ onSent }) {
  const { enqueueSnackbar } = useSnackbar();
  const { resetPassword } = useAuth();
  const [countdown, setCountdown] = useState(0);
  const [emailSent, setEmailSent] = useState(false);

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email harus merupakan alamat email yang valid.')
      .required('Email harus diisi'),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const res = await resetPassword(data);
      if (res?.data?.id_user) {
        onSent();
        setEmailSent(true);
        setCountdown(300); // Set countdown to 60 seconds
      }
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: 'error' });
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <RHFTextField name="email" label="Email" placeholder='Masukkan email' />
        
        {emailSent && countdown > 0 && (
          <Typography variant="body2">
            Belum menerima email?
          </Typography>
        )}

        <StyledLoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          disabled={countdown > 0}
        >
          {countdown > 0 ? `Kirim Ulang ${countdown} detik` : (emailSent ? 'Kirim Ulang' : 'Atur ulang Kata Sandi')}
        </StyledLoadingButton>
      </Stack>
    </FormProvider>
  );
}