import { Box, Button, Card, Chip, Container, Divider, Modal, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import Layout from 'src/layouts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import { useSnackbar } from 'notistack';
import Iconify from 'src/components/Iconify';
import usePatch from 'src/query/hooks/mutation/usePatch';
import { useGetUnitById } from 'src/query/hooks/units/useGetUnitById';
import Image from "src/components/Image";
import AlertDeleteUnit from 'src/components/modal/DeleteUnit';
import useDelete from 'src/query/hooks/mutation/useDelete';
import { useTheme } from '@mui/material/styles';
import { checkUrlImage } from 'src/utils/helperFunction';
import { alphabetRegex, htmlTagRegex } from 'src/utils/regex';

const styles = {
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
      '& .MuiInputBase-root': {
        height: '44px',
      },
      "& fieldset": {
        border: 'none',
      },
    }
  },
}

DetailUnitUsaha.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default function DetailUnitUsaha() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [alertDelete, setAlertDelete] = useState(null);
  const [isValidImage, setIsValidImage] = useState(false);

  const { themeStretch } = useSettings();

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const theme = useTheme();

  const { data } = useGetUnitById(router.query.id);

  const mutation = usePatch();

  const mutationDelete = useDelete();

  const NewUnitFormSchema = Yup.object().shape({
    image: Yup.mixed().required('Foto Unit Usaha wajib diisi'),
    name: Yup.string()
      .required('Nama Unit Usaha wajib diisi')
      .matches(alphabetRegex, 'Nama Unit Usaha harus mengandung huruf dan hanya boleh mengandung angka, spasi, serta simbol petik')
      .test('no-html', 'Nama Unit Usaha tidak boleh mengandung tag HTML', value => !htmlTagRegex.test(value)),
    email: Yup.string()
      .email('Format email tidak valid')
      .required('Alamat Email Aktif Unit Usaha wajib diisi'),
    year_founded: Yup.string()
      .required('Tahun Berdiri wajib diisi')
      .test('no-html', 'Tahun Berdiri tidak boleh mengandung tag HTML', value => !htmlTagRegex.test(value)),
    sector: Yup.object().nullable().required('Sektor Usaha wajib dipilih'),
    manager_name: Yup.string()
      .required('Nama Manager Unit Usaha wajib diisi')
      .test('no-html', 'Nama Manager Unit Usaha tidak boleh mengandung tag HTML', value => !htmlTagRegex.test(value)),
    position: Yup.string()
      .required('Jabatan wajib diisi')
      .test('no-html', 'Jabatan tidak boleh mengandung tag HTML', value => !htmlTagRegex.test(value)),
    manager_phone: Yup.string()
      .required('Nomor telepon wajib diisi')
      .matches(/^\d+$/, 'Nomor telepon hanya boleh berisi angka')
      .min(10, 'Nomor telepon minimal diisi 10 digit')
      .max(13, 'Nomor telepon maksimal diisi 13 digit'),
  });

  const defaultValues = {
    id: router.query.id ?? '',
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
    resolver: yupResolver(NewUnitFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    isSubmitting,
    // reset,
  } = methods;

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('image', data?.image);
    formData.append('name', data?.name);
    formData.append('email', data?.email);
    formData.append('year_founded', new Date(data.year_founded).getFullYear());
    formData.append('sector', data?.sector?.label);
    formData.append('id_sector', parseInt(data?.sector?.value));
    formData.append('manager_name', data?.manager_name);
    formData.append('manager_phone', data?.manager_phone);

    const headers = {
      'Content-Type': 'multipart/form-data',
    };

    try {
      await mutation.mutateAsync({
        endpoint: `/business-units/${data.id}`,
        payload: formData,
        headers: headers,
      });
      if (data?.email === defaultValues.email) {
        await enqueueSnackbar(
          '',
          {
            variant: 'success',
            content: () => (
              <Box
                display="flex"
                justifyContent="space-around"
                alignItems="center"
                sx={{ width: '280px', height: 48, backgroundColor: '#E1F8EB', p: '8px', borderRadius: '4px' }}
              >
                <SnackbarIcon icon={'eva:checkmark-circle-2-fill'} color="success" />
                <Typography mr="12px" fontSize="12px">Data Anda telah berhasil diperbarui.</Typography>
              </Box>
            )
          }
        );
        router.push('list');
      } else {
        await enqueueSnackbar(
          '',
          {
            variant: 'success',
            content: () => (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: 475, height: 96, backgroundColor: '#E1F8EB', p: '8px', borderRadius: '4px' }}
              >
                <SnackbarIcon icon={'eva:checkmark-circle-2-fill'} color="success" />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  flexDirection="column"
                >
                  <Typography fontSize="12px" mb="10px">
                    Email konfirmasi telah dikirim ke <span style={{ fontSize: '12px', fontWeight: 700 }}>{data?.email}</span>
                  </Typography>
                  <Typography fontSize="12px">Silakan klik tautan (link) di dalam email konfirmasi tersebut untuk memverifikasi alamat email.</Typography>
                </Box>
              </Box>
            )
          }
        );
        router.push('list');
      }
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: 'error' });
      console.log('error Edit Units', error);
    }
  };

  const handleCloseModal = () => {
    setModalImage(null);
    setIsModalOpen(false);
  };

  const handleModalImage = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const handleDeleteRow = (id) => {
    setAlertDelete({ id });
  };

  const onDelete = async () => {
    try {
      const response = await mutationDelete.mutateAsync({
        endpoint: `/business-units/${alertDelete?.id}`,
      });
      enqueueSnackbar(response.message ?? "Sukses menghapus data", { variant: 'success' });
      setAlertDelete(null);
      router.push('list');
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      if (error.code === 412) {
        setAlertDelete({ id: alertDelete?.id, status: 1 });
      }
    }
  };

  useEffect(() => {
    methods.reset(defaultValues);
  }, [data]);

  useEffect(() => {
    const checkImage = async () => {
      const isValid = await checkUrlImage(`${process.env.NEXT_PUBLIC_BUMDESA_ASSET}unit/${defaultValues?.image}`);
      setIsValidImage(isValid);
      return isValid;
    };

    checkImage();
  }, [defaultValues?.image]);

  return (
    <Page title="Unit Usaha: Detail">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Stack direction="row" justifyContent="space-between">
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push('list')}
            sx={{
              '&:hover': { backgroundColor: '#1976D2', color: 'white' },
              backgroundColor: '#DDEFFC',
              color: '#1976D2',
              height: 48,
              width: 124,
            }}
          >
            Kembali
          </Button>
          <Stack direction="row" spacing={2}>
            <StyledLoadingButton
              variant="outlined"
              sx={{ width: '106px', height: '48px' }}
              onClick={() => router.push(`edit?id=${data?.id}`)}
              loading={isSubmitting}
            >
              Edit
            </StyledLoadingButton>
            <StyledLoadingButton
              variant="text"
              sx={{
                width: '106px',
                height: '48px',
                color: '#E84040',
                '&:hover': {
                  backgroundColor: 'white',
                  color: '#E84040'
                }
              }}
              onClick={() => handleDeleteRow(data?.id)}
              loading={isSubmitting}
            >
              Hapus
            </StyledLoadingButton>
          </Stack>
        </Stack>

        <Card
          elevation={3}
          sx={{
            maxHeight: 'auto',
            minHeight: '556px',
            mt: '36px',
            borderRadius: '16px',
          }}
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} p="24px">
              <Stack justifyContent="space-between" direction="row">
                <Typography sx={{ fontSize: '18px', fontWeight: 600, lineHeight: '28px' }}>
                  Informasi Unit Usaha
                </Typography>
                {data?.status === 1 && (
                  <Chip label="Aktif" sx={{ backgroundColor: '#2ECC71', color: 'white' }} />
                )}
                {data?.status === 0 && (
                  <Chip label="Belum Aktif" sx={{ backgroundColor: '#EB5858', color: 'white' }} />
                )}
                {data?.status === 3 && (
                  <Chip label="Nonaktif" sx={{ backgroundColor: theme.palette.warning.main, color: 'white' }} />
                )}
              </Stack>

              <Image
                alt="image"
                src={isValidImage ? `${process.env.NEXT_PUBLIC_BUMDESA_ASSET}unit/${defaultValues?.image}` : '/image/default_image.png'}
                onClick={() => handleModalImage(isValidImage ? `${process.env.NEXT_PUBLIC_BUMDESA_ASSET}unit/${defaultValues?.image}` : '/image/default_image.png')}
                sx={{ zIndex: 8, maxWidth: 132, height: 132, borderRadius: '16px' }}
              />

              <Stack spacing={2} direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }}>
                <RHFTextField
                  name="name"
                  label="Nama Unit Usaha"
                  placeholder="Contoh: Toko Ikan Mas Pak Budi"
                  inputProps={{
                    readOnly: true
                  }}
                  sx={styles.textfield}
                  variant="standard"
                />
                <RHFTextField
                  name="email"
                  label="Alamat Email Aktif Unit Usaha"
                  placeholder="Contoh: budi@gmail.com"
                  inputProps={{
                    readOnly: true
                  }}
                  sx={styles.textfield}
                  variant="standard"
                />
                <RHFTextField
                  name="year_founded"
                  label="Tahun Berdiri"
                  placeholder="Pilih Tahun"
                  inputProps={{
                    readOnly: true
                  }}
                  sx={styles.textfield}
                  variant="standard"
                />
              </Stack>
              <Stack spacing={2} direction="row" useFlexGap flexWrap="wrap">
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
              </Stack>

              <Typography sx={{ fontSize: '18px', fontWeight: 600, lineHeight: '28px' }}>
                Data Pengurus Unit Usaha
              </Typography>
              <Stack spacing={2} direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }}>
                <RHFTextField
                  name="manager_name"
                  label="Nama Manager Unit Usaha"
                  placeholder="Contoh: Budi Jailani"
                  inputProps={{
                    readOnly: true
                  }}
                  sx={styles.textfield}
                  variant="standard"
                />
                <RHFTextField
                  name="position"
                  label="Jabatan"
                  placeholder="Manager"
                  inputProps={{
                    readOnly: true
                  }}
                  sx={styles.textfield}
                  variant="standard"
                />
                <RHFTextField
                  name="manager_phone"
                  label="Nomor Telepon"
                  placeholder="Contoh: 081xxx"
                  inputProps={{
                    readOnly: true
                  }}
                  sx={styles.textfield}
                  variant="standard"
                />
              </Stack>
            </Stack>
            <Divider />
          </FormProvider>
        </Card>
      </Container>
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
      <AlertDeleteUnit open={!!alertDelete} onClose={() => setAlertDelete(null)} action={onDelete} status={alertDelete?.status} />
    </Page>
  );
}

// ----------------------------------------------------------------------

SnackbarIcon.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error']),
};

function SnackbarIcon({ icon, color }) {
  return (
    <Box
      component="span"
      sx={{
        mr: 1.5,
        width: 40,
        height: 40,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        color: color === 'success' ? '#27AE60' : `${color}.main`,
        // bgcolor: (theme) => alpha(theme.palette[color].main, 0.16),
      }}
    >
      <Iconify icon={icon} width={24} height={24} />
    </Box>
  );
}
