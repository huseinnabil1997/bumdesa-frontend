import * as Yup from 'yup';
import { useState } from 'react';
// next
import NextLink from 'next/link';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { StyledLoadingButton } from 'src/theme/custom/Button';
// routes
import { PATH_AUTH, PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import { setSession } from 'src/utils/jwt';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const steps = ['', 'one', 'two', 'three', 'four'];

export default function LoginForm() {
  const { login } = useAuth();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: localStorage.getItem('email'),
    password: '',
    remember: localStorage.getItem('remember') === 'true',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const res = await login(data.email, data.password);
      if (res?.data) {
        // Menyimpan data ke localStorage
        localStorage.setItem('userData', JSON.stringify(res.data));
        if (data.remember) {
          localStorage.setItem('email', data.email);
        }
        localStorage.setItem('remember', data.remember);
        if (res?.data?.full_register === 0) {
          await localStorage.setItem('@token', res?.metadata?.token ?? '');
          window.location.href = `/auth/register/step-${steps[res?.data?.sequence]}`;
        } else {
          await setSession(res?.metadata?.token ?? '');
          enqueueSnackbar(res.message, { variant: 'success' });
          router.push(PATH_DASHBOARD.root);
        }
      }
    } catch (error) {
      if (error.code === 412) {
        router.push(`/auth/create-password?token=${error?.metadata?.token}`);
        return;
      }
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

        <RHFTextField name="email" label="Email" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
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
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Ingat Saya" />
        <NextLink href={PATH_AUTH.resetPassword} passHref>
          <Link variant="subtitle2">Lupa Kata Sandi?</Link>
        </NextLink>
      </Stack>

      <StyledLoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="primary"
        loading={isSubmitting}
      >
        Masuk
      </StyledLoadingButton>
    </FormProvider>
  );
}
