import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
// ----------------------------------------------------------------------

export default function RegisterForm({ setSuccess, setEmail }) {
  const { register } = useAuth();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Nama wajib diisi'),
    email: Yup.string().email().required('Email wajib diisi'),
    password: Yup.string().required('Kata sandi wajib diisi'),
    're-password': Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const defaultValues = {
    name: '',
    email: '',
    password: '',
    're-password': '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      setEmail(data.email);
      await register(data);
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="name" label="Nama BUM Desa" />
        <RHFTextField name="email" label="Email Aktif" />

        <RHFTextField
          name="password"
          label="Buat Kata Sandi"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {watch('password')?.length > 0 && (
          <Grid container spacing={1}>
            <Grid item xs={6} display="flex">
              {watch('password')?.length > 11 ? (
                <Iconify icon={'eva:checkmark-circle-2-fill'} sx={{ color: '#27AE60' }} />
              ) : (
                <Iconify icon={'eva:close-circle-fill'} sx={{ color: '#E84040' }} />
              )}
              <Typography sx={{ ml: 1, color: '#B5B6B6' }} variant="caption">
                Minimal 12 karakter
              </Typography>
            </Grid>
            <Grid item xs={6} display="flex">
              {/[0-9]/.test(watch('password')) ? (
                <Iconify icon={'eva:checkmark-circle-2-fill'} sx={{ color: '#27AE60' }} />
              ) : (
                <Iconify icon={'eva:close-circle-fill'} sx={{ color: '#E84040' }} />
              )}
              <Typography sx={{ ml: 1, color: '#B5B6B6' }} variant="caption">
                Minimal 1 angka
              </Typography>
            </Grid>
            <Grid item xs={6} display="flex">
              {/[~!@#$%^&*]/.test(watch('password')) ? (
                <Iconify icon={'eva:checkmark-circle-2-fill'} sx={{ color: '#27AE60' }} />
              ) : (
                <Iconify icon={'eva:close-circle-fill'} sx={{ color: '#E84040' }} />
              )}
              <Typography sx={{ ml: 1, color: '#B5B6B6' }} variant="caption">
                Simbol ~!@#$%%^&*
              </Typography>
            </Grid>
            <Grid item xs={6} display="flex">
              {/[a-z]/.test(watch('password')) ? (
                <Iconify icon={'eva:checkmark-circle-2-fill'} sx={{ color: '#27AE60' }} />
              ) : (
                <Iconify icon={'eva:close-circle-fill'} sx={{ color: '#E84040' }} />
              )}
              <Typography sx={{ ml: 1, color: '#B5B6B6' }} variant="caption">
                Minimal 1 huruf kecil
              </Typography>
            </Grid>
            <Grid item xs={6} display="flex">
              {/[A-Z]/.test(watch('password')) ? (
                <Iconify icon={'eva:checkmark-circle-2-fill'} sx={{ color: '#27AE60' }} />
              ) : (
                <Iconify icon={'eva:close-circle-fill'} sx={{ color: '#E84040' }} />
              )}
              <Typography sx={{ ml: 1, color: '#B5B6B6' }} variant="caption">
                Minimal 1 huruf besar
              </Typography>
            </Grid>
          </Grid>
        )}

        <RHFTextField
          name="re-password"
          label="Konfirmasi Kata Sandi"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
