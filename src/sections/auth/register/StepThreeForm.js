import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert, Divider, AlertTitle, Typography } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// components
import {
  FormProvider,
  RHFAutocomplete,
  RHFTextField,
  RHFUploadPhoto,
} from '../../../components/hook-form';
import { fData } from '../../../utils/formatNumber';
import { useRouter } from 'next/router';
import { StyledButton, StyledLoadingButton } from 'src/theme/custom/Button';
import { ArrowBack } from '@mui/icons-material';
import { AlertInfo } from 'src/theme/custom/Alert';
import { StepThreeSchema, threeDefaultValues } from './validation/stepThree';
import { handleDrop } from 'src/utils/helperFunction';
import { useGetSector } from 'src/query/hooks/options/useGetSector';
import { useGetRegisSequence } from 'src/query/hooks/auth/useGetRegisSequence';
import { useEffect } from 'react';
import RHFDatePicker from 'src/components/hook-form/RHFDatePicker';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { isString } from 'lodash';
// ----------------------------------------------------------------------

export default function StepThreeForm() {
  const { registerForm } = useAuth();

  const { data: sectors, loading: sectorsLoading } = useGetSector();
  const { data } = useGetRegisSequence(3);

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const methods = useForm({
    resolver: yupResolver(StepThreeSchema),
    defaultValues: threeDefaultValues,
  });

  const {
    setValue,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      sector: data?.sector?.value,
      year_founded: moment(data?.year_founded).format('yyyy'),
    };

    if (isString(payload.image)) delete payload.image;

    const formData = new FormData();

    for (const key in payload) {
      formData.append(key, payload[key]);
    }

    try {
      const res = await registerForm({ payload: formData, step: 3 });
      if (res.code === 200) router.push('/auth/register/step-four');
      else setError('afterSubmit', { ...res, message: res.message });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  useEffect(() => {
    if (data) {
      setValue('name', data.name);
      setValue('email', data.email);
      setValue('year_founded', new Date(data.year_founded, 0, 1));
      setValue('sector', data.sector);
      setValue('image', data.image);
    }
  }, [data]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFUploadPhoto
          name="image"
          label="Foto Kantor Unit Usaha"
          accept="image/*"
          imageFrom={'unit'}
          maxSize={10000000}
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

        <RHFTextField name="name" label="Nama Unit Usaha" require />
        <RHFTextField name="email" label="Alamat Email Unit Usaha" require />

        <RHFDatePicker
          name="year_founded"
          label="Tahun Berdiri"
          placeholder="Pilih Tahun"
          format="yyyy"
          views={['year']}
          openTo="year"
          sx={{
            width: '100%',
            '& .MuiInputBase-root': {
              height: '56px',
              borderRadius: '8px',
            },
          }}
          require
        />

        <RHFAutocomplete
          require
          name="sector"
          label="Sektor Usaha"
          loading={sectorsLoading}
          options={sectors ?? []}
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => (
            <li {...props} key={option.value}>
              {option.label}
            </li>
          )}
        />

        <AlertInfo severity="info">
          <AlertTitle>
            <Typography fontSize={12} fontWeight={700}>
              Tambah Unit Usaha
            </Typography>
          </AlertTitle>
          <Typography fontSize={12}>
            Penambahan unit usaha lainnya dapat dilakukan setelah proses registrasi berhasil.
          </Typography>
        </AlertInfo>

        <Divider />

        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <StyledButton
            startIcon={<ArrowBack />}
            onClick={() => router.push('/auth/register/step-two')}
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
