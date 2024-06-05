import { useEffect } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert, Divider, Typography } from '@mui/material';
import { StyledLoadingButton } from 'src/theme/custom/Button';
// hooks
import useAuth from '../../../hooks/useAuth';
// components
import {
  FormProvider,
  RHFAutocomplete,
  RHFTextField,
  RHFUploadPhoto,
} from '../../../components/hook-form';
import { fBumdesId, fData } from '../../../utils/formatNumber';
import { useRouter } from 'next/router';
import 'react-image-crop/dist/ReactCrop.css';
import { handleDrop } from 'src/utils/helperFunction';

import { AlertInfo } from 'src/theme/custom/Alert';
import { StepOneSchema, oneDefaultValues } from './validation/stepOne';
import { useGetProvincies } from 'src/query/hooks/options/useGetProvincies';
import { useGetCities } from 'src/query/hooks/options/useGetCities';
import { useGetDistricts } from 'src/query/hooks/options/useGetDistricts';
import { useGetSubdistricts } from 'src/query/hooks/options/useGetSubdistricts';
import { useGetPostalCode } from 'src/query/hooks/options/useGetPostalCode';
import { useGetRegisSequence } from 'src/query/hooks/auth/useGetRegisSequence';
import moment from 'moment';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

export default function StepOneForm() {
  const { registerForm } = useAuth();

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const methods = useForm({
    resolver: yupResolver(StepOneSchema),
    defaultValues: oneDefaultValues,
    mode: 'onChange',
  });

  const {
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
  const { data } = useGetRegisSequence(1);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      bumdesa_id: data.bumdesa_id.replace(/-/g, ''),
      province: data.province.value,
      city: data.city.value,
      district: data.district.value,
      subdistrict: data.subdistrict.value,
      area: postalCode.value,
      postal_code: data?.postal_code,
    };

    if (typeof payload.image === 'string') delete payload.image;
    if (typeof payload.image_logo === 'string') delete payload.image_logo;

    const formData = new FormData();

    for (const key in payload) {
      formData.append(key, payload[key]);
    }

    try {
      const res = await registerForm({ payload: formData, step: 1 });
      if (res.code === 200) router.push('/auth/register/step-two');
      else setError('afterSubmit', { ...res, message: res.message });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  useEffect(() => {
    if (postalCode) setValue('postal_code', postalCode?.label);
  }, [postalCode]);

  useEffect(() => {
    if (data?.province.value !== province?.value) setValue('city', null);
    else setValue('city', data?.city);
  }, [province]);

  useEffect(() => {
    if (data?.city.value !== city?.value) setValue('district', null);
    else setValue('district', data?.district);
  }, [city]);

  useEffect(() => {
    if (data?.district.value !== district?.value) {
      setValue('subdistrict', null);
      setValue('postal_code', null);
    } else {
      setValue('subdistrict', data?.subdistrict);
      setValue('postal_code', data?.postal_code?.label);
    }
  }, [district]);

  useEffect(() => {
    if (data) {
      setValue('name', data.name);
      setValue('bumdesa_id', fBumdesId(data.bumdesa_id));
      setValue('address', data.address);
      setValue('founded_at', moment(data.founded_at).format('yyyy-MM-DD'));
      setValue('employees', data.employees);
      setValue('province', data.province);
      setValue('image', data.photo);
      setValue('image_logo', data.photo_logo);
    }
  }, [data]);

  const handleChangeID = (e) => {
    setValue('bumdesa_id', fBumdesId(e.target.value));
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Stack spacing={1}>
          <RHFUploadPhoto
            errorTextAlign="left"
            name="image"
            label="Foto Kantor BUM Desa"
            accept="image/*"
            imageFrom={'bumdesa'}
            maxSize={10000000}
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
                Ukuran maks {fData(10000000)}
              </Typography>
            }
          />

          <RHFUploadPhoto
            errorTextAlign="left"
            name="image_logo"
            label="Logo BUM Desa"
            accept="image/*"
            imageFrom={'bumdesa'}
            maxSize={10000000}
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
                Ukuran maks {fData(10000000)}
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

        <RHFTextField
          name="name"
          label="Nama BUM Desa"
          require
          disabled
          placeholder="Masukan Nama BUM Desa"
        />
        <RHFTextField
          name="bumdesa_id"
          placeholder="Contoh: 1101032012-1-004448"
          label="ID BUM Desa"
          require
          inputProps={{ maxLength: 19 }}
          onKeyUp={handleChangeID}
        />
        <RHFTextField
          name="founded_at"
          label="Tanggal Didirikan BUM Desa"
          type="date"
          require
          placeholder="Masukan Tanggal Didirikan BUM Desa"
        />
        <RHFTextField name="address" label="Alamat" require placeholder="Masukan Alamat BUM Desa" />

        <RHFAutocomplete
          require
          placeholder="Masukan Provinsi"
          name="province"
          label="Province"
          loading={false}
          options={provincies?.map((option) => option) ?? []}
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => (
            <li {...props} key={option.value}>
              {option.label}
            </li>
          )}
        />

        <RHFAutocomplete
          placeholder="Masukan Kabupaten"
          require
          name="city"
          label="Kabupaten"
          loading={false}
          options={cities?.map((option) => option) ?? []}
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => (
            <li {...props} key={option.value}>
              {option.label}
            </li>
          )}
        />

        <RHFAutocomplete
          placeholder="Masukan Kecamatan"
          require
          name="district"
          label="Kecamatan"
          loading={false}
          options={districts?.map((option) => option) ?? []}
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => (
            <li {...props} key={option.value}>
              {option.label}
            </li>
          )}
        />

        <RHFAutocomplete
          placeholder="Masukan Desa"
          require
          name="subdistrict"
          label="Desa"
          loading={false}
          options={subdistricts?.map((option) => option) ?? []}
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => (
            <li {...props} key={option.value}>
              {option.label}
            </li>
          )}
        />

        <RHFTextField
          name="postal_code"
          label="Kode Pos"
          disabled={!!postalCode?.label}
          placeholder="Masukan Kode Pos"
        />
        <RHFTextField
          name="employees"
          label="Jumlah Pegawai Tetap"
          require
          type="number"
          placeholder="Masukan Jumlah Pegawai Tetap"
        />

        <Divider />

        <Stack direction="row" spacing={1} justifyContent="flex-end">
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
