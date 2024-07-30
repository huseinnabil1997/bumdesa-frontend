// @mui
import { Container, Grid } from '@mui/material';
// hooks
import { KanpusHeader, KanpusDemographic } from 'src/sections/kanpus/dashboard';
import useSettings from 'src/hooks/useSettings';
import Page from 'src/components/Page';
import Layout from 'src/layouts';
import { getSessionToken } from 'src/utils/axiosReportService';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

Dashboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
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
    <Page title="Dashboard Kantor Pusat">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <KanpusHeader unit={decoded.sub.businessid} />
          </Grid>

          <Grid item xs={12}>
            <KanpusDemographic unit={decoded.sub.businessid} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
