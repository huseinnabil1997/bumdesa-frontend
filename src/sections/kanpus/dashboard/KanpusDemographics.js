import merge from 'lodash/merge';
import { useEffect, useState } from 'react';
// @mui
import { Card, CardHeader, Box, CardContent, Button } from '@mui/material';
// components
import ReactApexChart, { BaseOptionChart } from '../../../components/chart';
import { useTheme } from '@emotion/react';
import { fCurrency } from 'src/utils/formatNumber';
import IndonesianMap from 'src/components/map/IndonesianMap';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

export default function KanpusDemographics() {
  const theme = useTheme();

  const router = useRouter();

  const [chartData, setChartData] = useState([]);

  const data = [122, 344, 224, 255, 143, 304];
  const data2 = [224, 255, 143, 304, 122, 344];

  const chartOptions = merge(BaseOptionChart(), {
    legend: { show: false },
    xaxis: {
      categories: [
        'Jawa Barat',
        'Jakarta',
        'Jawa Timur',
        'Jawa Tengah',
        'Yogyakarta',
        'Sulawesi Selatan',
      ],
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: '12px',
        colors: ['#fff'],
      },
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['#fff'],
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: 75,
        borderRadius: 4,
        dataLabels: {
          position: 'top',
        },
      },
    },
    tooltip: {
      x: { show: true },
      y: {
        formatter: (val) => `${fCurrency(val)}`,
        title: { formatter: () => `Total: ` },
      },
    },
  });

  useEffect(() => {
    setChartData([
      {
        name: 'Data 1',
        data: data,
        color: theme.palette.primary.main,
      },
      {
        name: 'Data 2',
        data: data2,
        color: theme.palette.warning.main,
      },
    ]);
  }, []);

  return (
    <Card elevation={0} sx={{ border: `1px solid ${theme.palette.grey[300]}` }}>
      <CardHeader sx={{ p: 3, pb: 0 }} title="Demografi BUMDesa Berdasarkan Provinsi" />

      <CardContent sx={{ py: 5 }}>
        <IndonesianMap />
        {chartOptions && (
          <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
            <ReactApexChart type="bar" series={chartData} options={chartOptions} height={360} />
          </Box>
        )}
        <Button
          variant="outlined"
          size="large"
          fullWidth
          sx={{ mt: 3 }}
          onClick={() => router.push('/kanpus/list')}
        >
          Lihat Selengkapnya
        </Button>
      </CardContent>
    </Card>
  );
}
