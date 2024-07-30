import { useState } from 'react';
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

// ----------------------------------------------------------------------

const CONTENTS = [
  { title: 'Total BUMDesa', value: 1234 },
  { title: 'User Login', value: 2534 },
  { title: 'BUMDesa Aktif', value: 82345 },
  { title: 'Unit Usaha Aktif', value: 52933 },
  { title: 'Laporan Keuangan', value: 92347 },
];

export default function DashboardFinances({ unit }) {
  const theme = useTheme();

  const [seriesData, setSeriesData] = useState(new Date());

  const { data, isLoading } = useGetFinances({
    date: moment(seriesData).format('yyyy'),
    unit,
  });

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
            {CONTENTS.map((row, i) => (
              <Grid item xs={4} md={2.4} key={i}>
                <Stack sx={{ p: 3, backgroundColor: '#DDEFFC', borderRadius: 1.5 }}>
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
