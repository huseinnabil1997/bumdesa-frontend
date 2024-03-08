import * as Yup from 'yup';
import { Fragment, useCallback, useState } from 'react';
// form
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, MenuItem, Alert, Divider, styled, Button, Typography, Box } from '@mui/material';
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
import Delete from '@mui/icons-material/Delete';
import { BtnLightError, BtnLightPrimary, StyledButton } from 'src/theme/custom/Button';
import { Add, ArrowBack } from '@mui/icons-material';
import { handleDrop } from 'src/utils/helperFunction';

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

export default function StepTwoForm() {
  const { register } = useAuth();

  const isMountedRef = useIsMountedRef();

  const router = useRouter();

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    user: [{ name: '' }],
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    reset,
    setValue,
    setError,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'user',
  });

  const onSubmit = async (data) => {
    try {
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

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFUploadPhoto
          name="photo"
          label="Foto Direktur BUM Desa"
          accept="image/*"
          maxSize={900000}
          onDrop={(file) => handleDrop(file, (val) => setValue('photo', val))}
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

        <RHFTextField name="name" label="Nama Direktur BUM Desa" required />

        <RHFSelect
          required
          fullWidth
          name="province"
          label="Jabatan"
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

        <RHFTextField name="id" label="Nomor HP" required type="tel" />

        <Divider />

        {fields.map((row, i) => (
          <Fragment key={row.id}>
            <RHFUploadPhoto
              name={`user.${i}.photo`}
              label="Foto Pengurus BUM Desa"
              accept="image/*"
              maxSize={900000}
              onDrop={(file) => handleDrop(file, (val) => setValue(`user.${i}.photo`, val))}
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

            <RHFTextField name={`user.${i}.photo`} label="Nama Pengurus BUM Desa" required />
            <RHFSelect
              required
              fullWidth
              name={`user.${i}.title`}
              label="Jabatan"
              InputLabelProps={{ shrink: true }}
              SelectProps={{
                native: false,
                sx: { textTransform: 'capitalize' },
              }}
            >
              <StyledMenuItem value="">None</StyledMenuItem>
              <Divider />
              {SERVICE_OPTIONS.map((option) => (
                <StyledMenuItemValued key={option} value={option}>
                  {option}
                </StyledMenuItemValued>
              ))}
            </RHFSelect>
            <RHFTextField name={`user.${i}.phone`} label="Nomor HP" required type="tel" />

            <Stack spacing={1}>
              {fields.length > 1 && (
                <BtnLightError fullWidth startIcon={<Delete />} onClick={() => remove(row.id)}>
                  Delete
                </BtnLightError>
              )}
              <BtnLightPrimary startIcon={<Add />} fullWidth onClick={() => append({ name: '' })}>
                Tambah Data Pengguna
              </BtnLightPrimary>
            </Stack>

            <Divider />
          </Fragment>
        ))}

        <Stack direction="row" spacing={1}>
          <StyledButton
            fullWidth
            startIcon={<ArrowBack />}
            onClick={() => router.push('/auth/register/step-one')}
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
