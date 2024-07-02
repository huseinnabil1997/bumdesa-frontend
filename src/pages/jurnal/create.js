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
  Alert,
  AlertTitle,
} from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import { FormProvider, RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import { useFieldArray, useForm } from 'react-hook-form';
import { BtnLightPrimary, StyledButton, StyledLoadingButton } from 'src/theme/custom/Button';
import { Add, ArrowBackOutlined, Cancel, Close, Info } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useGetAccount } from 'src/query/hooks/options/useGetAccount';
import CreateCashFlow from 'src/sections/jurnal/CreateCashFlow';
import { useGenerateEvidence } from 'src/query/hooks/jurnals/useGenerateEvidence';
import { useCreateJurnal } from 'src/query/hooks/jurnals/useCreatejurnal';
import { jurnalDefaultValues, jurnalSchema } from 'src/sections/jurnal/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { fCurrency } from 'src/utils/formatNumber';
import FirstBalance from 'src/components/modal/FirstBalance';
import RHFDatePicker from 'src/components/hook-form/RHFDatePicker';
import moment from 'moment';

// ----------------------------------------------------------------------

JurnalCreate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function JurnalCreate() {
  const { themeStretch } = useSettings();

  const theme = useTheme();

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState();

  const { data: accOpt, isLoading: loadingAcc } = useGetAccount();
  const { data: evidenceNumber, isLoading: loadingEvidence, isFetched } = useGenerateEvidence();
  const { mutate: onCreate, isLoading: creating } = useCreateJurnal();

  const methods = useForm({
    resolver: yupResolver(jurnalSchema),
    defaultValues: jurnalDefaultValues,
    mode: 'onChange',
  });

  useEffect(() => {
    if (evidenceNumber) {
      setValue('number_of_evidence', evidenceNumber?.number_of_evidence);
      if (!evidenceNumber.first_balance && isFetched) setOpen(true);
    }
  }, [evidenceNumber]);

  const { handleSubmit, control, watch, setValue, trigger } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'accounts',
  });

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      date: moment(data.date).format('yyyy-MM-DD'),
      accounts: data.accounts.map((row) => ({
        account_code: row.account_code.value,
        cash_flow_code: +row?.cash_flow_code?.value ?? null,
        debit: +row.debit,
        credit: +row.credit,
      })),
    };

    onCreate(payload, {
      onSuccess: (res) => {
        enqueueSnackbar(res.message);
        router.push('/jurnal/list');
      },
      onError: (err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      },
    });
  };

  const accounts = watch('accounts');
  const isFirstBalance = watch('is_first_balance');

  const handleAppend = () => {
    trigger();
    append({ account_code: null, debit: 0, credit: 0, cash_flow_code: null });
  };

  const handleBack = () => router.push('/jurnal/list');

  const generateTotalDebt = () => {
    setValue(
      'debit',
      fCurrency(
        accounts.reduce((accumulator, currentValue) => accumulator + Number(currentValue.debit), 0)
      )
    );
  };

  const generateTotalCred = () => {
    setValue(
      'credit',
      fCurrency(
        accounts.reduce((accumulator, currentValue) => accumulator + Number(currentValue.credit), 0)
      )
    );
  };

  useEffect(() => {
    generateTotalDebt();
    generateTotalCred();
  }, [accounts]);

  useEffect(() => {
    if (isFirstBalance) {
      let lastYear = moment().year() - 1;
      let lastDayOfLastYear = moment().year(lastYear).month(11).date(31).format('yyyy-MM-DD');

      setValue('date', lastDayOfLastYear);
    }
  }, [isFirstBalance]);

  const formChecking = (index) => {
    if (watch(`accounts.${index}.debit`) > 0 || watch(`accounts.${index}.credit`) > 0) {
      return false;
    }

    return true;
  };

  const generateBalance = (type) => {
    let color = 'default';
    let label = 'Netral';

    if (watch('debit') === 'Rp 0' && watch('credit') === 'Rp 0')
      return type === 'color' ? color : label;

    if (watch('debit') !== watch('credit')) {
      color = 'error';
      label = 'Tidak Seimbang';
    } else {
      color = 'success';
      label = 'Seimbang';
    }

    return type === 'color' ? color : label;
  };

  const isHasKas = !!watch('accounts').find((row) => row?.account_code?.value.includes('1.1.01'));
  const hasEmptyAccount = !watch('accounts').every((row) => !!row.account_code);

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <BtnLightPrimary
            variant="contained"
            startIcon={<ArrowBackOutlined />}
            onClick={handleBack}
          >
            Kembali
          </BtnLightPrimary>
          {isFirstBalance && (
            <Chip
              variant="contained"
              color="success"
              label="Saldo Awal"
              sx={{ color: 'white', fontWeight: 'bold', float: 'right' }}
            />
          )}
          <Card elevation={0} sx={{ mt: 3, border: `1px solid ${theme.palette.grey[300]}` }}>
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <RHFTextField
                    size="small"
                    label="Keterangan Transaksi"
                    require
                    name="transaction_information"
                    isLoading={loadingEvidence}
                  />
                </Grid>
                <Grid item xs={4}>
                  <RHFDatePicker
                    size="small"
                    label="Pilih Tanggal"
                    require
                    format="dd MMM yyyy"
                    name="date"
                    disableFuture
                    disabled={isFirstBalance}
                    sx={{
                      width: '293px',
                      '& .MuiInputBase-root': {
                        height: '40px',
                        borderRadius: '8px',
                      },
                      '& .MuiInputBase-input': {
                        height: '11px',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <RHFTextField
                    size="small"
                    label="Nomor Bukti (Dibuat Otomatis)"
                    disabled
                    name="number_of_evidence"
                    InputProps={{
                      style: { backgroundColor: '#DDEFFC' },
                    }}
                    sx={{
                      '.MuiOutlinedInput-notchedOutline': {
                        borderColor: '#DDEFFC !important',
                      },
                      input: {
                        '-webkit-text-fill-color': `#1078CA !important`,
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Divider sx={{ my: 3 }} />
              <Grid container spacing={3}>
                {fields.map((row, i) => (
                  <Fragment key={row.id}>
                    <Grid item xs={4}>
                      <RHFAutocomplete
                        require
                        size="small"
                        name={`accounts.${i}.account_code`}
                        label={i === 0 ? 'Nama Akun' : ''}
                        loading={false}
                        options={accOpt?.map((option) => option) ?? []}
                        // getOptionLabel={(option) => option.label}
                        isLoading={loadingAcc}
                        disabled={loadingAcc || !watch('transaction_information')}
                        renderOption={(props, option) => (
                          <li {...props} key={option.value}>
                            {option.label}
                          </li>
                        )}
                      />
                    </Grid>
                    <Grid item xs={isFirstBalance ? 3 : 2}>
                      <RHFTextField
                        size="small"
                        label={i === 0 ? 'Debit' : ''}
                        require
                        name={`accounts.${i}.debit`}
                        onKeyUp={generateTotalDebt}
                        type="currency"
                        disabled={
                          +watch(`accounts.${i}.credit`) > 0 || !watch('transaction_information')
                        }
                      />
                    </Grid>
                    <Grid item xs={isFirstBalance ? 3 : 2}>
                      <RHFTextField
                        size="small"
                        label={i === 0 ? 'Kredit' : ''}
                        require
                        name={`accounts.${i}.credit`}
                        onKeyUp={generateTotalCred}
                        type="currency"
                        disabled={
                          +watch(`accounts.${i}.debit`) > 0 || !watch('transaction_information')
                        }
                      />
                    </Grid>
                    {!isFirstBalance && (
                      <Grid item xs={fields.length > 2 ? 3 : 4}>
                        <CreateCashFlow
                          formChecking={formChecking}
                          i={i}
                          isFirstBalance={isFirstBalance}
                          type={watch(`accounts.${i}.debit`) > 0 ? 'D' : 'C'}
                          account={watch(`accounts.${i}.account_code`)?.value ?? ''}
                          disabled={!isHasKas}
                        />
                      </Grid>
                    )}
                    {fields.length > 2 && (
                      <Grid
                        item
                        xs={1}
                        alignItems={i === 0 ? 'flex-end' : 'flex-start'}
                        display="flex"
                      >
                        <Button
                          fullWidth
                          variant="contained"
                          color="error"
                          onClick={() => remove(i)}
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
                    disabled={hasEmptyAccount || !watch('transaction_information')}
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
                  <Chip
                    variant="contained"
                    color={generateBalance('color')}
                    label={generateBalance('label')}
                    sx={{ color: 'white', fontWeight: 'bold' }}
                  />
                </Stack>

                <Stack direction="row" alignItems="center" spacing={3}>
                  <Typography variant="h6">Total</Typography>
                  <RHFTextField
                    require
                    name="debit"
                    variant="standard"
                    sx={{ width: 240 }}
                    disabled
                  />
                  <RHFTextField
                    require
                    name="credit"
                    variant="standard"
                    sx={{ width: 240 }}
                    disabled
                  />
                </Stack>
              </Stack>
            </Box>
            <Divider />
            <Stack sx={{ p: 3 }} direction="row" justifyContent="space-between" alignItems="center">
              {watch('debit') === watch('credit') && (
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
                    Pastikan jurnal penginputan pada Debit dan Kredit Balance sebelum Anda klik
                    simpan
                  </Typography>
                </Stack>
              )}
              {watch('debit') !== watch('credit') && (
                <Alert
                  variant="outlined"
                  severity="error"
                  sx={{ bgcolor: 'background.paper', pr: 5 }}
                  iconMapping={{
                    error: <Cancel fontSize="inherit" />,
                  }}
                >
                  <AlertTitle sx={{ fontSize: 14, mb: 0.5, fontWeight: 'bold' }}>
                    Debit dan Kredit Anda Ada Selisih!
                  </AlertTitle>
                  <Typography fontSize={10} color={theme.palette.grey[500]}>
                    Silakan periksa kembali transaksi Anda.
                  </Typography>
                </Alert>
              )}
              <StyledLoadingButton
                loading={creating}
                variant="contained"
                sx={{ width: 200, height: 42 }}
                disabled={watch('credit') !== watch('debit') || !watch('transaction_information')}
                type="submit"
              >
                Simpan
              </StyledLoadingButton>
            </Stack>
          </Card>
          <FirstBalance
            open={open}
            onClose={() => setOpen(false)}
            onAccept={() => {
              setValue('is_first_balance', true);
              setOpen(false);
            }}
          />
        </FormProvider>
      </Container>
    </Page>
  );
}
