import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from 'prop-types';
import { Grid, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import { StyledLoadingButton } from "src/theme/custom/Button";
import * as Yup from 'yup';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useRef } from "react";
import { formatISO } from "date-fns";
import { useGetPostalCode } from "src/query/hooks/options/useGetPostalCode";
import Image from "src/components/Image";

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
    '& .MuiInput-underline:before': { borderBottomColor: '#D3D4D4' },
    '& .MuiInput-underline:after': { borderBottomColor: '#D3D4D4' },
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

export default function ProfileInfo({ isEdit, setIsEdit }) {

  const datePickerRef = useRef(null);

  const defaultValues = {
    foto_kantor: '1772525273_contoh_gambar_unit_usaha.png' ?? null,
    logo: '3742560361_Frame2608718.png' ?? null,
    nama: 'BUM DESA DASTIO AMBORGANG',
    id: '1101032012101231231',
    tanggal_berdiri: currentDate,
    alamat: 'Jl. Tanah Lapang Dusun I Desa Amborgang Kecamatan Porsea Kabupaten Toba.',
    provinsi: { value: 12, label: "SUMATERA UTARA" },
    kota: { value: 1212, label: "TOBA SAMOSIR" },
    desa: { value: 1212072004, label: "AMBORGANG" },
    kecamatan: { value: 121207, label: "PORSEA" },
    kode_pos: '22384',
  };

  const methods = useForm({
    resolver: yupResolver(ProfileInfoFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    setValue,
    handleSubmit,
    watch,
  } = methods;
  const desa = watch('desa');
  const { data: postalCode } = useGetPostalCode({ subdis_id: desa?.value });

  useEffect(() => {
    if (postalCode) setValue('kode_pos', postalCode?.label);
    else setValue('kode_pos', '');
  }, [postalCode]);

  const onSubmit = (data) => {
    console.log('onSubmit', data);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} sx={styles.content}>
        <Grid item xs={3}>
          <Typography variant="caption" fontWeight={600}>
            Foto Kantor BUM Desa
          </Typography>
          <Image
            alt="image" src={`${process.env.NEXT_PUBLIC_BUMDESA_ASSET}/unit/${defaultValues?.foto_kantor}`}
            sx={{ zIndex: 8, width: 132, height: 132, borderRadius: '16px' }}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption" fontWeight={600}>
            Logo BUM Desa
          </Typography>
          <Image
            alt="image" src={`${process.env.NEXT_PUBLIC_BUMDESA_ASSET}/unit/${defaultValues?.logo}`}
            sx={{ zIndex: 8, width: 132, height: 132, borderRadius: '16px' }}
          />
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={3} />
        <Grid item xs={4}>
          <RHFTextField
            name="nama"
            label="Nama BUM Desa"
            inputProps={{
              readOnly: true
            }}
            sx={styles.textfield}
            variant="standard"
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
          />
        </Grid>
        <Grid item xs={4}>
          <RHFTextField
            inputRef={datePickerRef}
            variant="standard"
            size="small"
            label="Tanggal Didirikan BUM Desa"
            name="tanggal_berdiri"
            type="date"
            sx={styles.textfield}
            onClick={() => {
              if (isEdit) datePickerRef.current.showPicker()
            }}
            inputProps={{
              max: currentDate,
              readOnly: true
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <RHFTextField
            name="alamat"
            label="Alamat"
            variant="standard"
            sx={styles.textfield}
            inputProps={{
              readOnly: true
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <RHFTextField
            name="provinsi"
            label="Provinsi"
            variant="standard"
            sx={styles.textfield}
            inputProps={{
              readOnly: true
            }}
            value={defaultValues.provinsi.label}
          />
        </Grid>
        <Grid item xs={4}>
          <RHFTextField
            name="kota"
            label="Kabupaten"
            variant="standard"
            sx={styles.textfield}
            inputProps={{
              readOnly: true
            }}
            value={defaultValues.kota.label}
          />
        </Grid>
        <Grid item xs={4}>
          <RHFTextField
            name="kecamatan"
            label="Kecamatan"
            variant="standard"
            sx={styles.textfield}
            inputProps={{
              readOnly: true
            }}
            value={defaultValues.kecamatan.label}
          />
        </Grid>
        <Grid item xs={4}>
          <RHFTextField
            name="desa"
            label="Desa"
            variant="standard"
            sx={styles.textfield}
            inputProps={{
              readOnly: true
            }}
            value={defaultValues.desa.label}
          />
        </Grid>
        <Grid item xs={4}>
          <RHFTextField
            variant="standard"
            name="kode_pos"
            label="Kode Pos"
            sx={styles.textfield}
            inputProps={{
              readOnly: true
            }}
            placeholder="Masukan Kode Pos"
          />
        </Grid>
      </Grid>
      <Stack sx={styles.action}>
        <StyledLoadingButton
          onClick={setIsEdit}
          sx={styles.action.button}
          startIcon={<EditIcon />}
          variant='outlined'
        >
          Ubah
        </StyledLoadingButton>
      </Stack>
    </FormProvider>
  )
}

ProfileInfo.propTypes = {
  isEdit: PropTypes.bool,
  setIsEdit: PropTypes.func,
};