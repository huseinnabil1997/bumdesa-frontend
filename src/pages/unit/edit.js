import { Box, Button, Card, Container, Divider, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import Layout from 'src/layouts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { FormProvider, RHFAutocomplete, RHFTextField, RHFUploadPhoto } from 'src/components/hook-form';
import { handleDrop } from 'src/utils/helperFunction';
import RHFDatePicker from 'src/components/hook-form/RHFDatePicker';
import InfoIcon from '@mui/icons-material/Info';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import { useSnackbar } from 'notistack';
import Iconify from 'src/components/Iconify';
import usePatch from 'src/query/hooks/mutation/usePatch';
import { useGetUnitById } from 'src/query/hooks/units/useGetUnitById';
import { useGetSectors } from 'src/query/hooks/units/useGetSectors';

EditUnitUsaha.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default function EditUnitUsaha() {

  const { themeStretch } = useSettings();

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const { data: sectorData, isLoading: isLoadingSectors } = useGetSectors();
  const { data, isLoading } = useGetUnitById(router.query.id);

  console.log('husein', sectorData)

  const mutation = usePatch();

  const NewUnitFormSchema = Yup.object().shape({
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
    setValue,
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

  useEffect(() => {
    methods.reset(defaultValues);
  }, [data]);

  console.log('defaultValues', defaultValues)

  return (
    <Page title="Unit Usaha: Edit">
      <Container maxWidth={themeStretch ? false : 'lg'}>
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

        <Card
          elevation={3}
          sx={{
            maxWidth: '960px',
            maxHeight: 'auto',
            minHeight: '556px',
            // p: '24px',
            mt: '36px',
            borderRadius: '16px',
          }}
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} p="24px">
              <Typography sx={{ fontSize: '18px', fontWeight: 600, lineHeight: '28px' }}>
                Informasi Unit Usaha
              </Typography>
              <RHFUploadPhoto
                name="image"
                label="Foto Unit Usaha"
                accept="image/*"
                maxSize={10000000}
                imageFrom={'unit'}
                onDrop={(file) => handleDrop(file, (val) => setValue(`image`, val))}
                errorTextAlign="left"
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

              <Stack spacing={2} direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }}>
                <RHFTextField
                  name="name"
                  label="Nama Unit Usaha"
                  placeholder="Contoh: Toko Ikan Mas Pak Budi"
                  sx={{
                    width: '293px',
                    '& .MuiInputBase-root': {
                      height: '44px',
                    },
                    '& .MuiInputBase-input': {
                      height: '11px',
                    }
                  }}
                  require
                />
                <RHFTextField
                  name="email"
                  label="Alamat Email Aktif Unit Usaha"
                  placeholder="Contoh: budi@gmail.com"
                  sx={{
                    width: '293px',
                    height: '44px',
                    '& .MuiInputBase-root': {
                      height: '44px',
                    },
                    '& .MuiInputBase-input': {
                      height: '11px',
                    }
                  }}
                  require
                />
                <RHFDatePicker
                  name="year_founded"
                  label="Tahun Berdiri"
                  placeholder="Pilih Tahun"
                  format="yyyy"
                  views={['year']}
                  openTo="year"
                  sx={{
                    width: '293px',
                    '& .MuiInputBase-root': {
                      height: '44px',
                      borderRadius: '8px',
                    },
                    '& .MuiInputBase-input': {
                      height: '11px',
                    }
                  }}
                  require
                />
              </Stack>
              <Stack spacing={2} direction="row" useFlexGap flexWrap="wrap">
                <RHFAutocomplete
                  name="sector"
                  label="Sektor Usaha"
                  placeholder="Pilih Sektor Usaha"
                  size="small"
                  loading={isLoading || isLoadingSectors}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  options={sectorData?.map((option) => option) ?? []}
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <li {...props} key={option.value}>
                      {option.label}
                    </li>
                  )}
                  sx={{
                    width: '293px',
                    '& .MuiInputBase-root': {
                      height: '44px',
                    },
                    '& .MuiInputBase-input': {
                      height: '11px',
                    }
                  }}
                  require
                />
              </Stack>

              <Typography sx={{ fontSize: '18px', fontWeight: 600, lineHeight: '28px' }}>
                Data Pengurus Unit Usaha
              </Typography>
              <Stack spacing={2} direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }}>
                <RHFTextField
                  name="manager_name"
                  label="Nama Manager BUM Desa"
                  placeholder="Contoh: Budi Jailani"
                  sx={{
                    width: '293px',
                    '& .MuiInputBase-root': {
                      height: '44px',
                    },
                    '& .MuiInputBase-input': {
                      height: '11px',
                    }
                  }}
                  require
                />
                <RHFTextField
                  name="position"
                  label="Jabatan"
                  inputProps={{
                    style: { color: '#00549B' },
                    readOnly: true
                  }}
                  sx={{
                    backgroundColor: '#CCE8FF',
                    borderRadius: '8px',
                    width: '293px',
                    '& .MuiInputBase-root': {
                      height: '44px',
                    },
                    "& fieldset": {
                      border: 'none',
                    },
                  }}
                  require
                />
                <RHFTextField
                  name="manager_phone"
                  label="Nomor Telepon"
                  placeholder="Contoh: 081xxx"
                  sx={{
                    width: '293px',
                    '& .MuiInputBase-root': {
                      height: '44px',
                    },
                    '& .MuiInputBase-input': {
                      height: '11px',
                    }
                  }}
                  require
                />
              </Stack>
            </Stack>
            <Divider />
            <Stack
              direction="row"
              p="16px 24px 16px 24px"
              width="100%"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack spacing={0.5}>
                <Stack direction="row" display="flex" alignItems="center" spacing={0.5}>
                  <InfoIcon fontSize="13.33px" sx={{ color: '#1078CA' }} />
                  <Typography fontWeight={600} color="#1078CA" fontSize="14px">
                    Informasi
                  </Typography>
                </Stack>
                <Typography variant="caption" fontSize="12px" fontWeight={500} color="#929393">
                  Username dan password akan dikirimkan melalui email unit usaha.
                  <span style={{ fontSize: '12px', fontWeight: 700 }}>
                    {' '}
                    Pastikan email yang dimasukkan benar dan aktif.
                  </span>
                </Typography>
              </Stack>
              <StyledLoadingButton
                variant="contained"
                sx={{ width: '160px', height: '48px' }}
                onClick={handleSubmit(onSubmit)}
                loading={isSubmitting}
              >
                Simpan
              </StyledLoadingButton>
            </Stack>
          </FormProvider>
        </Card>
      </Container>
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
