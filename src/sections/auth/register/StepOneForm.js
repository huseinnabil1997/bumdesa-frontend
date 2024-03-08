import * as Yup from 'yup';
import { useCallback, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, MenuItem, Alert, Divider, styled, Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import { FormProvider, RHFSelect, RHFTextField, RHFUploadPhoto } from '../../../components/hook-form';
import { fData } from '../../../utils/formatNumber';
import { useRouter } from 'next/router';
// ----------------------------------------------------------------------

const SERVICE_OPTIONS = ['Jakarta', 'Banding'];

const StyledMenuItem = styled(MenuItem)(() => ({
  mx: 1,
  borderRadius: 0.75,
  typography: 'body2',
  fontStyle: 'italic',
  color: 'text.secondary',
}));

const StyledMenuItemValued = styled(MenuItem)(() => ({
  mx: 1,
  my: 0.5,
  borderRadius: 0.75,
  typography: 'body2',
  textTransform: 'capitalize',
}));

export default function StepOneForm({ setSuccess, setEmail }) {
  const { register } = useAuth();

  const isMountedRef = useIsMountedRef();

  const router = useRouter();

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
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      setSuccess(true);
      setEmail(data.email);
      router.push('/register/step-two');
      // await register(data.email, data.password, data.firstName, data.lastName);
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'avatarUrl',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Stack spacing={1}>
          <RHFUploadPhoto
            name="avatarUrl"
            label="Foto Kantor BUM Desa"
            accept="image/*"
            maxSize={900000}
            onDrop={handleDrop}
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
                Ukuran maks {fData(900000)}
              </Typography>
            }
          />

          <RHFUploadPhoto
            name="avatarUrl"
            label="Logo BUM Desa"
            accept="image/*"
            maxSize={900000}
            onDrop={handleDrop}
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
                Ukuran maks {fData(900000)}
              </Typography>
            }
          />
        </Stack>

        <Alert severity="info">
          <Typography fontSize={12}>
            Pastikan logo Anda berbentuk kotak (rasio 1:1) untuk keperluan BUM Desa seperti laporan, logo dashboard, dan
            lainnya.
          </Typography>
        </Alert>

        <RHFTextField name="name" label="Nama BUM Desa" required />
        <RHFTextField name="id" label="ID BUM Desa" required />
        <RHFTextField name="date" label="Tanggal BUM Desa Berdiri" type="date" required />
        <RHFTextField name="address" label="Alamat" required />

        <RHFSelect
          required
          fullWidth
          name="province"
          label="Provinsi"
          InputLabelProps={{ shrink: true }}
          SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
        >
          <StyledMenuItem value="">None</StyledMenuItem>
          <Divider />
          {SERVICE_OPTIONS.map((option) => (
            <StyledMenuItemValued key={option} value={option}>
              {option}
            </StyledMenuItemValued>
          ))}
        </RHFSelect>

        <RHFSelect
          required
          fullWidth
          name="regency"
          label="Kabupaten"
          InputLabelProps={{ shrink: true }}
          SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
        >
          <StyledMenuItem value="">None</StyledMenuItem>
          <Divider />
          {SERVICE_OPTIONS.map((option) => (
            <StyledMenuItemValued key={option} value={option}>
              {option}
            </StyledMenuItemValued>
          ))}
        </RHFSelect>

        <RHFSelect
          required
          fullWidth
          name="district"
          label="Kecamatan"
          InputLabelProps={{ shrink: true }}
          SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
        >
          <StyledMenuItem value="">None</StyledMenuItem>
          <Divider />
          {SERVICE_OPTIONS.map((option) => (
            <StyledMenuItemValued key={option} value={option}>
              {option}
            </StyledMenuItemValued>
          ))}
        </RHFSelect>
        <RHFSelect
          required
          fullWidth
          name="village"
          label="Desa"
          InputLabelProps={{ shrink: true }}
          SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
        >
          <StyledMenuItem value="">None</StyledMenuItem>
          <Divider />
          {SERVICE_OPTIONS.map((option) => (
            <StyledMenuItemValued key={option} value={option}>
              {option}
            </StyledMenuItemValued>
          ))}
        </RHFSelect>

        <RHFTextField name="postal_code" label="Kode Pos" required />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
