// @mui
import { Container, Grid } from '@mui/material';
// hooks
import {
  DashboardBestSalesman,
  DashboardWelcome,
  DashboardNewProducts,
  DashboardUnit,
  DashboardEducation,
  DashboardSales,
  DashboardFinances,
  DashboardProfitLoss,
} from 'src/sections/dashboard';
import useSettings from 'src/hooks/useSettings';
import Page from 'src/components/Page';
import Layout from 'src/layouts';
import { getSessionToken } from 'src/utils/axiosReportService';
import jwtDecode from 'jwt-decode';

// ----------------------------------------------------------------------

Dashboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function Dashboard() {
  const { themeStretch } = useSettings();

  const token = getSessionToken();
  let decoded = {};
  if (token) {
    decoded = jwtDecode(token);
  } else {
    console.error('Token not available');
  }

  console.log(decoded.sub.businessid);

  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DashboardWelcome />
          </Grid>

          <Grid item xs={12}>
            <DashboardFinances unit={decoded.sub.businessid} />
          </Grid>

          <Grid item xs={12}>
            <DashboardSales unit={decoded.sub.businessid} />
          </Grid>

          <Grid item xs={12}>
            <DashboardProfitLoss unit={decoded.sub.businessid} />
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
