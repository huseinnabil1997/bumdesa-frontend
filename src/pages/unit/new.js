import { Button, Card, Container, Divider, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import Layout from 'src/layouts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { FormProvider, RHFAutocomplete, RHFSelect, RHFTextField, RHFUploadPhoto } from 'src/components/hook-form';
import { fData } from 'src/utils/formatNumber';
import { handleDrop } from 'src/utils/helperFunction';
import RHFDatePicker from 'src/components/hook-form/RHFDatePicker';
import InfoIcon from '@mui/icons-material/Info';
import { StyledLoadingButton } from 'src/theme/custom/Button';
// import axiosInstance from 'src/utils/axiosCoreService';

AddUnitUsaha.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

const SERVICE_OPTIONS = [{ text: 'Jakarta', value: 1 }];

export default function AddUnitUsaha() {
  const { themeStretch } = useSettings();
  const router = useRouter();

  const defaultValues = {
    image: null,
    name: '',
    position: 'Manager',
    email: '',
    year: '',
    sector: null,
    manager_name: '',
    phone: '',
  }

  const NewUnitFormSchema = Yup.object().shape({
    image: Yup.mixed().required('Foto Unit Usaha wajib diisi'),
    name: Yup.string().required('Nama BUM Desa wajib diisi'),
    email: Yup.string().email('Format email tidak valid').required('Alamat Email Aktif Unit Usaha wajib diisi'),
    year: Yup.string().required('Tahun Berdiri wajib diisi'),
    sector: Yup.object().nullable().required('Sektor Usaha wajib dipilih'),
    manager_name: Yup.string().required('Nama Manager BUM Desa wajib diisi'),
    position: Yup.string().required('Jabatan wajib diisi'),
    phone: Yup.string()
      .required('Nomor telepon wajib diisi')
      // .matches(numberRegex, 'Nomor telepon harus diawali dengan 62 dan minimal 10 digit')
      .min(10, 'Nomor telepon minimal diisi 10 digit')
      .max(15, 'Nomor telepon maksimal diisi 15 digit'),
  });

  const methods = useForm({
    resolver: yupResolver(NewUnitFormSchema),
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const {
    reset,
    setValue,
    setError,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    console.log('simpan', data)
    // const postData = {
    //   key1: 'value1',
    //   key2: 'value2'
    // };

    // axiosInstance.post('/post-endpoint', postData)
    //   .then(response => {
    //     console.log('Response:', response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //   });
  };

  return (
    <Page title="Unit Usaha: New">
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
                label="Foto Unit Usaha*"
                accept="image/*"
                maxSize={5000000}
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
                      height: '44px'
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
                    '& .MuiInputBase-root': {
                      height: '44px'
                    }
                  }}
                  require
                />
                <RHFDatePicker
                  name="year"
                  label="Tahun Berdiri"
                  placeholder="Pilih Tahun"
                  format='yyyy'
                  views={['year']}
                  openTo="year"
                  sx={{
                    width: '293px',
                    '& .MuiInputBase-root': {
                      height: '44px',
                      borderRadius: '8px'
                    },
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
                  loading={false}
                  options={SERVICE_OPTIONS?.map((option) => option) ?? []}
                  getOptionLabel={(option) => option.text}
                  renderOption={(props, option) => (
                    <li {...props} key={option.value}>
                      {option.text}
                    </li>
                  )}
                  sx={{
                    width: '293px',
                    '& .MuiInputBase-root': {
                      height: '44px',
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
                      height: '44px'
                    }
                  }}
                  require
                />
                <RHFTextField
                  name="position"
                  label="Jabatan"
                  placeholder="Contoh: budi@gmail.com"
                  inputProps={{
                    style: { color: "#00549B" },
                  }}
                  sx={{
                    backgroundColor: '#CCE8FF',
                    width: '293px',
                    '& .MuiInputBase-root': {
                      height: '44px',
                    },
                  }}
                  require
                />
                <RHFTextField
                  name="phone"
                  label="Nomor Telepon"
                  placeholder="Contoh: 081xxx"
                  sx={{
                    width: '293px',
                    '& .MuiInputBase-root': {
                      height: '44px'
                    }
                  }}
                  require
                />
              </Stack>
            </Stack>
            <Divider />
            <Stack direction="row" p="16px 24px 16px 24px" width="100%" display="flex" justifyContent="space-between" alignItems="center" >
              <Stack spacing={0.5}>
                <Stack direction="row" display="flex" alignItems="center" spacing={0.5} >
                  <InfoIcon fontSize='13.33px' sx={{ color: '#1078CA' }} />
                  <Typography fontWeight={600} color="#1078CA" fontSize="14px">Informasi</Typography>
                </Stack>
                <Typography variant="caption" fontSize="12px" fontWeight={500} color="#929393">
                  Username dan password akan dikirimkan melalui email unit usaha.
                  <span style={{ fontSize: '12px', fontWeight: 700 }}> Pastikan email yang dimasukkan benar dan aktif.</span>
                </Typography>
              </Stack>
              <StyledLoadingButton
                variant="contained"
                sx={{ width: '160px', height: '48px' }}
                onClick={handleSubmit(onSubmit)}
              >Simpan
              </StyledLoadingButton>
            </Stack>
          </FormProvider>
        </Card>
      </Container>
    </Page>
  )
} 