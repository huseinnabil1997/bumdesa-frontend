import * as Yup from 'yup';
import { useCallback, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, MenuItem, Alert, Divider, styled, AlertTitle, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
  RHFUploadPhoto,
} from '../../../components/hook-form';
import { fData } from '../../../utils/formatNumber';
import { useRouter } from 'next/router';
import { StyledButton } from 'src/theme/custom/Button';
import { ArrowBack } from '@mui/icons-material';
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

export default function StepFourForm({ setSuccess, setEmail }) {
  const { register } = useAuth();

  const isMountedRef = useIsMountedRef();

  const router = useRouter();

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
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

        <RHFUploadPhoto
          name="avatarUrl"
          label="Foto Manager BUM Desa"
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

        <RHFTextField name="name" label="Nama Manager BUM Desa" required />

        <RHFSelect
          required
          fullWidth
          name="title"
          label="Jabaran"
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

        <RHFTextField name="phone" label="Nomor HP" required type="number" />

        <Divider />

        <Stack direction="row" spacing={1}>
          <StyledButton
            fullWidth
            startIcon={<ArrowBack />}
            onClick={() => router.push('/auth/register/step-three')}
          >
            Sebelumnya
          </StyledButton>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Selanjutnya
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
