import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert, Grid, Typography } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFCheckbox, RHFTextField } from '../../../components/hook-form';
import { RegisterSchema, registerDefaultValues } from './validation/register';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { registerForm } from 'src/utils/helperFunction';
// ----------------------------------------------------------------------

RegisterForm.propTypes = {
  setSuccess: PropTypes.func,
  setEmail: PropTypes.func,
  setId: PropTypes.func,
  startCountdown: PropTypes.func,
};

export default function RegisterForm({ setSuccess, setEmail, setId, startCountdown }) {
  const { register } = useAuth();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: registerDefaultValues,
    mode: 'onChange',
  });

  const {
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    delete data['re-password'];

    try {
      setEmail(data.email);
      const res = await register(data);
      if (res?.data?.id_regis) {
        setSuccess(true);
        setId(res.data.id_regis);
        startCountdown();
        resetRegisterForm();
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  useEffect(() => {
    setValue('termsAndConditions', registerForm.termsAndConditions);
  }, [registerForm.termsAndConditions, setValue, watch('termsAndConditions')]);

  useEffect(() => {
    setValue('privacyPolicy', registerForm.privacyPolicy);
  }, [registerForm.privacyPolicy, setValue, watch('privacyPolicy')]);

  useEffect(() => {
    setValue('name', registerForm.name);
    setValue('email', registerForm.email);
    setValue('password', registerForm.password);
    setValue('re-password', registerForm['re-password']);
    setValue('termsAndConditions', registerForm.termsAndConditions);
    setValue('privacyPolicy', registerForm.privacyPolicy);
  }, [registerForm, setValue]);

  const saveRegisterForm = () => {
    registerForm.name = watch('name');
    registerForm.email = watch('email');
    registerForm.password = watch('password');
    registerForm['re-password'] = watch('re-password');
    registerForm.termsAndConditions = watch('termsAndConditions');
    registerForm.privacyPolicy = watch('privacyPolicy');
  };

  const resetRegisterForm = () => {
    registerForm.name = '';
    registerForm.email = '';
    registerForm.password = '';
    registerForm['re-password'] = '';
    registerForm.termsAndConditions = false;
    registerForm.privacyPolicy = false;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [errors]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        {!!errors.termsAndConditions && (
          <Alert severity="error">{errors.termsAndConditions.message}</Alert>
        )}
        {!!errors.privacyPolicy && <Alert severity="error">{errors.privacyPolicy.message}</Alert>}

        <RHFTextField name="name" label="Nama BUM Desa" required />
        <RHFTextField name="email" label="Email Aktif" required />

        <RHFTextField
          required
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
          required
          name="re-password"
          label="Konfirmasi Kata Sandi"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowRePassword(!showPassword)}>
                  <Iconify icon={showRePassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Stack>
          {/* <Stack
            onClick={() => {
              router.push('/auth/terms-and-conditions');
              setValue('termsAndConditions', false);
              saveRegisterForm();
            }}
          >
            <RHFCheckbox
              name="termsAndConditions"
              label={
                <Typography fontSize="12px" fontWeight={400} color="#292929" sx={{ ml: 0.2 }}>
                  Saya telah membaca{' '}
                  <span style={{ fontWeight: 600, color: '#1078CA' }}> Syarat dan Ketentuan </span>{' '}
                  BUM Desa
                </Typography>
              }
              onChange={() => {
                setValue('termsAndConditions', false);
              }}
            />
          </Stack> */}
          <Stack
            onClick={() => {
              router.push('/auth/privacy-policy');
              setValue('privacyPolicy', false);
              saveRegisterForm();
            }}
          >
            <RHFCheckbox
              name="privacyPolicy"
              label={
                <Typography
                  id="Typography-register-kebijakan-privasi"
                  fontSize="12px"
                  fontWeight={400}
                  color="#292929"
                  sx={{ ml: 0.2 }}
                >
                  Saya telah membaca{' '}
                  <span style={{ fontWeight: 600, color: '#1078CA' }}> Kebijakan Privasi </span> BUM
                  Desa
                </Typography>
              }
              onChange={() => {
                setValue('privacyPolicy', false);
              }}
            />
          </Stack>
        </Stack>

        <StyledLoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Register
        </StyledLoadingButton>
      </Stack>
    </FormProvider>
  );
}
