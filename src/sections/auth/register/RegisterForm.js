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
// ----------------------------------------------------------------------

RegisterForm.propTypes = {
  setSuccess: PropTypes.func,
  setEmail: PropTypes.func,
  setId: PropTypes.func,
};

export default function RegisterForm({ setSuccess, setEmail, setId }) {
  const { register } = useAuth();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

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
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  console.log('watch:', watch('termsAndConditions'));

  useEffect(() => {
    const termsChecked = router.query.termsAndConditions === 'true';
    setValue('termsAndConditions', termsChecked);
  }, [router.query.termsAndConditions, setValue]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

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
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Stack
          onClick={() => {
            if (watch('termsAndConditions')) {
              setValue('termsAndConditions', false)
            } else {
              router.push('/auth/terms-and-conditions')
              setValue('termsAndConditions', false)
            }
          }}
        >
          <RHFCheckbox
            name="termsAndConditions"
            label={
              <Typography fontSize='12px' fontWeight={400} color="#292929" sx={{ ml: 0.2 }}>
                Saya telah membaca <span style={{ fontWeight: 600, color: '#1078CA' }}> Syarat dan Ketentuan </span> BUM Desa
              </Typography>
            }
          />
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
