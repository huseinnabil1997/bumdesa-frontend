import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { FormProvider, RHFAutocomplete, RHFTextField, RHFUploadPhoto } from "src/components/hook-form";
import { StyledLoadingButton } from "src/theme/custom/Button";
import * as Yup from 'yup';
import { useEffect, useRef } from "react";
import { handleDrop } from "src/utils/helperFunction";
import { formatISO } from "date-fns";
import { useGetProvincies } from "src/query/hooks/options/useGetProvincies";
import { useGetCities } from "src/query/hooks/options/useGetCities";
import { useGetDistricts } from "src/query/hooks/options/useGetDistricts";
import { useGetSubdistricts } from "src/query/hooks/options/useGetSubdistricts";
import { useGetPostalCode } from "src/query/hooks/options/useGetPostalCode";

const ProfileInfoFormSchema = Yup.object().shape({
  foto_kantor: Yup.mixed().required('Foto Kantor BUM Desa wajib diisi'),
  logo: Yup.mixed().required('Logo BUM Desa wajib diisi'),
  nama: Yup.string().required('Nama BUM Desa wajib diisi'),
  id: Yup.string().required('ID BUM Desa wajib diisi'),
  tanggal_berdiri: Yup.string().required('Tanggal Didirikan BUM Desa wajib diisi'),
  alamat: Yup.string().required('Alamat wajib diisi'),
  provinsi: Yup.mixed().required('Provinsi wajib diisi'),
  kota: Yup.mixed().required('Kabupaten wajib diisi'),
  desa: Yup.mixed().required('Desa wajib diisi'),
  kecamatan: Yup.mixed().required('Kecamatan wajib diisi'),
  kode_pos: Yup.mixed().required('Kode Pos wajib diisi'),
});

const currentDate = formatISO(new Date(), { representation: "date" });

const styles = {
  content: {
    height: 483,
    p: '24px'
  },
  textfield: {
    width: '293px',
    '& .MuiInputBase-root': {
      height: '44px',
    },
    '& .MuiInputBase-input': {
      height: '11px',
    },
    id: {
      backgroundColor: '#CCE8FF',
      borderRadius: '8px',
      width: '293px',
      '& .MuiInputBase-root': {
        height: '44px',
      },
      "& fieldset": {
        border: 'none',
      },
    }
  },
  action: {
    height: 80,
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
  }
}

export default function ProfileInfoForm({ setIsEdit }) {

  const datePickerRef = useRef(null);

  const defaultValues = {
    foto_kantor: null,
    logo: null,
    nama: 'BUM DESA DASTIO AMBORGANG',
    id: '1101032012101231231',
    tanggal_berdiri: currentDate,
    alamat: 'Jl. Tanah Lapang Dusun I Desa Amborgang Kecamatan Porsea Kabupaten Toba.',
    provinsi: { value: 12, label: "SUMATERA UTARA" },
    kota: { value: 1212, label: "TOBA SAMOSIR" },
    desa: { value: 1212072004, label: "AMBORGANG" },
    kecamatan: { value: 121207, label: "PORSEA" },
    kode_pos: '',
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
    formState,
  } = methods;

  const provinsi = watch('provinsi');
  const kota = watch('kota');
  const kecamatan = watch('kecamatan');
  const desa = watch('desa');
  const foto_kantor = watch('foto_kantor');
  const logo = watch('logo');

  const { data: provincies } = useGetProvincies();
  const { data: cities } = useGetCities({ prov_id: provinsi?.value });
  const { data: districts } = useGetDistricts({ city_id: kota?.value });
  const { data: subdistricts } = useGetSubdistricts({ dis_id: kecamatan?.value });
  const { data: postalCode } = useGetPostalCode({ subdis_id: desa?.value });

  useEffect(() => {
    if (postalCode) setValue('kode_pos', postalCode?.label);
    else setValue('kode_pos', '');
  }, [postalCode]);

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

  // useEffect(() => {
  //   methods.reset(defaultValues);
  // }, []);
  const isPhotoUploaded = () => {
    if (foto_kantor && logo) return true
    else return false
  };

  const disableSimpan = () => {
    if (formState.isDirty === false && isPhotoUploaded() === true) return false;
    if (formState.isDirty === true) {
      if (formState.isValid && isPhotoUploaded()) return false;
      else return true;
    } 
    else return true;
  }

  const onSubmit = (data) => {
    console.log('onSubmit', data);
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
            imageFrom={'unit'}
            onDrop={(file) => handleDrop(file, (val) => setValue(`foto_kantor`, val))}
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
            imageFrom={'unit'}
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
            disabled={disableSimpan()}
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
  setIsEdit: PropTypes.func,
};