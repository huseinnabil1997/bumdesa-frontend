import merge from 'lodash/merge';
import { useEffect, useState } from 'react';
// @mui
import { Card, CardHeader, Box, CardContent, Button } from '@mui/material';
// components
import ReactApexChart, { BaseOptionChart } from '../../../components/chart';
import { useTheme } from '@emotion/react';
// import { fCurrency } from 'src/utils/formatNumber';
import IndonesianMap from 'src/components/map/IndonesianMap';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

export default function KanpusDemographics({ demo }) {
  const theme = useTheme();

  const router = useRouter();

  const [chartData, setChartData] = useState([]);

  const chartOptions = merge(BaseOptionChart(), {
    legend: { show: false },
    xaxis: {
      categories: demo
        ?.sort((a, b) => b.total_bumdesa - a.total_bumdesa) // Sort the array in descending order by score
        ?.slice(0, 5)
        ?.map((row) => row.province),
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
        formatter: (val) => `${val}`,
        title: { formatter: () => `Total: ` },
      },
    },
  });

  useEffect(() => {
    if (demo?.length > 0)
      setChartData([
        {
          name: 'BUM Desa',
          data: demo
            .sort((a, b) => b.total_bumdesa - a.total_bumdesa) // Sort the array in descending order by score
            .slice(0, 5)
            .map((row) => row.total_bumdesa),
          color: theme.palette.primary.main,
        },
        // {
        //   name: 'Kemendes',
        //   data: demo
        //     .sort((a, b) => b.total_bumdesa - a.total_bumdesa) // Sort the array in descending order by score
        //     .slice(0, 6)
        //     .map((row, i) => row.total_kemendes + 1 + i * 2),
        //   color: theme.palette.warning.main,
        // },
      ]);
  }, [demo]);

  return (
    <Card elevation={0} sx={{ border: `1px solid ${theme.palette.grey[300]}` }}>
      <CardHeader sx={{ p: 3, pb: 0 }} title="Demografi BUMDesa Berdasarkan Provinsi" />

      <CardContent sx={{ py: 5 }}>
        {<IndonesianMap data={demo} />}
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
          onClick={() => router.push('/kanpus/summary')}
        >
          Lihat Selengkapnya
        </Button>
      </CardContent>
    </Card>
  );
}
