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
  RHFAutocomplete,
  RHFSelect,
  RHFTextField,
  RHFUploadPhoto,
} from '../../../components/hook-form';
import { fData } from '../../../utils/formatNumber';
import { useRouter } from 'next/router';
import { StyledButton } from 'src/theme/custom/Button';
import { ArrowBack } from '@mui/icons-material';
import { yearsArray } from 'src/utils/formatTime';
import { AlertInfo } from 'src/theme/custom/Alert';
import { StepThreeSchema, threeDefaultValues } from './validation/stepThree';
import { handleDrop } from 'src/utils/helperFunction';
// ----------------------------------------------------------------------

const SERVICE_OPTIONS = [{ text: 'Jakarta', value: 1 }];

const StyledMenuItemValued = styled(MenuItem)(() => ({
  mx: 1,
  my: 0.5,
  borderRadius: 0.75,
  typography: 'body2',
  textTransform: 'capitalize',
}));

export default function StepThreeForm() {
  const { registerForm } = useAuth();

  const isMountedRef = useIsMountedRef();

  const router = useRouter();

  const methods = useForm({
    resolver: yupResolver(StepThreeSchema),
    defaultValues: threeDefaultValues,
  });

  const {
    reset,
    setValue,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      sector: data.sector.value,
    };

    const formData = new FormData();

    for (const key in payload) {
      formData.append(key, payload[key]);
    }

    try {
      const res = await registerForm({ payload: formData, step: 3 });
      if (res.code === 200) router.push('/auth/register/step-four');
      else setError('afterSubmit', { ...res, message: res.message });
    } catch (error) {
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
          label="Foto Kantor BUM Desa"
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

        <RHFTextField name="name" label="Nama Unit Usaha" require />
        <RHFTextField name="address" label="Alamat Email Unit Usaha" require />

        <RHFSelect
          require
          fullWidth
          name="year_founded"
          label="Tahun Berdiri"
          InputLabelProps={{ shrink: true }}
          SelectProps={{
            native: false,
            sx: { textTransform: 'capitalize' },
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: 200,
                  paddingTop: 4,
                  paddingBottom: 4,
                },
              },
            },
          }}
        >
          {yearsArray.map((option) => (
            <StyledMenuItemValued key={option} value={option}>
              {option}
            </StyledMenuItemValued>
          ))}
        </RHFSelect>

        <RHFAutocomplete
          require
          name="sector"
          label="Sektor Usaha"
          loading={false}
          options={SERVICE_OPTIONS?.map((option) => option) ?? []}
          getOptionLabel={(option) => option.text}
          renderOption={(props, option) => (
            <li {...props} key={option.value}>
              {option.text}
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
          <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
            Selanjutnya
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
