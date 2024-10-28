import { useMemo, useState } from 'react';
// @mui
import {
  Card,
  CardHeader,
  TextField,
  Stack,
  Typography,
  Grid,
  CardContent,
  Skeleton,
  Box,
} from '@mui/material';
// components
import { useTheme } from '@emotion/react';
import { DatePicker } from '@mui/lab';
import moment from 'moment';
import { useGetFinances } from 'src/query/hooks/dashboard/useGetFinances';
import { fNumber } from 'src/utils/formatNumber';
import { useGetStatistics } from 'src/query/hooks/dashboard/useGetStatistics';

// --------

export default function DashboardFinances({ unit }) {
  const theme = useTheme();

  const { data: stat } = useGetStatistics();

  const [seriesData, setSeriesData] = useState(new Date());

  const contents = useMemo(
    () => [
      { title: 'User BUMDesa Registrasi', value: stat?.total_user_regis },
      { title: 'Unit Usaha Registrasi', value: stat?.total_unit_active },
      { title: 'Jumlah BUMDes Mengisi Laporan Keuangan', value: stat?.total_report },
      { title: 'Jumlah Unit Mengisi Laporan Keuangan', value: stat?.total_report_unit },
      // { title: 'Total BUMDesa', value: stat?.total_bumdesa },
      // { title: 'User Login', value: stat?.total_user_regis },
      // { title: 'BUMDesa Aktif', value: stat?.total_bumdesa_active },
      // { title: 'Unit Usaha Aktif', value: stat?.total_unit_active },
      // { title: 'Laporan Keuangan', value: stat?.total_report },
    ],
    [stat]
  );

  const { data, isLoading } = useGetFinances({
    date: moment(seriesData).format('yyyy'),
    unit,
  });

  console.log('DashboardFinances useGetStatistics', stat);

  return (
    <Card elevation={0} sx={{ border: `1px solid ${theme.palette.grey[300]}` }}>
      <CardHeader
        sx={{ p: 3, pb: 0 }}
        title="Statistik User BUM Desa"
        action={
          <DatePicker
            views={['year']}
            label="Tahun"
            value={seriesData}
            onChange={(newValue) => {
              setSeriesData(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} sx={{ width: 160 }} margin="normal" size="small" />
            )}
          />
        }
      />

      <CardContent>
        {!isLoading && data && (
          <Grid container spacing={3}>
            {contents.map((row, i) => (
              <Grid item xs={4} md={3} key={i}>
                <Stack sx={{ p: 3, backgroundColor: '#DDEFFC', borderRadius: 1.5, minHeight: 120, justifyContent: 'space-between' }}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle2" fontWeight={400}>
                      {row.title}
                    </Typography>
                  </Box>
                  <Typography variant="h5" fontWeight="bold">
                    {fNumber(row.value)}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        )}

        {isLoading && (
          <Box display="flex">
            <Skeleton height={200} width="100%" sx={{ mr: 1 }} />
            <Skeleton height={200} width="100%" sx={{ mx: 1 }} />
            <Skeleton height={200} width="100%" sx={{ ml: 1 }} />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
