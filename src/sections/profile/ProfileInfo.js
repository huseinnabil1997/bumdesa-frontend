import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from 'prop-types';
import { Box, Grid, Modal, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import { StyledLoadingButton } from "src/theme/custom/Button";
import * as Yup from 'yup';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useRef, useState } from "react";
import { formatISO } from "date-fns";
import { useGetPostalCode } from "src/query/hooks/options/useGetPostalCode";
import Image from "src/components/Image";
import { fBumdesId } from "src/utils/formatNumber";
import { checkUrlImage } from "src/utils/helperFunction";
import { IconButtonAnimate } from "src/components/animate";
import { useSelector } from "react-redux";

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

export default function ProfileInfo({ data, isEdit, setIsEdit, from = '' }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [isValidImageKantor, setIsValidImageKantor] = useState(false);
  const [isValidImageLogo, setIsValidImageLogo] = useState(false);

  const datePickerRef = useRef(null);

  const userData = useSelector(state => state.user.userData);

  const defaultValues = {
    foto_kantor: data?.photo ?? null,
    logo: data?.photo_logo ?? null,
    nama: data?.name ?? '',
    id: data?.bumdesa_id ?? '',
    tanggal_berdiri: data?.founded_at ? formatISO(new Date(data?.founded_at), { representation: "date" }) : currentDate,
    alamat: data?.address ?? '',
    provinsi: data?.province ?? null,
    kota: data?.city ?? null,
    desa: data?.subdistrict ?? null,
    kecamatan: data?.district ?? null,
    kode_pos: data?.postal_code ?? '',
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
    const checkImageKantor = async () => {
      const isValid = await checkUrlImage(`${process.env.NEXT_PUBLIC_BUMDESA_ASSET}bumdesa/${defaultValues?.foto_kantor}`);
      setIsValidImageKantor(isValid);
      return isValid;
    };
    const checkImageLogo = async () => {
      const isValid = await checkUrlImage(`${process.env.NEXT_PUBLIC_BUMDESA_ASSET}bumdesa/${defaultValues?.logo}`);
      setIsValidImageLogo(isValid);
      return isValid;
    };
    checkImageKantor();
    checkImageLogo();
  }, [defaultValues?.foto_kantor, defaultValues?.logo]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} sx={styles.content}>
        <Grid item xs={3}>
          <Typography variant="caption" fontWeight={600}>
            Foto Kantor BUM Desa
          </Typography>
          <IconButtonAnimate>
            <Image
              alt="image"
              src={
                isValidImageKantor
                  ? `${process.env.NEXT_PUBLIC_BUMDESA_ASSET}bumdesa/${defaultValues?.foto_kantor}`
                  : '/image/default_image.png'
              }
              onClick={() => {
                handleModalImage(isValidImageKantor
                  ? `${process.env.NEXT_PUBLIC_BUMDESA_ASSET}bumdesa/${defaultValues?.foto_kantor}`
                  : '/image/default_image.png'
                )
              }}
              sx={{ zIndex: 8, maxWidth: 132, height: 132, borderRadius: '16px' }}
            />
          </IconButtonAnimate>
        </Grid>
        <Grid item xs={3} display="flex" flexDirection="column">
          <Typography variant="caption" fontWeight={600}>
            Logo BUM Desa
          </Typography>
          <IconButtonAnimate>
            <Image
              alt="image"
              src={isValidImageLogo ? `${process.env.NEXT_PUBLIC_BUMDESA_ASSET}bumdesa/${defaultValues?.logo}` : '/image/default_image.png'}
              onClick={() => {
                handleModalImage(isValidImageLogo ? `${process.env.NEXT_PUBLIC_BUMDESA_ASSET}bumdesa/${defaultValues?.logo}` : '/image/default_image.png')
              }}
              sx={{ zIndex: 8, maxWidth: 132, height: 132, borderRadius: '16px' }}
            />
          </IconButtonAnimate>
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
            value={defaultValues?.nama}
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
            value={fBumdesId(defaultValues?.id)}
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
            value={defaultValues?.tanggal_berdiri}
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
            value={defaultValues?.alamat}
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
            value={defaultValues?.provinsi?.label}
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
            value={defaultValues?.kota?.label}
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
            value={defaultValues?.kecamatan?.label}
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
            value={defaultValues?.desa?.label}
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
            value={defaultValues?.kode_pos.label}
          />
        </Grid>
      </Grid>
      {(userData?.unit_id === 0 && from !== 'kanpus') &&
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
      }
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

ProfileInfo.propTypes = {
  isEdit: PropTypes.bool,
  setIsEdit: PropTypes.func,
  data: PropTypes.object,
  from: PropTypes.string,
};

