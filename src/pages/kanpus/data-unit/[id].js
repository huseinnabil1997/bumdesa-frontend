// @mui
import {
  Box,
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
  DashboardUnitManagerList,
  DashboardProfitLossKanpus,
  DashboardSalesKanpus,
} from 'src/sections/dashboard';
import useSettings from 'src/hooks/useSettings';
import Page from 'src/components/Page';
import Layout from 'src/layouts';
import { StyledButton } from 'src/theme/custom/Button';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ProfileInfoUnitKanpus } from 'src/sections/profile';
import { useTheme } from '@emotion/react';
import { useGetUnitById } from 'src/query/hooks/data-unit/useGetUnitById';
import Label from 'src/components/Label';

// ----------------------------------------------------------------------

DetailUnit.getLayout = function getLayout(page) {
  return <Layout title="Detail Unit Usaha">{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function DetailUnit() {
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const router = useRouter();
  const { id } = router.query;

  const { data } = useGetUnitById(id);

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
                onClick={() => router.push('list')}
                sx={{ cursor: 'pointer' }}
              >
                Semua Unit Usaha
              </Link>
              <Typography color="text.primary">{data?.name ?? '-'}</Typography>
            </Breadcrumbs>
          </Grid>

          <Grid item xs={6}>
            <DashboardSalesKanpus unit={true} id={id} />
          </Grid>

          <Grid item xs={6}>
            <DashboardProfitLossKanpus unit={true} id={id} />
          </Grid>

          <Grid item xs={12}>
            <DashboardFinancesBumdesKanpus unit={true} id={id} />
          </Grid>

          <Grid item xs={12}>
            <Card elevation={0} sx={{ border: `1px solid ${theme.palette.grey[300]}` }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CardHeader title="Informasi Unit Usaha" sx={{ p: 3, pb: 0 }} />
                <Label
                  color={data?.status === 1 ? 'success' : data?.status === 0 ? 'error' : 'warning'}
                  sx={{ textTransform: 'capitalize', mr: 3, mt: 3 }}
                >
                  {data?.status === 1 ? 'Aktif' : data?.status === 0 ? 'Belum Aktif' : 'Nonaktif'}
                </Label>
              </Box>
              <CardContent>
                <ProfileInfoUnitKanpus data={data} from="kanpus" />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <DashboardUnitManagerList unit={id} id={data?.bumdesa_id} />
          </Grid>

          {/* <Grid item xs={12}>
            <DashboardEducation />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
