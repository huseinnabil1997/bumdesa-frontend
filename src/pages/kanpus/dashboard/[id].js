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
// import { getSessionToken } from 'src/utils/axiosReportService';
// import jwtDecode from 'jwt-decode';
// import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

Dashboard.getLayout = function getLayout(page) {
  return <Layout title="Summary">{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function Dashboard() {
  const userData = useSelector((state) => state.user.userData);
  const { themeStretch } = useSettings();
  // const token = getSessionToken();
  // const [decoded, setDecoded] = useState(jwtDecode(token));

  // useEffect(() => {
  //   if (token) setDecoded(jwtDecode(token));
  //   else setDecoded(null);
  // }, [token]);

  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DashboardWelcome isUnit={userData?.unit_id} />
          </Grid>

          <Grid item xs={12}>
            <DashboardFinances unit={userData?.unit_id} />
          </Grid>

          <Grid item xs={12}>
            <DashboardSales unit={userData?.unit_id} />
          </Grid>

          <Grid item xs={12}>
            <DashboardProfitLoss unit={userData?.unit_id} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
