import { Fragment, useEffect, useState } from 'react';

// @mui
import {
  Card,
  Divider,
  Grid,
  Container,
  Stack,
  Typography,
  Chip,
  Box,
  Button,
} from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import AlertDeleteVendor from '../../components/modal/DeleteVendor';
// sections
import { FormProvider, RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import { useFieldArray, useForm } from 'react-hook-form';
import { StyledButton } from 'src/theme/custom/Button';
import { Add, ArrowBackOutlined, Close, Info } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

JurnalCreate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function JurnalCreate() {
  const { themeStretch } = useSettings();

  const theme = useTheme();

  const router = useRouter();

  const [alertDelete, setAlertDelete] = useState(null);

  const methods = useForm({
    defaultValues: { unit: null, year: null, accounts: [{ name: null, debt: 0, credit: 0 }] },
  });

  const { handleSubmit, control, watch, setValue } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'accounts',
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  const accounts = watch('accounts');

  const handleAppend = () => append({ name: null, debt: null, credit: null });
  const handleRemove = (i) => {
    remove(i);
    generateTotalDebt();
    generateTotalCred();
  };

  const handleBack = () => router.push('/jurnal/list');

  const generateTotalDebt = () => {
    setValue(
      'debt',
      accounts.reduce((accumulator, currentValue) => accumulator + Number(currentValue.debt), 0)
    );
  };

  const generateTotalCred = () => {
    setValue(
      'credit',
      accounts.reduce((accumulator, currentValue) => accumulator + Number(currentValue.credit), 0)
    );
  };

  console.log(accounts);

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <StyledButton variant="contained" startIcon={<ArrowBackOutlined />} onClick={handleBack}>
            Kembali
          </StyledButton>
          <Card elevation={0} sx={{ mt: 3, border: `1px solid ${theme.palette.grey[300]}` }}>
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <RHFTextField size="small" label="Keterangan Transaksi" require name="remark" />
                </Grid>
                <Grid item xs={4}>
                  <RHFTextField
                    size="small"
                    type="date"
                    label="Pilih Tanggal"
                    require
                    name="date"
                  />
                </Grid>
                <Grid item xs={4}>
                  <RHFTextField
                    size="small"
                    label="Nomor Bukti (Dibuat Otomatis)"
                    disabled
                    name="no_evidenve"
                  />
                </Grid>
              </Grid>
              <Divider sx={{ my: 3 }} />
              <Grid container spacing={3}>
                {accounts.map((row, i) => (
                  <Fragment key={row.i}>
                    <Grid item xs={4}>
                      <RHFAutocomplete
                        require
                        size="small"
                        name={`accounts.${i}.name`}
                        label={i === 0 ? 'Nama Akun' : ''}
                        loading={false}
                        options={[].map((option) => option) ?? []}
                        getOptionLabel={(option) => option.text}
                        renderOption={(props, option) => (
                          <li {...props} key={option.value}>
                            {option.text}
                          </li>
                        )}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <RHFTextField
                        size="small"
                        label={i === 0 ? 'Debit' : ''}
                        require
                        name={`accounts.${i}.debt`}
                        onKeyUp={generateTotalDebt}
                        type="number"
                      />
                    </Grid>
                    <Grid item xs={fields.length > 2 ? 3 : 4}>
                      <RHFTextField
                        size="small"
                        label={i === 0 ? 'Kredit' : ''}
                        require
                        name={`accounts.${i}.credit`}
                        onKeyUp={generateTotalCred}
                        type="number"
                      />
                    </Grid>
                    {fields.length > 2 && (
                      <Grid item xs={1} alignItems="flex-end" display="flex">
                        <Button
                          fullWidth
                          variant="contained"
                          color="error"
                          onClick={() => handleRemove(row.id)}
                        >
                          <Close />
                        </Button>
                      </Grid>
                    )}
                  </Fragment>
                ))}
                <Grid item xs={4}>
                  <StyledButton
                    variant="outlined"
                    startIcon={<Add fontSize="small" />}
                    onClick={handleAppend}
                  >
                    Tambah Akun
                  </StyledButton>
                </Grid>
              </Grid>
              <Divider sx={{ my: 3 }} />
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="subtitle2" fontSize={12}>
                    Indikator Keseimbangan:
                  </Typography>
                  <Chip label="Netral" />
                </Stack>

                <Stack direction="row" alignItems="center" spacing={3}>
                  <Typography variant="h6">Total</Typography>
                  <RHFTextField require name="debt" variant="standard" sx={{ width: 300 }} />
                  <RHFTextField require name="credit" variant="standard" sx={{ width: 300 }} />
                </Stack>
              </Stack>
            </Box>
            <Divider />
            <Stack sx={{ p: 3 }} direction="row" justifyContent="space-between">
              <Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{ color: theme.palette.primary.main }}
                >
                  <Info fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="subtitle2">Information</Typography>
                </Stack>
                <Typography fontSize={10} sx={{ color: theme.palette.grey[600] }}>
                  Pastikan jurnal penginputan pada Debit dan Kredit Balance sebelum Anda klik simpan
                </Typography>
              </Stack>
              <StyledButton
                variant="contained"
                sx={{ width: 200 }}
                disabled={watch('credit') !== watch('debt')}
              >
                Simpan
              </StyledButton>
            </Stack>
          </Card>
          <AlertDeleteVendor open={!!alertDelete} onClose={() => setAlertDelete(null)} />
        </FormProvider>
      </Container>
    </Page>
  );
}
