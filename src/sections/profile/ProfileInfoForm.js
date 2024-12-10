import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, Stack, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { FormProvider, RHFAutocomplete, RHFTextField, RHFUploadPhoto } from "src/components/hook-form";
import { StyledLoadingButton } from "src/theme/custom/Button";
import * as Yup from 'yup';
import { useEffect, useRef } from "react";
import { handleDrop } from "src/utils/helperFunction";
import { formatISO } from "date-fns";
import { isEqual } from "lodash";
import { useUpdateProfile } from "src/query/hooks/profile/useUpdateProfile";
import { useSnackbar } from "notistack";
import Iconify from "src/components/Iconify";
import { fBumdesId } from "src/utils/formatNumber";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "src/redux/slices/user";
import { alphabetAddressRegex, alphabetRegex, htmlTagRegex } from "src/utils/regex";
import { useGetProvincies } from "src/query/hooks/options/useGetProvincies";
import { useGetCities } from "src/query/hooks/options/useGetCities";
import { useGetDistricts } from "src/query/hooks/options/useGetDistricts";
import { useGetSubdistricts } from "src/query/hooks/options/useGetSubdistricts";
import { useGetPostalCode } from "src/query/hooks/options/useGetPostalCode";

const ProfileInfoFormSchema = Yup.object().shape({
  foto_kantor: Yup.mixed().required('Foto Kantor BUM Desa wajib diisi'),
  logo: Yup.mixed().required('Logo BUM Desa wajib diisi'),
  nama: Yup.string()
    .required('Nama BUM Desa wajib diisi')
    .matches(alphabetRegex, 'Nama BUM Desa harus mengandung huruf dan hanya boleh mengandung angka, spasi, serta simbol petik')
    .test('no-html', 'Nama BUM Desa tidak boleh mengandung tag HTML', value => !htmlTagRegex.test(value)),
  id: Yup.string().required('ID BUM Desa wajib diisi'),
  tanggal_berdiri: Yup.string()
    .required('Tanggal Didirikan BUM Desa wajib diisi')
    .test('no-html', 'Tanggal Didirikan BUM Desa tidak boleh mengandung tag HTML', value => !htmlTagRegex.test(value)),
  alamat: Yup.string()
    .required('Alamat wajib diisi')
    .matches(alphabetAddressRegex, `Alamat BUM Desa harus mengandung huruf dan hanya boleh mengandung angka, spasi, serta simbol( ' " / . , - )`)
    .test('no-html', 'Alamat tidak boleh mengandung tag HTML', value => !htmlTagRegex.test(value)),
  provinsi: Yup.mixed().required('Provinsi wajib diisi'),
  kota: Yup.mixed().required('Kabupaten wajib diisi'),
  desa: Yup.mixed().required('Desa wajib diisi'),
  kecamatan: Yup.mixed().required('Kecamatan wajib diisi'),
  kode_pos: Yup.mixed().required('Kode Pos wajib diisi'),
});

const currentDate = formatISO(new Date(), { representation: "date" });

const styles = {
  content: {
    minHeight: 483,
    p: '24px'
  },
  textfield: {
    '& .MuiInputBase-root': {
      height: '44px',
    },
    '& .MuiInputBase-input': {
      height: '11px',
    },
    id: {
      backgroundColor: '#CCE8FF',
      borderRadius: '8px',
      '& .MuiInputBase-root': {
        height: '44px',
      },
      "& fieldset": {
        border: 'none',
      },
    }
  },
  action: {
    minHeight: 80,
    p: '16px',
    borderTop: 'solid 1px #EAEBEB',
    justifyContent: 'center',
    alignItems: 'flex-end',
    button: {
      width: 160,
      height: 48,
      borderRadius: '8px',
      borderColor: '#1078CA'
    }
  },
  snackbar: {
    width: '344px',
    height: '42px',
    backgroundColor: '#E1F8EB',
    gap: '8px',
    padding: '12px',
    borderRadius: '4px'
  },
  snackbarIcon: {
    width: '16px',
    height: '16px',
    color: '#27AE60'
  }
}

