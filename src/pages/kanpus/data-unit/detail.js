// @mui
import { Breadcrumbs, Container, Grid, Link, Typography } from '@mui/material';
// hooks
import {
  DashboardWelcome,
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
import { useEffect, useState } from 'react';
import { StyledButton } from 'src/theme/custom/Button';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useGetProfile } from 'src/query/hooks/profile/useGetProfile';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

DetailBumdesa.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function DetailBumdesa() {
  const userData = useSelector(state => state.user.userData);
  const { themeStretch } = useSettings();
  const router = useRouter();
  const token = getSessionToken();
  const [decoded, setDecoded] = useState(jwtDecode(token));
  const { id } = router.query;
  
  const { data } = useGetProfile(userData?.bumdesa_id);

  console.log('id:', id);

  useEffect(() => {
    if (token) setDecoded(jwtDecode(token));
    else setDecoded(null);
  }, [token]);

  return (
    <Page title="Detail BUMDesa">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <StyledButton
              variant="contained"
              onClick={() => router.push('/data-bumdesa/list')}
              startIcon={<ArrowBackIcon />}
              sx={{
                '&:hover': { backgroundColor: '#1976D2', color: 'white' },
                backgroundColor: '#DDEFFC',
                color: '#1976D2',
                height: 48,
                width: 124,
              }}
            >
              Kembali
            </StyledButton>
            <Breadcrumbs 
            ml={2} 
            aria-label="breadcrumb"
            separator={<NavigateNextIcon fontSize="small" />}
            >
              <Link
                underline="hover"
                color="inherit"
                onClick={() => router.push('/data-bumdesa/list')}
                sx={{ cursor: 'pointer' }}
              >
                Semua BUMDesa
              </Link>
              <Typography color="text.primary">BUMDesa {data?.name ?? '-'}</Typography>
            </Breadcrumbs>
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

          {decoded?.sub?.businessid && (
            <Grid item xs={12}>
              <DashboardUnit />
            </Grid>
          )}

          {/* <Grid item xs={12}>
            <DashboardEducation />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
