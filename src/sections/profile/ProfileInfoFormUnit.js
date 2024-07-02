import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import {
  FormProvider,
  RHFAutocomplete,
  RHFTextField,
  RHFUploadPhoto,
} from 'src/components/hook-form';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { handleDrop } from 'src/utils/helperFunction';
import { isEqual } from 'lodash';
import { useSnackbar } from 'notistack';
import Iconify from 'src/components/Iconify';
import { useGetSectors } from 'src/query/hooks/units/useGetSectors';
import usePatch from 'src/query/hooks/mutation/usePatch';
import { useTheme } from '@mui/material/styles';
import RHFDatePicker from 'src/components/hook-form/RHFDatePicker';
import { alphabetRegex, htmlTagRegex, numberRegex } from 'src/utils/regex';

const styles = {
  content: {
    minHeight: 483,
    p: '24px',
  },
  textfield: {
    // width: '293px',
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
      '& fieldset': {
        border: 'none',
      },
    },
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
      borderColor: '#1078CA',
    },
  },
  snackbar: {
    width: '344px',
    height: '42px',
    backgroundColor: '#E1F8EB',
    gap: '8px',
    padding: '12px',
    borderRadius: '4px',
  },
  snackbarIcon: {
    width: '16px',
    height: '16px',
    color: '#27AE60',
  },
};

export default function ProfileInfoFormUnit({ data, setIsEdit }) {
  const theme = useTheme();

  const { enqueueSnackbar } = useSnackbar();

  const { data: sectorData, isLoading: isLoadingSectors } = useGetSectors();

  const mutation = usePatch();

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
      .matches(alphabetRegex, 'Nama Manager Unit Usaha harus mengandung huruf dan hanya boleh mengandung angka, spasi, serta simbol petik')
      .test('no-html', 'Nama Manager Unit Usaha tidak boleh mengandung tag HTML', value => !htmlTagRegex.test(value)),
    position: Yup.string().required('Jabatan wajib diisi'),
    manager_phone: Yup.string()
      .required('Nomor telepon wajib diisi')
      .matches(/^\d+$/, 'Nomor telepon hanya boleh berisi angka')
      .matches(numberRegex, 'Nomor telepon harus diawali dengan 08 dan minimal 10 digit')
      .min(10, 'Nomor telepon minimal diisi 10 digit')
      .max(13, 'Nomor telepon maksimal diisi 13 digit'),
  });

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
    resolver: yupResolver(NewUnitFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    setValue,
    handleSubmit,
    isSubmitting,
    watch,
    // reset,
  } = methods;

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
    kode_pos: watch('kode_pos'),
  };

  const areValuesEqual = () => isEqual(currentValues, defaultValues);

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
        await enqueueSnackbar('', {
          variant: 'success',
          content: () => (
            <Box display="flex" alignItems="center" sx={styles.snackbar}>
              <Iconify icon={'eva:checkmark-circle-2-fill'} sx={styles.snackbarIcon} />
              <Typography fontSize="12px">Informasi Baru Unit Usaha sudah diperbarui!</Typography>
            </Box>
          ),
        });
        setIsEdit();
      }
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: 'error' });
      console.log('error Edit Units', error);
    }
  };

  useEffect(() => {
    methods.reset(defaultValues);
  }, [data]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} sx={styles.content}>
        <Grid item xs={11}>
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
        </Grid>
        <Grid item xs={1}>
          {data?.status === 1 && (
            <Chip label="Aktif" sx={{ backgroundColor: '#2ECC71', color: 'white' }} />
          )}
          {data?.status === 0 && (
            <Chip label="Belum Aktif" sx={{ backgroundColor: '#EB5858', color: 'white' }} />
          )}
          {data?.status === 3 && (
            <Chip
              label="Nonaktif"
              sx={{ backgroundColor: theme.palette.warning.main, color: 'white' }}
            />
          )}
        </Grid>
        <Grid item xs={4}>
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
              },
            }}
            require
          />
        </Grid>
        <Grid item xs={4}>
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
              },
            }}
            require
          />
        </Grid>
        <Grid item xs={4}>
          <RHFAutocomplete
            name="sector"
            label="Sektor Usaha"
            placeholder="Pilih Sektor Usaha"
            size="small"
            loading={isLoadingSectors}
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
              },
            }}
            require
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
            label="Nama Manager Unit Usaha"
            placeholder="Contoh: Budi Jailani"
            sx={{
              width: '293px',
              '& .MuiInputBase-root': {
                height: '44px',
              },
              '& .MuiInputBase-input': {
                height: '11px',
              },
            }}
            require
          />
        </Grid>
        <Grid item xs={4}>
          <RHFTextField
            name="position"
            label="Jabatan"
            inputProps={{
              style: { color: '#00549B' },
              readOnly: true,
            }}
            sx={{
              backgroundColor: '#CCE8FF',
              borderRadius: '8px',
              width: '293px',
              '& .MuiInputBase-root': {
                height: '44px',
              },
              '& fieldset': {
                border: 'none',
              },
            }}
            require
          />
        </Grid>
        <Grid item xs={4}>
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
              },
            }}
            require
          />
        </Grid>
      </Grid>
      <Stack sx={styles.action}>
        <Stack direction="row" spacing={2}>
          <StyledLoadingButton onClick={setIsEdit} loading={isSubmitting} variant="outlined">
            Batalkan
          </StyledLoadingButton>
          <StyledLoadingButton
            loading={isSubmitting}
            disabled={areValuesEqual()}
            onClick={handleSubmit(onSubmit)}
            sx={styles.action.button}
            variant="contained"
          >
            Simpan
          </StyledLoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
}

ProfileInfoFormUnit.propTypes = {
  data: PropTypes.object,
  setIsEdit: PropTypes.func,
};
