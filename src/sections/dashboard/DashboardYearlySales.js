import merge from 'lodash/merge';
import { useState } from 'react';
// @mui
import { Card, CardHeader, Box, TextField, styled, Stack, Typography, Button } from '@mui/material';
// components
import ReactApexChart, { BaseOptionChart } from '../../components/chart';
import Iconify from 'src/components/Iconify';
import { useTheme } from '@emotion/react';
import { ArrowForwardIos } from '@mui/icons-material';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const Legend = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  borderRadius: 8,
}));

export default function DashboardYearlySales() {
  const theme = useTheme();

  const router = useRouter();

  const CHART_DATA = [
    {
      year: 2019,
      data: [
        {
          name: 'Total Income',
          data: [10, 41, 35, 151, 49, 62, 69, 91, 48, 41, 32, 34],
          color: theme.palette.primary.main,
        },
        {
          name: 'Total Expenses',
          data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 32, 34, 100],
          color: theme.palette.warning.main,
        },
      ],
    },
  ];

  const [seriesData, setSeriesData] = useState(2019);

  const handleChangeSeriesData = (event) => {
    setSeriesData(Number(event.target.value));
  };

  const chartOptions = merge(BaseOptionChart(), {
    legend: { show: false },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Okt',
        'Nov',
        'Des',
      ],
    },
  });

  const handleClick = () => {
    router.push('/dashboard/report');
  };

  return (
    <Card elevation={0} sx={{ border: `1px solid ${theme.palette.grey[300]}` }}>
      <CardHeader
        sx={{ p: 3, pb: 0 }}
        title="Laba Rugi"
        action={
          <TextField
            select
            fullWidth
            variant="outlined"
            size="small"
            value={seriesData}
            SelectProps={{ native: true }}
            onChange={handleChangeSeriesData}
          >
            {CHART_DATA.map((option) => (
              <option key={option.year} value={option.year}>
                {`Tahun ${option.year}`}
              </option>
            ))}
          </TextField>
        }
      />

      {CHART_DATA.map((item) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && (
            <ReactApexChart type="area" series={item.data} options={chartOptions} height={360} />
          )}
        </Box>
      ))}
      <Legend direction="row" justifyContent="space-between" sx={{ m: 3, p: 2, px: 3 }}>
        <Stack direction="row" alignItems="center">
          <Stack direction="row" alignItems="center">
            <Iconify
              icon="ph:record-fill"
              width={14}
              height={14}
              sx={{ color: theme.palette.primary.main, mr: 1 }}
            />
            <Typography variant="caption">Laba Bersih</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" sx={{ ml: 3 }}>
            <Iconify
              icon="ph:record-fill"
              width={14}
              height={14}
              sx={{ color: theme.palette.warning.main, mr: 1 }}
            />
            <Typography variant="caption">Laba Rugi</Typography>
          </Stack>
        </Stack>
        <StyledLoadingButton
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIos />}
          onClick={handleClick}
        >
          Lihat Laporan Laba Rugi
        </StyledLoadingButton>
      </Legend>
    </Card>
  );
}
