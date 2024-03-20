import { useEffect } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert, Divider, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import {
  FormProvider,
  RHFAutocomplete,
  RHFTextField,
  RHFUploadPhoto,
} from '../../../components/hook-form';
import { fData } from '../../../utils/formatNumber';
import { useRouter } from 'next/router';
import 'react-image-crop/dist/ReactCrop.css';
import { handleDrop } from 'src/utils/helperFunction';

import { AlertInfo } from 'src/theme/custom/Alert';
import { StepOneSchema, oneDefaultValues } from './validation/stepOne';
import { useGetProvincies } from 'src/query/hooks/useGetProvincies';
import { useGetCities } from 'src/query/hooks/useGetCities';
import { useGetDistricts } from 'src/query/hooks/useGetDistricts';
import { useGetSubdistricts } from 'src/query/hooks/useGetSubdistricts';
import { useGetPostalCode } from 'src/query/hooks/useGetPostalCode';

// ----------------------------------------------------------------------

export default function StepOneForm() {
  const { registerForm } = useAuth();

  const isMountedRef = useIsMountedRef();

  const router = useRouter();

  const methods = useForm({
    resolver: yupResolver(StepOneSchema),
    defaultValues: oneDefaultValues,
    mode: 'onChange',
  });

  const {
    reset,
    setValue,
    setError,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  const province = watch('province');
  const city = watch('city');
  const district = watch('district');
  const subdistrict = watch('subdistrict');

  const { data: provincies } = useGetProvincies();
  const { data: cities } = useGetCities({ prov_id: province?.value });
  const { data: districts } = useGetDistricts({ city_id: city?.value });
  const { data: subdistricts } = useGetSubdistricts({ dis_id: district?.value });
  const { data: postalCode } = useGetPostalCode({ subdis_id: subdistrict?.value });

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      province: data.province.value,
      city: data.city.value,
      district: data.district.value,
      subdistrict: data.subdistrict.value,
      postal_code: postalCode.value,
    };

    const formData = new FormData();

    for (const key in payload) {
      formData.append(key, payload[key]);
    }

    try {
      const res = await registerForm({ payload: formData, step: 1 });
      if (res.code === 200) router.push('/auth/register/step-two');
      else setError('afterSubmit', { ...res, message: res.message });
    } catch (error) {
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  useEffect(() => {
    if (postalCode) setValue('postal_code', postalCode?.subdis_id);
  }, [postalCode]);

  useEffect(() => {
    setValue('city', { value: null, text: '' });
  }, [province]);

  useEffect(() => {
    setValue('district', { value: null, text: '' });
  }, [city]);

  useEffect(() => {
    setValue('subdistrict', { value: null, text: '' });
  }, [district]);

  console.log(errors);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Stack spacing={1}>
          <RHFUploadPhoto
            name="image"
            label="Foto Kantor BUM Desa"
            accept="image/*"
            maxSize={900000}
            onDrop={(file) => handleDrop(file, (val) => setValue(`image`, val))}
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
            name="image_logo"
            label="Logo BUM Desa"
            accept="image/*"
            maxSize={900000}
            onDrop={(file) => handleDrop(file, (val) => setValue(`image_logo`, val))}
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

        <AlertInfo severity="info">
          <Typography fontSize={12}>
            Pastikan logo Anda berbentuk kotak (rasio 1:1) untuk keperluan BUM Desa seperti laporan,
            logo dashboard, dan lainnya.
          </Typography>
        </AlertInfo>

        <RHFTextField name="name" label="Nama BUM Desa" require />
        <RHFTextField name="bumdesa_id_reference" label="ID BUM Desa" require />
        <RHFTextField name="founded_at" label="Tanggal BUM Desa Berdiri" type="date" require />
        <RHFTextField name="address" label="Alamat" require />

        <RHFAutocomplete
          require
          name="province"
          label="Province"
          loading={false}
          options={provincies?.map((option) => option) ?? []}
          getOptionLabel={(option) => option.text}
          renderOption={(props, option) => (
            <li {...props} key={option.value}>
              {option.text}
            </li>
          )}
        />

        <RHFAutocomplete
          require
          name="city"
          label="Kabupaten"
          loading={false}
          options={cities?.map((option) => option) ?? []}
          getOptionLabel={(option) => option.text}
          renderOption={(props, option) => (
            <li {...props} key={option.value}>
              {option.text}
            </li>
          )}
        />

        <RHFAutocomplete
          require
          name="district"
          label="Kecamatan"
          loading={false}
          options={districts?.map((option) => option) ?? []}
          getOptionLabel={(option) => option.text}
          renderOption={(props, option) => (
            <li {...props} key={option.value}>
              {option.text}
            </li>
          )}
        />

        <RHFAutocomplete
          require
          name="subdistrict"
          label="Desa"
          loading={false}
          options={subdistricts?.map((option) => option) ?? []}
          getOptionLabel={(option) => option.text}
          renderOption={(props, option) => (
            <li {...props} key={option.value}>
              {option.text}
            </li>
          )}
        />

        <RHFTextField name="postal_code" label="Kode Pos" require disabled />
        <RHFTextField name="employees" label="Jumlah Pegawai Tetap" require type="number" />

        <Divider />

        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
            Selanjutnya
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
