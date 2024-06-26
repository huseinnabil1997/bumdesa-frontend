import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, InputAdornment, IconButton } from '@mui/material';
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

        <LoadingButton disabled={!verified} type="submit" variant="contained" loading={isSubmitting}>
          Simpan Kata Sandi baru
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
