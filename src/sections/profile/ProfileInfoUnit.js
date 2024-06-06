import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from 'prop-types';
import { Box, Chip, Grid, Modal, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import { StyledLoadingButton } from "src/theme/custom/Button";
import * as Yup from 'yup';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import { useGetPostalCode } from "src/query/hooks/options/useGetPostalCode";
import Image from "src/components/Image";
import { useTheme } from '@mui/material/styles';
import { checkUrlImage } from "src/utils/helperFunction";
import { IconButtonAnimate } from "src/components/animate";

const ProfileInfoFormSchema = Yup.object().shape({
  image: Yup.mixed().required('Foto Unit Usaha wajib diisi'),
  name: Yup.string().required('Nama BUM Desa wajib diisi'),
  email: Yup.string()
    .email('Format email tidak valid')
    .required('Alamat Email Aktif Unit Usaha wajib diisi'),
  year_founded: Yup.string().required('Tahun Berdiri wajib diisi'),
  sector: Yup.object().nullable().required('Sektor Usaha wajib dipilih'),
  manager_name: Yup.string().required('Nama Manager BUM Desa wajib diisi'),
  position: Yup.string().required('Jabatan wajib diisi'),
  manager_phone: Yup.string()
    .required('Nomor telepon wajib diisi')
    .matches(/^\d+$/, 'Nomor telepon hanya boleh berisi angka')
    .min(10, 'Nomor telepon minimal diisi 10 digit')
    .max(13, 'Nomor telepon maksimal diisi 13 digit'),
});

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
    '& .MuiInput-underline:before': { borderBottomColor: '#D3D4D4' },
    '& .MuiInput-underline:after': { borderBottomColor: '#D3D4D4' },
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
  }
}

export default function ProfileInfoUnit({ data, setIsEdit }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [isValidImage, setIsValidImage] = useState(false);

  const theme = useTheme();

  const defaultValues = {
    id: data?.id ?? '',
    image: data?.photo ?? null,
    name: data?.name ?? '',
    position: 'Manager',
    email: data?.email ?? '',
    year_founded: data?.year_founded?.toString() ?? '',
    sector: { value: data?.id_sector, label: data?.sector } ?? null,
    manager_name: data?.organization?.name ?? '',
    manager_phone: data?.organization?.phone ?? '',
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

  const handleCloseModal = () => {
    setModalImage(null);
    setIsModalOpen(false);
  };

  const handleModalImage = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const onSubmit = (data) => {
    console.log('onSubmit', data);
  };

  useEffect(() => {
    const checkImage = async () => {
      const isValid = await checkUrlImage(`${process.env.NEXT_PUBLIC_BUMDESA_ASSET}/unit/${defaultValues?.image}`);
      setIsValidImage(isValid);
      return isValid;
    };

    checkImage();
  }, [defaultValues?.image]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} sx={styles.content}>
        <Grid item xs={11}>
          <IconButtonAnimate>
            <Image
              alt="image"
              src={isValidImage ? `${process.env.NEXT_PUBLIC_BUMDESA_ASSET}/unit/${defaultValues?.image}` : '/image/default_image.png'}
              onClick={() => handleModalImage(isValidImage ? `${process.env.NEXT_PUBLIC_BUMDESA_ASSET}/unit/${defaultValues?.image}` : '/image/default_image.png')}
              sx={{ zIndex: 8, maxWidth: 132, height: 132, borderRadius: '16px' }}
            />
          </IconButtonAnimate>
        </Grid>
        <Grid item xs={1}>
          {data?.status === 1 && (
            <Chip label="Aktif" sx={{ backgroundColor: '#2ECC71', color: 'white' }} />
          )}
          {data?.status === 0 && (
            <Chip label="Belum Aktif" sx={{ backgroundColor: '#EB5858', color: 'white' }} />
          )}
          {data?.status === 3 && (
            <Chip label="Nonaktif" sx={{ backgroundColor: theme.palette.warning.main, color: 'white' }} />
          )}
        </Grid>
        <Grid item xs={4}>
          <RHFTextField
            name="name"
            label="Nama Unit Usaha"
            placeholder="Contoh: Toko Ikan Mas Pak Budi"
            inputProps={{
              readOnly: true
            }}
            sx={styles.textfield}
            variant="standard"
            value={defaultValues?.name}
          />
        </Grid>
        <Grid item xs={4}>
          <RHFTextField
            name="year_founded"
            label="Tahun Berdiri"
            placeholder="Pilih Tahun"
            inputProps={{
              readOnly: true
            }}
            sx={styles.textfield}
            variant="standard"
            value={defaultValues?.year_founded}
          />
        </Grid>
        <Grid item xs={4}>
          <RHFTextField
            name="sector"
            label="Sektor Usaha"
            placeholder="Pilih Sektor Usaha"
            inputProps={{
              readOnly: true
            }}
            sx={styles.textfield}
            value={defaultValues?.sector?.label}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: '18px', fontWeight: 600, lineHeight: '28px' }}>
            Data Pengurus Unit Usaha
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <RHFTextField
            name="manager_name"
            label="Nama Manager BUM Desa"
            placeholder="Contoh: Budi Jailani"
            inputProps={{
              readOnly: true
            }}
            sx={styles.textfield}
            variant="standard"
            value={defaultValues?.manager_name}
          />
        </Grid>
        <Grid item xs={4}>
          <RHFTextField
            name="position"
            label="Jabatan"
            placeholder="Manager"
            inputProps={{
              readOnly: true
            }}
            sx={styles.textfield}
            variant="standard"
            value={defaultValues?.position}
          />
        </Grid>
        <Grid item xs={4}>
          <RHFTextField
            name="manager_phone"
            label="Nomor Telepon"
            placeholder="Contoh: 081xxx"
            inputProps={{
              readOnly: true
            }}
            sx={styles.textfield}
            variant="standard"
            value={defaultValues?.manager_phone}
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
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'auto', bgcolor: 'background.paper', boxShadow: 24 }}>
          {modalImage && <Image src={modalImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />}
        </Box>
      </Modal>
    </FormProvider>
  )
}

ProfileInfoUnit.propTypes = {
  isEdit: PropTypes.bool,
  setIsEdit: PropTypes.func,
  data: PropTypes.object,
};

