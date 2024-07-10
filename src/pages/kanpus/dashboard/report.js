// @mui
import { Container, Grid } from '@mui/material';
// hooks
import useSettings from 'src/hooks/useSettings';
import Page from 'src/components/Page';
import Layout from 'src/layouts';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { FormProvider } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import ReportHeader from 'src/sections/dashboard/ReportHeader';

// ----------------------------------------------------------------------

Dashboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function Dashboard() {
  const { themeStretch } = useSettings();

  const methods = useForm({
    defaultValues: { unit: null, year: null },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          links={[
            {
              name: 'Pilih Jenis Laporan',
              href: '/dashboard',
            },
            { name: 'Laporan Laba Rugi' },
          ]}
        />
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ReportHeader />
            </Grid>
          </Grid>
        </FormProvider>
      </Container>
    </Page>
  );
}
