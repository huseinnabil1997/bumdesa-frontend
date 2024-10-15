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
  DashboardFinancesBumdesKanpus,
  DashboardBumdesaManagerList,
  DashboardUnitList,
  DashboardSalesKanpus,
  DashboardProfitLossKanpus,
} from 'src/sections/dashboard';
import useSettings from 'src/hooks/useSettings';
import Page from 'src/components/Page';
import Layout from 'src/layouts';
import { StyledButton } from 'src/theme/custom/Button';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useGetProfile } from 'src/query/hooks/profile/useGetProfile';
import { ProfileInfo } from 'src/sections/profile';
import { useTheme } from '@emotion/react';

// ----------------------------------------------------------------------

DetailBumdesa.getLayout = function getLayout(page) {
  return <Layout title="Detail BUMDesa">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function DetailBumdesa() {
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const router = useRouter();
  const { id } = router.query;

  const { data } = useGetProfile(id);

  return (
    <Page title="Detail BUM Desa">
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
                onClick={() => router.push('list')}
                sx={{ cursor: 'pointer' }}
              >
                Semua BUM Desa
              </Link>
              <Typography color="text.primary">{data?.name ?? '-'}</Typography>
            </Breadcrumbs>
          </Grid>

          <Grid item xs={6}>
            <DashboardSalesKanpus id={id} />
          </Grid>

          <Grid item xs={6}>
            <DashboardProfitLossKanpus id={id} />
          </Grid>

          <Grid item xs={12}>
            <DashboardFinancesBumdesKanpus id={id} />
          </Grid>

          <Grid item xs={12}>
            <Card elevation={0} sx={{ border: `1px solid ${theme.palette.grey[300]}` }}>
              <CardHeader title="Informasi BUMDesa" sx={{ p: 3, pb: 0 }} />
              <CardContent>
                <ProfileInfo data={data} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <DashboardBumdesaManagerList id={id} />
          </Grid>

          <Grid item xs={12}>
            <DashboardUnitList id={id} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
