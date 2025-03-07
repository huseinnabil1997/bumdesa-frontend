import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert, Divider, Typography, Button } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// components
import { FormProvider, RHFTextField, RHFUploadPhoto } from '../../../components/hook-form';
import { fData } from '../../../utils/formatNumber';
import { useRouter } from 'next/router';
import { StyledButton, StyledLoadingButton } from 'src/theme/custom/Button';
import { ArrowBack } from '@mui/icons-material';
import { fourDefaultValues, stepFourSchema } from './validation/stepFour';
import { handleDrop } from 'src/utils/helperFunction';
import Image from '../../../components/Image';
import PropTypes from 'prop-types';
import { DialogAnimate } from 'src/components/animate';
import { useSnackbar } from 'notistack';
// ----------------------------------------------------------------------

StepFourForm.propTypes = {
  setSuccess: PropTypes.func,
  isSuccess: PropTypes.bool,
};

export default function StepFourForm({ setSuccess, isSuccess }) {
  const { registerForm } = useAuth();

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const methods = useForm({
    resolver: yupResolver(stepFourSchema),
    defaultValues: fourDefaultValues,
    mode: 'onChange',
  });

  const {
    setValue,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const payload = { ...data, position: '4' };

    const formData = new FormData();

    for (const key in payload) {
      formData.append(key, payload[key]);
    }

    try {
      const res = await registerForm({ payload: formData, step: 4 });
      if (res.code === 200) setSuccess(true);
      else setError('afterSubmit', { ...res, message: res.message });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleLogin = () => {
    localStorage.removeItem('@token');
    router.push('/auth/login');
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFUploadPhoto
          name="image"
          label="Foto Manager Unit Usaha"
          accept="image/*"
          maxSize={10000000}
          imageFrom={'organization'}
          errorPosition="bottom"
          onDrop={(file) => handleDrop(file, (val) => setValue('image', val))}
          helperText={
            <Typography
              variant="caption"
              sx={{
                mt: 1,
                display: 'block',
                textAlign: 'start',
                color: 'text.secondary',
              }}
            >
              Format yang diperbolehkan: png, jpg, jpeg.
              <br />
              Ukuran maks {fData(10000000)}
            </Typography>
          }
        />

        <RHFTextField name="name" label="Nama Manager Unit Usaha" require />
        <RHFTextField name="position" label="Jabatan" require disabled />
        <RHFTextField name="phone" label="Nomor HP" require type="number" />

        <Divider />

        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <StyledButton
            startIcon={<ArrowBack />}
            onClick={() => router.push('/auth/register/step-three')}
          >
            Sebelumnya
          </StyledButton>
          <StyledLoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Selanjutnya
          </StyledLoadingButton>
        </Stack>
      </Stack>

      <DialogAnimate open={isSuccess}>
        <Stack sx={{ p: 3 }} justifyContent="center">
          <Image
            style={{ width: 240, margin: 'auto', display: 'flex' }}
            src="/image/registration_success.svg"
            alt="login"
          />
          <Typography align="center" variant="h5" sx={{ mt: 3, mb: 1 }}>
            Selamat! Akun BUM Desa Pusat Anda Berhasil Dibuat
          </Typography>
          <Typography align="center" variant="subtitle2" sx={{ color: '#666666' }} fontWeight={500}>
            Sistem telah mengirimkan email verifikasi ke alamat email yang terdaftar untuk unit
            usaha BUM Desa Anda.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            size="large"
            onClick={handleLogin}
          >
            Masuk
          </Button>
        </Stack>
      </DialogAnimate>
    </FormProvider>
  );
}
