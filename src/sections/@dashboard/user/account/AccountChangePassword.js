import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, InputAdornment, IconButton, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import Iconify from 'src/components/Iconify';
// hooks
import useAuth from 'src/hooks/useAuth';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const [verified, setVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const { changePassword, verifyReset } = useAuth();

  const urlParams = new URLSearchParams(window.location.search);

  const dataParam = urlParams.get('data')?.split(' ')?.join('+');

  const { enqueueSnackbar } = useSnackbar();

  const ChangePassWordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Kata sandi harus terdiri dari minimal 6 karakter')
      .required('Kata sandi baru harus diisi'),
    confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'Kata sandi harus cocok'),
  });

  const defaultValues = {
    data: dataParam ?? '',
    password: '',
    confirm_password: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const res = await changePassword(data);
      reset();
      enqueueSnackbar(res?.message, { variant: 'success' });
      router.push('/auth/login');
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: 'error' });
    }
  };

  const checkVerify = async () => {
    try {
      const res = await verifyReset({ data: dataParam });
      reset();
      enqueueSnackbar(res?.message, { variant: 'success' });
      setVerified(true);
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: 'error' });
      setVerified(false);
    }
  };

  const isPasswordValid = (password) => password.length > 11
    && /[0-9]/.test(password)
    && /[~!@#$%^&*]/.test(password)
    && /[a-z]/.test(password)
    && /[A-Z]/.test(password)

  useEffect(() => {
    checkVerify();
  }, [])

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {/* <RHFTextField name="oldPassword" type="password" label="Old Password" /> */}

        <RHFTextField
          disabled={!verified}
          name="password"
          label="Buat Kata Sandi"
          type={showPassword ? 'text' : 'password'}
          require
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
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
                Simbol ~!@#$%^&*
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
          disabled={!verified}
          name="confirm_password"
          label="Konfirmasi Kata Sandi"
          type={showConfirmPassword ? 'text' : 'password'}
          require
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton disabled={!verified || !isPasswordValid(watch('password'))} type="submit" variant="contained" loading={isSubmitting}>
          Simpan Kata Sandi baru
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