export default function ProfileInfoForm({ data, setIsEdit }) {
  const dispatch = useDispatch();
  const datePickerRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const userData = useSelector(state => state.user.userData);
  const { mutate: onUpdate, isLoading: updating } = useUpdateProfile();

  const defaultValues = {
    foto_kantor: data?.photo ?? null,
    logo: data?.photo_logo ?? null,
    nama: data?.name ?? '',
    id: fBumdesId(data?.bumdesa_id_reference) ?? '',
    tanggal_berdiri: data?.founded_at ? formatISO(new Date(data?.founded_at), { representation: "date" }) : currentDate,
    alamat: data?.address ?? '',
    provinsi: data?.province ?? null,
    kota: data?.city ?? null,
    desa: data?.subdistrict ?? null,
    kecamatan: data?.district ?? null,
    kode_pos: data?.postal_code?.label ?? '',
  };

  const methods = useForm({
    resolver: yupResolver(ProfileInfoFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    setValue,
    handleSubmit,
    isSubmitting,
    watch,
    clearErrors,
    setError,
  } = methods;

  const provinsi = watch('provinsi');
  const kota = watch('kota');
  const kecamatan = watch('kecamatan');
  const desa = watch('desa');

  const currentValues = {
    foto_kantor: watch('foto_kantor'),
    logo: watch('logo'),
    nama: watch('nama'),
    id: watch('id'),
    tanggal_berdiri: watch('tanggal_berdiri'),
    alamat: watch('alamat'),
    provinsi: watch('provinsi'),
    kota: watch('kota'),
    kecamatan: watch('kecamatan'),
    desa: watch('desa'),
    kode_pos: watch('kode_pos')
  };

  useEffect(() => {
    if (provinsi) {
      clearErrors('provinsi');
    } else {
      setError('provinsi', { type: 'manual', message: 'Provinsi wajib diisi' });
    }
  }, [provinsi, clearErrors, setError]);

  useEffect(() => {
    if (kota) {
      clearErrors('kota');
    } else {
      setError('kota', { type: 'manual', message: 'Kabupaten wajib diisi' });
    }
  }, [kota, clearErrors, setError]);

  useEffect(() => {
    if (kecamatan) {
      clearErrors('kecamatan');
    } else {
      setError('kecamatan', { type: 'manual', message: 'Kecamatan wajib diisi' });
    }
  }, [kecamatan, clearErrors, setError]);

  useEffect(() => {
    if (desa) {
      clearErrors('desa');
    } else {
      setError('desa', { type: 'manual', message: 'Desa wajib diisi' });
    }
  }, [desa, clearErrors, setError]);

  const areValuesEqual = isEqual(currentValues, defaultValues);

  const { data: provincies } = useGetProvincies();
  const { data: cities } = useGetCities({ prov_id: provinsi?.value });
  const { data: districts } = useGetDistricts({ city_id: kota?.value });
  const { data: subdistricts } = useGetSubdistricts({ dis_id: kecamatan?.value });
  const { data: postalCode } = useGetPostalCode({ subdis_id: desa?.value });

  useEffect(() => {
    if (postalCode) setValue('kode_pos', postalCode?.label);
    else setValue('kode_pos', '');
  }, [postalCode, setValue]);

  const handleProvinsi = (value) => {
    setValue('provinsi', value)
    setValue('kota', null);
    setValue('kecamatan', null);
    setValue('desa', null);
  }

  const handleKota = (value) => {
    setValue('kota', value)
    setValue('kecamatan', null);
    setValue('desa', null);
  }

  const handleKecamatan = (value) => {
    setValue('kecamatan', value)
    setValue('desa', null);
    setValue('kode_pos', null);
  }

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('name', data?.nama);
    formData.append('address', data?.alamat);
    formData.append('province', data?.provinsi);
    formData.append('city', data?.kota);
    formData.append('district', data?.kecamatan);
    formData.append('subdistrict', data?.desa);
    formData.append('postal_code', data?.kode_pos);
    formData.append('founded_at', data?.tanggal_berdiri);
    formData.append('logo', data?.logo);
    formData.append('photo', data?.foto_kantor);
    formData.append('area_code', data?.desa?.value);
    onUpdate(
      {
        id: userData?.bumdesa_id,
        payload: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      },
      {
        onSuccess: (res) => {
          enqueueSnackbar('', {
            variant: 'success',
            content: () => (
              <Box
                display="flex"
                alignItems="center"
                sx={styles.snackbar}
              >
                <Iconify icon={'eva:checkmark-circle-2-fill'} sx={styles.snackbarIcon} />
                <Typography fontSize="12px">Informasi Baru BUM Desa sudah diperbarui!</Typography>
              </Box>
            )
          });
          setIsEdit();
          dispatch(setUser({ ...userData, logo: res?.data?.photo_logo }));
        },
        onError: (err) => {
          enqueueSnackbar(err.message, { variant: 'error' });
        },
      }
    );
  };

  const handleChangeID = (e) => {
    setValue('id', fBumdesId(e.target.value));
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} sx={styles.content}>
        <Grid item xs={6}>
          <RHFUploadPhoto
            name="foto_kantor"
            label="Foto Kantor BUM Desa"
            accept="image/*"
            maxSize={10000000}
            imageFrom={'bumdesa'}
            onDrop={(file) => handleDrop(file, (val) => {
              setValue(`foto_kantor`, val);
            })}
            errorTextAlign="left"
            errorPosition="bottom"
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
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={6}>
          <RHFUploadPhoto
            name="logo"
            label="Logo BUM Desa"
            accept="image/*"
            maxSize={10000000}
            imageFrom={'bumdesa'}
            onDrop={(file) => handleDrop(file, (val) => setValue(`logo`, val))}
            errorTextAlign="left"
            errorPosition="bottom"
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
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={4}>
          <RHFTextField
            name="nama"
            label="Nama BUM Desa"
            sx={styles.textfield}
            require
          />
        </Grid>
        <Grid item xs={4}>
          <RHFTextField
            name="id"
            label="ID BUM Desa"
            inputProps={{
              style: { color: '#00549B' },
              readOnly: true
            }}
            sx={styles.textfield.id}
            onKeyUp={handleChangeID}
            require
          />
        </Grid>
        <Grid item xs={4}>
          <RHFTextField
            inputRef={datePickerRef}
            size="small"
            label="Tanggal Didirikan BUM Desa"
            name="tanggal_berdiri"
            type="date"
            sx={styles.textfield}
            onClick={() => {
              datePickerRef.current.showPicker()
            }}
            inputProps={{
              max: currentDate,
            }}
            require
          />
        </Grid>
        <Grid item xs={4}>
          <RHFTextField
            name="alamat"
            label="Alamat"
            sx={styles.textfield}
            require
          />
        </Grid>
        <Grid item xs={4}>
          <RHFAutocomplete
            require
            name="provinsi"
            label="Provinsi"
            loading={false}
            sx={styles.textfield}
            onChange={(e, value) => handleProvinsi(value)}
            options={provincies?.map((option) => option) ?? []}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <li {...props} key={option.value}>
                {option.label}
              </li>
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <RHFAutocomplete
            require
            name="kota"
            label="Kabupaten"
            loading={false}
            sx={styles.textfield}
            onChange={(e, value) => handleKota(value)}
            options={cities?.map((option) => option) ?? []}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <li {...props} key={option.value}>
                {option.label}
              </li>
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <RHFAutocomplete
            require
            name="kecamatan"
            label="Kecamatan"
            loading={false}
            sx={styles.textfield}
            onChange={(e, value) => handleKecamatan(value)}
            options={districts?.map((option) => option) ?? []}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <li {...props} key={option.value}>
                {option.label}
              </li>
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <RHFAutocomplete
            require
            name="desa"
            label="Desa"
            loading={false}
            sx={styles.textfield}
            options={subdistricts?.map((option) => option) ?? []}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <li {...props} key={option.value}>
                {option.label}
              </li>
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <RHFTextField
            name="kode_pos"
            label="Kode Pos"
            sx={styles.textfield}
            disabled={!!postalCode?.label}
            placeholder="Masukan Kode Pos"
            require
          />
        </Grid>
      </Grid>
      <Stack sx={styles.action}>
        <Stack direction="row" spacing={2}>
          <StyledLoadingButton
            onClick={setIsEdit}
            loading={isSubmitting}
            variant='outlined'
          >
            Batalkan
          </StyledLoadingButton>
          <StyledLoadingButton
            loading={isSubmitting}
            disabled={areValuesEqual || updating}
            onClick={handleSubmit(onSubmit)}
            sx={styles.action.button}
            variant='contained'
          >
            Simpan
          </StyledLoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  )
}

ProfileInfoForm.propTypes = {
  data: PropTypes.object,
  setIsEdit: PropTypes.func,
};

