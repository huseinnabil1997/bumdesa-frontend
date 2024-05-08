import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box } from '@mui/material';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import PropTypes from 'prop-types';
import { FormProvider, RHFAutocomplete, RHFTextField, RHFUploadPhoto } from 'src/components/hook-form';
import { handleDrop } from 'src/utils/helperFunction';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Info } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import Iconify from 'src/components/Iconify';

const positions = [
  { value: 'Kepala Desa', label: 'Kepala Desa' },
  { value: 'Sekretaris', label: 'Sekretaris' },
  { value: 'Bendahara', label: 'Bendahara' },
  { value: 'Kepala Sekretariat', label: 'Kepala Sekretariat' },
  { value: 'Kepala BUM Desa', label: 'Kepala BUM Desa' },
  { value: 'Kepala BUM Kecamatan', label: 'Kepala BUM Kecamatan' },
  { value: 'Kepala BUM Kabupaten', label: 'Kepala BUM Kabupaten' },
  { value: 'Kepala BUM Provinsi', label: 'Kepala BUM Provinsi' },
  { value: 'Kepala BUM Nasional', label: 'Kepala BUM Nasional' },
  { value: 'Kepala BUM Internasional', label: 'Kepala BUM Internasional' },
];

const NewModalSchema = Yup.object().shape({
  image: Yup.mixed().required('Foto Anggota BUM Desa wajib diisi'),
  name: Yup.string().required('Nama Anggota BUM Desa wajib diisi'),
  position: Yup.mixed().required('Jabatan Anggota wajib diisi'),
  phone: Yup.string()
    .required('Nomor telepon wajib diisi')
    .matches(/^\d+$/, 'Nomor telepon hanya boleh berisi angka')
    .min(10, 'Nomor telepon minimal diisi 10 digit')
    .max(13, 'Nomor telepon maksimal diisi 13 digit'),
});

// Styles
const styles = {
  dialogStyle: {
    width: '480px',
    height: '661px',
    borderRadius: '16px',
    overflow: 'hidden',
  },
  titleStyle: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#292929',
    p: '24px'
  },
  actionStyle: {
    justifyContent: 'space-between',
    p: '16px 24px 24px 24px'
  },
  buttonStyle: {
    width: '212px',
    height: '48px',
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
      '& .MuiInputBase-input': {
        height: '11px',
      },
    }
  },
  contentStyle: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  infoIcon: {
    width: '16px',
    height: '16px',
    color: '#1078CA'
  },
  infoText: {
    color: '#525252',
    fontWeight: 500,
    ml: 1,
    fontSize: '12px'
  },
  snackbar: {
    width: '344px',
    height: '48px',
    backgroundColor: '#E1F8EB',
    gap: '8px',
    padding: '8px',
    borderRadius: '4px'
  },
  snackbarIcon: {
    width: '16px',
    height: '16px',
    color: '#27AE60'
  }
};

function NewModal({ open, onClose, id }) {

  console.log('cek id', id);

  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    image: '1029928034_contoh_gambar_unit_usaha.png',
    name: 'Budi Jailani',
    position: positions?.[0],
    phone: '081234567890',
  };

  const methods = useForm({
    resolver: yupResolver(NewModalSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    setValue,
    handleSubmit,
    isSubmitting,
    watch,
  } = methods;

  const onSubmit = (data) => {
    console.log('onSubmit', data);
    onClose();
    enqueueSnackbar('', {
      variant: 'success',
      content: () => (
        <Box
          display="flex"
          alignItems="center"
          sx={styles.snackbar}
        >
          <Iconify icon={'eva:checkmark-circle-2-fill'} sx={styles.snackbarIcon} />
          <Typography fontSize="12px">Data Pengurus Telah Ditambahkan!</Typography>
        </Box>
      )
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: styles.dialogStyle,
        }}
      >
        <DialogTitle sx={styles.titleStyle}>Tambah Pengurus BUM Desa</DialogTitle>
        <DialogContent sx={styles.contentStyle}>

          <RHFUploadPhoto
            name="image"
            label="Foto Anggota BUM Desa"
            accept="image/*"
            maxSize={10000000}
            imageFrom={'unit'}
            onDrop={(file) => handleDrop(file, (val) => setValue(`image`, val))}
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
          <RHFTextField
            name="name"
            label="Nama Anggota BUM Desa"
            placeholder="Contoh: Budi Jailani"
            sx={styles.textfield}
            require
          />
          <RHFAutocomplete
            require
            name="position"
            label="Jabatan Anggota"
            placeholder="Pilih Sektor Usaha"
            loading={false}
            sx={styles.textfield.id}
            options={positions?.map((option) => option) ?? []}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <li {...props} key={option.value}>
                {option.label}
              </li>
            )}
          />
          <RHFTextField
            name="phone"
            label="Nomor Telepon"
            placeholder="Contoh: 081xxx"
            sx={styles.textfield}
            require
          />
          <Box sx={{
            height: '78px',
            padding: '12px',
            borderRadius: '4px',
            border: '1px solid #56ADF2',
            bgcolor: '#DDEFFC',
            display: 'flex',
            flexDirection: 'row',
          }}>
            <Info sx={styles.infoIcon} />
            <Typography sx={styles.infoText}>
              Data profil Anda akan digunakan untuk berbagai keperluan BUM Desa, seperti penyaluran 
              informasi, undangan kegiatan, dan lainnya.
            </Typography>
          </Box>

        </DialogContent>
        <DialogActions sx={styles.actionStyle}>
          <StyledLoadingButton
            variant='outlined'
            sx={styles.buttonStyle}
            onClick={onClose}
          >
            Batal
          </StyledLoadingButton>
          <StyledLoadingButton
            variant='contained'
            sx={styles.buttonStyle}
            onClick={handleSubmit(onSubmit)}
            disabled={
              isSubmitting
              || !watch('image')
              || !watch('name')
              || !watch('position')
              || !watch('phone')
            }
          >
            Simpan
          </StyledLoadingButton>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}

NewModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default NewModal;

