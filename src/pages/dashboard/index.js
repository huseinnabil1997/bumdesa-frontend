// @mui
import { Container, Grid } from '@mui/material';
// hooks
import {
  DashboardBestSalesman,
  DashboardYearlySales,
  DashboardWelcome,
  DashboardNewProducts,
  DashboardUnit,
  DashboardEducation,
} from 'src/sections/dashboard';
import useSettings from 'src/hooks/useSettings';
import Page from 'src/components/Page';
import Layout from 'src/layouts';

// ----------------------------------------------------------------------

Dashboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function Dashboard() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DashboardWelcome />
          </Grid>

          <Grid item xs={12}>
            <DashboardYearlySales />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <DashboardBestSalesman />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <DashboardNewProducts />
          </Grid>

          <Grid item xs={12}>
            <DashboardUnit />
          </Grid>

          <Grid item xs={12}>
            <DashboardEducation />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
