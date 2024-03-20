import { Fragment } from 'react';
// form
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert, Divider, Typography } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import { FormProvider, RHFTextField, RHFUploadPhoto } from '../../../components/hook-form';
import { fData } from '../../../utils/formatNumber';
import { useRouter } from 'next/router';
import { StyledButton, StyledLoadingButton } from 'src/theme/custom/Button';
import { ArrowBack } from '@mui/icons-material';
import { handleDrop } from 'src/utils/helperFunction';
import { StepTwoSchema, twoDefaultValues } from './validation/stepTwo';

// ----------------------------------------------------------------------

export default function StepTwoForm() {
  const { registerForm } = useAuth();

  const isMountedRef = useIsMountedRef();

  const router = useRouter();

  const methods = useForm({
    resolver: yupResolver(StepTwoSchema),
    defaultValues: twoDefaultValues,
    mode: 'onChange',
  });

  const {
    reset,
    setValue,
    setError,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const { fields } = useFieldArray({
    control,
    name: 'organizations',
  });

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append('organization.0.name', data.name);
    formData.append('organization.0.phone', data.phone);
    formData.append('organization.0.image', data.image);
    formData.append('organization.0.position', '1');

    data.organizations.forEach((row, i) => {
      formData.append(`organization.${i + 1}.name`, data.name);
      formData.append(`organization.${i + 1}.phone`, data.phone);
      formData.append(`organization.${i + 1}.image`, data.image);
      formData.append(`organization.${i + 1}.position`, i + 2);
    });

    try {
      const res = await registerForm({ payload: formData, step: 2 });
      if (res.code === 200) router.push('/auth/register/step-three');
      else setError('afterSubmit', { ...res, message: res.message });
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
          name="image"
          label="Foto Direktur BUM Desa"
          accept="image/*"
          maxSize={900000}
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
              Ukuran maks {fData(900000)}
            </Typography>
          }
        />

        <RHFTextField name="name" label="Nama Direktur BUM Desa" require />
        <RHFTextField name="position" label="Jabatan" require disabled />
        <RHFTextField name="phone" label="Nomor HP" require type="tel" />

        <Divider />

        {fields.map((row, i) => (
          <Fragment key={row.id}>
            <RHFUploadPhoto
              name={`organizations.${i}.image`}
              label="Foto Pengurus BUM Desa"
              accept="image/*"
              maxSize={900000}
              onDrop={(file) =>
                handleDrop(file, (val) => setValue(`organizations.${i}.image`, val))
              }
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

            <RHFTextField name={`organizations.${i}.name`} label="Nama Pengurus BUM Desa" require />
            <RHFTextField name={`organizations.${i}.position`} label="Jabatan" require disabled />
            <RHFTextField
              name={`organizations.${i}.phone`}
              label="Nomor HP"
              require
              type="number"
            />

            <Divider />
          </Fragment>
        ))}

        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <StyledButton
            startIcon={<ArrowBack />}
            onClick={() => router.push('/auth/register/step-one')}
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
    </FormProvider>
  );
}
