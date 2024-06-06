import { useState } from 'react';
// @mui
import { Card, CardHeader, TextField, Stack, Typography, Grid, CardContent } from '@mui/material';
// components
import { useTheme } from '@emotion/react';
import { DatePicker } from '@mui/lab';
import moment from 'moment';
import { useGetFinances } from 'src/query/hooks/dashboard/useGetFinances';

// ----------------------------------------------------------------------

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
        title="Penjualan"
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
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Stack sx={{ p: 3, backgroundColor: '#DDEFFC', borderRadius: 1.5 }}>
              <Typography variant="caption" sx={{ color: '#999' }}>
                Profitabilitas
              </Typography>
              <Typography variant="subtitle2" sx={{ my: 0.5 }}>
                Return On Asset
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                64,33%
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4}>
            <Stack sx={{ p: 3, backgroundColor: '#FEEDDF', borderRadius: 1.5 }}>
              <Typography variant="caption" sx={{ color: '#999' }}>
                Liquiditas
              </Typography>
              <Typography variant="subtitle2" sx={{ my: 0.5 }}>
                Current Ratio
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                64,33%
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4}>
            <Stack sx={{ p: 3, backgroundColor: '#E1F8EB', borderRadius: 1.5 }}>
              <Typography variant="caption" sx={{ color: '#999' }}>
                Solvabilitas
              </Typography>
              <Typography variant="subtitle2" sx={{ my: 0.5 }}>
                Debt To Asset
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                64,33%
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
