import { Box, Button, Card, Container, Divider, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useCallback } from 'react';
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
import InfoIcon from '@mui/icons-material/Info';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import { useSnackbar } from 'notistack';
import Iconify from 'src/components/Iconify';
import { useGetUnitById } from 'src/query/hooks/units/useGetUnitById';
import { useGetSectors } from 'src/query/hooks/units/useGetSectors';
import { alphabetRegex, htmlTagRegex, numberRegex } from 'src/utils/regex';
import { useSelector } from 'react-redux';
import { useGetProfile } from 'src/query/hooks/profile/useGetProfile';
import { useUpdateUnit } from 'src/query/hooks/units/useUpdateUnit';
import { yearFoundedOptions } from 'src/sections/unit/constant';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

EditUnitUsaha.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default function EditUnitUsaha() {
  const userData = useSelector(state => state.user.userData);
  const { data: dataBumdesa } = useGetProfile(userData?.bumdesa_id);
  const founded_at = dataBumdesa?.founded_at?.split('T')[0];
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { data: sectorData, isLoading: isLoadingSectors } = useGetSectors();
  const { data, isLoading } = useGetUnitById(router.query.id);
  const { mutate: onUpdate, isLoading: updating } = useUpdateUnit();

  const NewUnitFormSchema = Yup.object().shape({
    image: Yup.mixed().required('Foto Unit Usaha wajib diisi'),
    name: Yup.string()
      .required('Nama Unit Usaha wajib diisi')
      .matches(alphabetRegex, 'Nama Unit Usaha harus mengandung huruf dan hanya boleh mengandung angka, spasi, serta simbol petik')
      .test('no-html', 'Nama Unit Usaha tidak boleh mengandung tag HTML', value => !htmlTagRegex.test(value)),
    email: Yup.string()
      .email('Format email tidak valid')
      .required('Alamat Email Aktif Unit Usaha wajib diisi'),
    year_founded: Yup.object().nullable().required('Tahun Berdiri wajib diisi'),
    sector: Yup.object().nullable().required('Sektor Usaha wajib dipilih'),
    manager_name: Yup.string()
      .required('Nama Manager Unit Usaha wajib diisi')
      .matches(alphabetRegex, 'Nama Manager Unit Usaha harus mengandung huruf dan hanya boleh mengandung angka, spasi, serta simbol petik')
      .test('no-html', 'Nama Manager Unit Usaha tidak boleh mengandung tag HTML', value => !htmlTagRegex.test(value)),
    position: Yup.string()
      .required('Jabatan wajib diisi')
      .test('no-html', 'Jabatan tidak boleh mengandung tag HTML', value => !htmlTagRegex.test(value)),
    manager_phone: Yup.string()
      .required('Nomor telepon wajib diisi')
      .matches(/^\d+$/, 'Nomor telepon hanya boleh berisi angka')
      .matches(numberRegex, 'Nomor telepon harus diawali dengan 08 dan minimal 10 digit')
      .min(10, 'Nomor telepon minimal diisi 10 digit')
      .max(13, 'Nomor telepon maksimal diisi 13 digit'),
  });

  const defaultValues = useMemo(() => ({
    id: router.query.id ?? '',
    image: data?.photo ?? null,
    name: data?.name ?? '',
    position: 'Manager',
    email: data?.email ?? '',
    year_founded: { value: data?.year_founded, label: data?.year_founded?.toString() } ?? null,
    sector: { value: data?.id_sector, label: data?.sector } ?? null,
    manager_name: data?.organization?.name ?? '',
    manager_phone: data?.organization?.phone ?? '',
  }), [data, router.query.id]);

  const methods = useForm({
    resolver: yupResolver(NewUnitFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    setValue,
    handleSubmit,
    isSubmitting,
  } = methods;

  const onSubmit = useCallback(async (data) => {
    const formData = new FormData();
    formData.append('image', data?.image);
    formData.append('name', data?.name);
    formData.append('email', data?.email);
    formData.append('year_founded', data?.year_founded?.value.toString());
    formData.append('sector', data?.sector?.label);
    formData.append('id_sector', parseInt(data?.sector?.value));
    formData.append('manager_name', data?.manager_name);
    formData.append('manager_phone', data?.manager_phone);

    onUpdate(
      { id: data.id, payload: formData },
      {
        onSuccess: () => {
          if (data?.email === defaultValues.email) {
            enqueueSnackbar(
              '',
              {
                variant: 'success',
                content: () => (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ minWidth: 100, height: 55, backgroundColor: '#E1F8EB', p: '8px', borderRadius: '4px' }}
                  >
                    <SnackbarIcon icon={'eva:checkmark-circle-2-fill'} color="success" />
                    <Typography mr="12px" fontSize="12px">Data Anda telah berhasil diperbarui.</Typography>
                  </Box>
                )
              }
            );
            router.push('list');
          } else {
            enqueueSnackbar(
              '',
              {
                variant: 'success',
                content: () => (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ minWidth: 100, minHeight: 55, backgroundColor: '#E1F8EB', px: '10px', py: '15px', borderRadius: '4px' }}
                  >
                    <SnackbarIcon icon={'eva:checkmark-circle-2-fill'} color="success" />
                    <Box
                      display="flex"
                      flexDirection="column"
                    >
                      <Typography fontSize="12px">
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
        },
        onError: (err) => {
          enqueueSnackbar(err?.message, { variant: 'error' });
        },
      }
    );
  }, [defaultValues.email, enqueueSnackbar, router]);

  useEffect(() => {
    if (data) {
      methods.reset(defaultValues);
    }
  }, [data, defaultValues, methods]);

  return (
    <Page title="Unit Usaha: Edit">
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
          <StyledLoadingButton
            variant="contained"
            sx={{ width: '106px', height: '48px' }}
            onClick={handleSubmit(onSubmit)}
            loading={isSubmitting || updating}
          >
            Simpan
          </StyledLoadingButton>
        </Stack>

        <Box
          sx={{
            backgroundColor: '#DDEFFC',
            border: 'solid 1px #56ADF2',
            height: '66px',
            borderRadius: '4px',
            p: '12px',
            my: 2,
          }}
        >
          <Stack spacing={0.5}>
            <Stack direction="row" display="flex" alignItems="center" spacing={0.5}>
              <Box width={20} direction="row" display="flex" alignItems="center">
                <InfoIcon fontSize="13.33px" sx={{ color: '#1078CA' }} />
              </Box>
              <Typography fontWeight={700} color="#3D3D3D" fontSize="14px">
                Informasi
              </Typography>
            </Stack>
            <Stack direction="row" display="flex" alignItems="center" spacing={0.5}>
              <Box width={20} direction="row" display="flex" alignItems="center" />
              <Typography variant="caption" fontSize="12px" fontWeight={500} color="#525252">
                Pastikan
                <span style={{ fontSize: '12px', fontWeight: 700 }}>
                  {' '}
                  semua data
                  {' '}
                </span>
                yang dimasukkan sudah
                <span style={{ fontSize: '12px', fontWeight: 700 }}>
                  {' '}
                  benar.
                </span>
              </Typography>
            </Stack>
          </Stack>
        </Box>

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
              <Typography sx={{ fontSize: '18px', fontWeight: 600, lineHeight: '28px' }}>
                Informasi Unit Usaha
              </Typography>
              <RHFUploadPhoto
                name="image"
                label="Foto Unit Usaha"
                accept="image/png, image/jpg, image/jpeg"
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

              <Stack direction="row" useFlexGap flexWrap="wrap">
                <RHFTextField
                  name="name"
                  label="Nama Unit Usaha"
                  placeholder="Contoh: Toko Ikan Mas Pak Budi"
                  fullWidth
                  sx={{
                    width: '293px',
                    mr: 2,
                    mb: 2,
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
                    mr: 2,
                    mb: 2,
                    '& .MuiInputBase-root': {
                      height: '44px',
                    },
                    '& .MuiInputBase-input': {
                      height: '11px',
                    }
                  }}
                  require
                />
                <RHFAutocomplete
                  name="year_founded"
                  label="Tahun Berdiri"
                  placeholder="Pilih Tahun"
                  size="small"
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  options={yearFoundedOptions(founded_at)?.map((option) => option) ?? []}
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <li {...props} key={option.value}>
                      {option.label}
                    </li>
                  )}
                  sx={{
                    width: '293px',
                    mr: 2,
                    mb: 2,
                    '& .MuiInputBase-root': {
                      height: '44px',
                    },
                    '& .MuiInputBase-input': {
                      height: '11px',
                    }
                  }}
                  endAdornment={<CalendarTodayIcon color="#777777" sx={{ mr: 1, fontSize: '16px' }} />}
                  require
                />
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
                    mr: 2,
                    mb: 2,
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
              <Stack direction="row" useFlexGap flexWrap="wrap">
                <RHFTextField
                  name="manager_name"
                  label="Nama Manager Unit Usaha"
                  placeholder="Contoh: Budi Jailani"
                  sx={{
                    width: '293px',
                    mr: 2,
                    mb: 2,
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
                    mr: 2,
                    mb: 2,
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
                    mr: 2,
                    mb: 2,
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
      }}
    >
      <Iconify icon={icon} width={24} height={24} />
    </Box>
  );
}