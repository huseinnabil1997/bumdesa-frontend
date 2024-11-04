// @mui
import { Card, Grid, Container, Box, Divider, Stack, Typography } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
// sections
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { BtnLightPrimary, StyledLoadingButton } from 'src/theme/custom/Button';
import { ArrowBackOutlined, InfoOutlined } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useCreateSupervisor } from 'src/query/hooks/supervisor/useCreateSupervisor';
import { supervisorSchema } from 'src/sections/supervisor/validation';
import { useUpdateSupervisor } from 'src/query/hooks/supervisor/useUpdateSupervisor';
import { useGetSupervisor } from 'src/query/hooks/supervisor/useGetSupervisor';
import { useEffect, useMemo } from 'react';

// ----------------------------------------------------------------------

SupervisorCreate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function SupervisorCreate() {
  const { themeStretch } = useSettings();
  const theme = useTheme();

  const { push, query, back } = useRouter();
  const { id } = query;

  const { enqueueSnackbar } = useSnackbar();

  const { data, isLoading } = useGetSupervisor(id);

  const { mutate: onCreate, isLoading: creating } = useCreateSupervisor();
  const { mutate: onUpdate, isLoading: updating } = useUpdateSupervisor();

  const defaultValues = useMemo(
    () => ({
      title: data?.title || '',
      name: data?.name || '',
      email: data?.email || '',
    }),
    [data]
  );

  const methods = useForm({
    resolver: yupResolver(supervisorSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [id, data]);

  const onSubmit = async (value) => {
    const _id = id === 'create' ? null : id;

    const action = _id ? onUpdate : onCreate;

    action(
      { ...value, id: _id },
      {
        onSuccess: (res) => {
          enqueueSnackbar(res.message);
          push('/management/supervisor/list');
        },
        onError: (err) => {
          enqueueSnackbar(err.message, { variant: 'error' });
        },
      }
    );
  };

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <BtnLightPrimary
            variant="contained"
            startIcon={<ArrowBackOutlined />}
            onClick={() => back()}
          >
            Kembali
          </BtnLightPrimary>

          <Card elevation={0} sx={{ mt: 3, border: `1px solid ${theme.palette.grey[300]}` }}>
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <RHFTextField
                    disabled={isLoading}
                    size="small"
                    label="Nama Pengawas"
                    require
                    name="name"
                  />
                </Grid>
                <Grid item xs={4}>
                  <RHFTextField
                    disabled={isLoading}
                    size="small"
                    label="Jabatan"
                    require
                    name="title"
                  />
                </Grid>
                <Grid item xs={4}>
                  <RHFTextField
                    disabled={isLoading}
                    size="small"
                    label="Email"
                    require
                    name="email"
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider />

            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ m: 3 }}
            >
              <Box sx={{ width: '600px' }}>
                <Box display="flex" alignItems="center">
                  <InfoOutlined color="primary" fontSize="small" sx={{ mr: 1 }} />
                  <Typography fontSize={14}>Informasi</Typography>
                </Box>
                <Typography variant="caption">
                  Username dan password akan dikirimkan melalui email unit usaha.{' '}
                  <b>Pastikan email yang dimasukkan benar dan aktif</b>.
                </Typography>
              </Box>
              <StyledLoadingButton
                loading={creating || updating}
                variant="contained"
                sx={{ width: 200, height: 42 }}
                type="submit"
                className="btn-save"
              >
                Simpan
              </StyledLoadingButton>
            </Stack>
          </Card>
        </FormProvider>
      </Container>
    </Page>
  );
}
