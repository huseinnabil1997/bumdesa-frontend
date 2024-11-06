import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { StyledLoadingButton } from 'src/theme/custom/Button';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
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

// const styles = {
//   captchaButton: {
//     fontSize: 24,
//     padding: '10px',
//     letterSpacing: '2px',
//     color: 'white',
//     height: '56px',
//     borderRadius: '8px',
//     flex: 1,
//   },
//   captchaTextField: {
//     flex: 1,
//   },
//   forgotPasswordLink: {
//     cursor: 'pointer',
//   },
// };

export default function LoginForm() {
  const { login } = useAuth();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  // const [captcha, setCaptcha] = useState(generateCaptcha());

  // const refreshCaptcha = () => {
  //   setCaptcha(generateCaptcha());
  // };

  const LoginSchema = Yup.object().shape({
    personal_number: Yup.string()
      .required('PN wajib diisi')
      .matches(/^\d{8}$/, 'PN tidak valid'),
    password: Yup.string().required('Kata sandi wajib diisi'),
    // captcha: Yup.string().required('Captcha wajib diisi'),
  });

  const defaultValues = {
    personal_number: '',
    password: '',
    captcha: '',
    remember: false,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    setError,
    // clearError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    // if (data.captcha !== captcha) {
    //   setError('captcha', { message: 'Captcha tidak sesuai' });
    //   return;
    // }
    try {
      setLoading(true);
      const res = await login(data.personal_number, data.password);
      if (res?.data) {
        const isKanpus = res?.data?.unit_id === 0 && res?.data?.bumdesa_id === 0;
        dispatch(setUser(res.data));
        if (res?.data?.full_register === 0 && !isKanpus) {
          await setRegisSession(res?.metadata?.token ?? '');
          enqueueSnackbar(res.message, { variant: 'success' });
          window.location.href = `/auth/register/step-${steps[res?.data?.sequence]}`;
        } else {
          await setSession(res?.metadata?.token ?? '', data.remember);
          // clearError('captcha');
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

        <RHFTextField name="personal_number" label="Personal Number" require={true} />

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

        {/* <Stack direction="row" spacing={2} justifyContent="space-between">
          <StyledButton
            type="button"
            onClick={refreshCaptcha}
            variant="contained"
            style={styles.captchaButton}
          >
            {captcha}
          </StyledButton>
          <RHFTextField name="captcha" placeholder="Masukkan captcha" require={true} sx={styles.captchaTextField} />
        </Stack> */}
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Ingat Saya" />
        <></>
        {/* <Stack onClick={() => router.push(PATH_AUTH.resetPassword)} sx={styles.forgotPasswordLink}>
          <Link variant="subtitle2">Lupa Kata Sandi?</Link>
        </Stack> */}
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