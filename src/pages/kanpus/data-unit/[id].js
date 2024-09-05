// @mui
import {
  Breadcrumbs,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Link,
  Typography,
} from '@mui/material';
// hooks
import {
  DashboardSales,
  DashboardProfitLoss,
  DashboardFinancesBumdesKanpus,
  DashboardUnitManagerList,
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
// import { useSelector } from 'react-redux';
import { ProfileInfoUnitKanpus } from 'src/sections/profile';
import { useTheme } from '@emotion/react';
import { useGetUnitById } from 'src/query/hooks/data-unit/useGetUnitById';

// ----------------------------------------------------------------------

// DetailBumdesa.getLayout = function getLayout(page) {
//   return (
//     <Layout title={`Ringkasan ${typeof window !== 'undefined' ? localStorage?.getItem('bumdesaName') : ''}`}>
//       {page}
//     </Layout>
//   );
// };

DetailBumdesa.getLayout = function getLayout(page) {
  return <Layout title="Detail BUMDesa">{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function DetailBumdesa() {
  const theme = useTheme();
  // const userData = useSelector(state => state.user.userData);
  const { themeStretch } = useSettings();
  const router = useRouter();
  const token = getSessionToken();
  const [decoded, setDecoded] = useState(jwtDecode(token));
  const { id } = router.query;

  const { data } = useGetUnitById(id);

  console.log('husein', data, decoded);

  // useEffect(() => {
  //   if (data?.name && typeof window !== 'undefined') {
  //     localStorage.setItem('bumdesaName', data.name);
  //   }
  // }, [data]);

  useEffect(() => {
    if (token) setDecoded(jwtDecode(token));
    else setDecoded(null);
  }, [token]);

  return (
    <Page title="Detail Unit Usaha">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <StyledButton
              variant="contained"
              onClick={() => router.back()}
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
                onClick={() => router.push('kanpus/data-bumdesa/list')}
                sx={{ cursor: 'pointer' }}
              >
                Semua Unit Usaha
              </Link>
              <Typography color="text.primary">{data?.name ?? '-'}</Typography>
            </Breadcrumbs>
          </Grid>

          <Grid item xs={12}>
            <DashboardFinancesBumdesKanpus unit={id} />
          </Grid>

          <Grid item xs={12}>
            <DashboardSales unit={id} />
          </Grid>

          <Grid item xs={12}>
            <DashboardProfitLoss unit={id} />
          </Grid>

          <Grid item xs={12}>
            <Card elevation={0} sx={{ border: `1px solid ${theme.palette.grey[300]}` }}>
              <CardHeader title="Informasi Unit Usaha" sx={{ p: 3, pb: 0 }} />
              <CardContent>
                <ProfileInfoUnitKanpus data={data} from="kanpus" />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <DashboardUnitManagerList />
          </Grid>

          {/* <Grid item xs={12}>
            <DashboardEducation />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
