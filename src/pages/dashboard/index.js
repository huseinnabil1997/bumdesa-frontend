// @mui
import { Container, Grid } from '@mui/material';
// hooks
import {
  DashboardWelcome,
  DashboardUnit,
  // DashboardEducation,
  DashboardSales,
  DashboardFinances,
  DashboardProfitLoss,
  DashboardBumdesaManagerList,
} from 'src/sections/dashboard';
import useSettings from 'src/hooks/useSettings';
import Page from 'src/components/Page';
import Layout from 'src/layouts';
// import { getSessionToken } from 'src/utils/axiosReportService';
// import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import LinkUMKMDialogDashboard from 'src/sections/link-umkm/dialogDashboard';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

Dashboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function Dashboard() {
  const userData = useSelector((state) => state.user.userData);
  const { themeStretch } = useSettings();
  // const token = getSessionToken();
  // const [decoded, setDecoded] = useState(jwtDecode(token));
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   if (token) setDecoded(jwtDecode(token));
  //   else setDecoded(null);
  //   setOpen(true);
  // }, [token]);

  useEffect(() => {
    if (userData?.role === 2 && userData?.linkumkm_integrated === 0) {
      const hasShownDialog = sessionStorage.getItem('hasShownDialog');
      if (!hasShownDialog) {
        setOpen(true);
        sessionStorage.setItem('hasShownDialog', 'true');
      }
    }
  }, []);

  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DashboardWelcome isUnit={userData?.unit_id} isPengawas={userData?.role === 4} />
          </Grid>

          {userData?.role === 4 && (
            <Grid item xs={12}>
              <DashboardBumdesaManagerList id={userData?.bumdesa_id} />
            </Grid>
          )}

          {userData?.role !== 4 && (
            <>
              <Grid item xs={6}>
                <DashboardSales unit={userData?.unit_id} />
              </Grid>

              <Grid item xs={6}>
                <DashboardProfitLoss unit={userData?.unit_id} />
              </Grid>

              <Grid item xs={12}>
                <DashboardFinances unit={userData?.unit_id} />
              </Grid>

              {!userData?.unit_id && (
                <Grid item xs={12}>
                  <DashboardUnit />
                </Grid>
              )}
            </>
          )}

          {/* <Grid item xs={12}>
            <DashboardEducation />
          </Grid> */}
        </Grid>
      </Container>
      <LinkUMKMDialogDashboard open={open} onClose={onClose} />
    </Page>
  );
}
