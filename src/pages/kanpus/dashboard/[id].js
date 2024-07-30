// @mui
import { Container, Grid } from '@mui/material';
// hooks
import {
  DashboardWelcome,
  DashboardSales,
  DashboardFinances,
  DashboardProfitLoss,
} from 'src/sections/kanpus/dashboard';
import useSettings from 'src/hooks/useSettings';
import Page from 'src/components/Page';
import Layout from 'src/layouts';
import { getSessionToken } from 'src/utils/axiosReportService';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

Dashboard.getLayout = function getLayout(page) {
  return <Layout title="Summary">{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function Dashboard() {
  const { themeStretch } = useSettings();
  const token = getSessionToken();
  const [decoded, setDecoded] = useState(jwtDecode(token));

  useEffect(() => {
    if (token) setDecoded(jwtDecode(token));
    else setDecoded(null);
  }, [token]);

  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DashboardWelcome isUnit={decoded.sub.businessid} />
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
        </Grid>
      </Container>
    </Page>
  );
}
