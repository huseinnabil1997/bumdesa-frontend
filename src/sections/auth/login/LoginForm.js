import * as Yup from 'yup';
import { useState } from 'react';
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
import { FormProvider, RHFCheckbox, RHFTextField } from '../../../components/hook-form';
import { setRegisSession, setSession } from 'src/utils/jwt';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { defaultRangeDate } from 'src/utils/helperFunction';
import { useDispatch } from 'react-redux';
import { setUser } from 'src/redux/slices/user';

// ----------------------------------------------------------------------

const steps = ['', 'one', 'two', 'three', 'four'];

export default function LoginForm() {
  const { login } = useAuth();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email harus berisi alamat email yang valid')
      .required('Email wajib diisi'),
    password: Yup.string().required('Kata sandi wajib diisi'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: false,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await login(data.email, data.password);
      if (res?.data) {
        const isKanpus = res?.data?.unit_id === 0 && res?.data?.bumdesa_id === 0;
        dispatch(setUser(res.data));
        if (res?.data?.full_register === 0 && !isKanpus) {
          await setRegisSession(res?.metadata?.token ?? '');
          enqueueSnackbar(res.message, { variant: 'success' });
          window.location.href = `/auth/register/step-${steps[res?.data?.sequence]}`;
        } else {
          await setSession(res?.metadata?.token ?? '', data.remember);
          enqueueSnackbar(res.message, { variant: 'success' });
          defaultRangeDate();
          router.push(
            res?.data?.role === 1 ? PATH_DASHBOARD.kanpus.dashboard : PATH_DASHBOARD.root
          );
        }
      }
    } catch (error) {
      if (error.code === 412) {
        router.push(`/auth/create-password?token=${error?.metadata?.token}`);
        return;
      }
      if (isMountedRef.current) {
        setError('afterSubmit', {
          ...error,
          message: error.message ?? 'Tidak dapat terhubung ke server',
        });
      }
      setLoading(false);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="email" label="Email" require={true} />

        <RHFTextField
          require={true}
          name="password"
          label="Kata Sandi"
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
        <Stack onClick={() => router.push(PATH_AUTH.resetPassword)} sx={{ cursor: 'pointer' }}>
          <Link variant="subtitle2">Lupa Kata Sandi?</Link>
        </Stack>
      </Stack>

      <StyledLoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="primary"
        loading={isSubmitting || loading}
      >
        Masuk
      </StyledLoadingButton>
    </FormProvider>
  );
}