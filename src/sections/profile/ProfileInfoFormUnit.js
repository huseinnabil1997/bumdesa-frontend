import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Stack, Typography } from '@mui/material';
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
import { useEffect, useMemo } from 'react';
import { handleDrop } from 'src/utils/helperFunction';
import { isEqual } from 'lodash';
import { useSnackbar } from 'notistack';
import Iconify from 'src/components/Iconify';
import { useGetSectors } from 'src/query/hooks/units/useGetSectors';
import usePatch from 'src/query/hooks/mutation/usePatch';
import { alphabetRegex, htmlTagRegex, numberRegex } from 'src/utils/regex';
import Label from 'src/components/Label';
import { yearFoundedOptions } from '../unit/constant';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const styles = {
  content: {
    minHeight: 483,
    p: '24px',
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

export default function ProfileInfoFormUnit({ data, setIsEdit, foundedAt }) {
  const { enqueueSnackbar } = useSnackbar();
  const { data: sectorData, isLoading: isLoadingSectors } = useGetSectors();
  const mutation = usePatch();

  const NewUnitFormSchema = useMemo(() => Yup.object().shape({
    image: Yup.mixed().required('Foto Unit Usaha wajib diisi'),
    name: Yup.string()
      .required('Nama Unit Usaha wajib diisi')
      .matches(alphabetRegex, 'Nama Unit Usaha harus mengandung huruf dan hanya boleh mengandung angka, spasi, serta simbol petik')
      .test('no-html', 'Nama Unit Usaha tidak boleh mengandung tag HTML', value => !htmlTagRegex.test(value)),
    email: Yup.string()
      .email('Format email tidak valid')
      .required('Alamat Email Aktif Unit Usaha wajib diisi'),
    year_founded: Yup.object().nullable().required('Tahun Berdiri wajib dipilih'),
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
  }), []);

  const defaultValues = useMemo(() => ({
    id: data?.id ?? '',
    image: data?.photo ?? null,
    name: data?.name ?? '',
    position: 'Manager',
    email: data?.email ?? '',
    year_founded: { value: data?.year_founded?.toString(), label: data?.year_founded?.toString() } ?? null,
    sector: { value: data?.id_sector, label: data?.sector } ?? null,
    manager_name: data?.organization?.name ?? '',
    manager_phone: data?.organization?.phone ?? '',
  }), [data]);

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
  } = methods;

  const currentValues = watch();

  const areValuesEqual = useMemo(() => isEqual(currentValues, defaultValues), [currentValues, defaultValues]);

  const onSubmit = async (formData) => {
    const payload = new FormData();
    payload.append('image', formData?.image);
    payload.append('name', formData?.name);
    payload.append('email', formData?.email);
    payload.append('year_founded', formData?.year_founded?.value);
    payload.append('sector', formData?.sector?.label);
    payload.append('id_sector', parseInt(formData?.sector?.value));
    payload.append('manager_name', formData?.manager_name);
    payload.append('manager_phone', formData?.manager_phone);

    const headers = {
      'Content-Type': 'multipart/form-data',
    };

    try {
      await mutation.mutateAsync({
        endpoint: `/business-units/${formData.id}`,
        payload,
        headers,
      });
      if (formData?.email === defaultValues.email) {
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
    }
  };

  useEffect(() => {
    methods.reset(defaultValues);
  }, [data, defaultValues, methods]);

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
        <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Label
            color={data?.status === 1 ? 'success' : data?.status === 0 ? 'error' : 'warning'}
            sx={{ textTransform: 'capitalize' }}
          >
            {data?.status === 1 ? 'Aktif' : data?.status === 0 ? 'Belum Aktif' : 'Nonaktif'}
          </Label>
        </Grid>
        <Grid item xs={4}>
          <RHFTextField
            name="name"
            label="Nama Unit Usaha"
            placeholder="Contoh: Toko Ikan Mas Pak Budi"
            sx={styles.textfield}
            require
          />
        </Grid>
        <Grid item xs={4}>
          <RHFAutocomplete
            name="year_founded"
            label="Tahun Berdiri"
            placeholder="Pilih Tahun"
            size="small"
            loading={isLoadingSectors}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            options={yearFoundedOptions(foundedAt)}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <li {...props} key={option.value}>
                {option.label}
              </li>
            )}
            sx={styles.textfield}
            endAdornment={<CalendarTodayIcon color="#777777" sx={{ mr: 1, fontSize: '16px' }} />}
            require
          />
          {/* <RHFDatePicker
            name="year_founded"
            label="Tahun Berdiri"
            placeholder="Pilih Tahun"
            format="yyyy"
            minDate={moment(foundedAt).format('yyyy-MM-DD')}
            views={['year']}
            openTo="year"
            sx={styles.textfield}
            require
          /> */}
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
            sx={styles.textfield}
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
            sx={styles.textfield}
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
            sx={styles.textfield.id}
            require
          />
        </Grid>
        <Grid item xs={4}>
          <RHFTextField
            name="manager_phone"
            label="Nomor Telepon"
            placeholder="Contoh: 081xxx"
            sx={styles.textfield}
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
            disabled={areValuesEqual}
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
