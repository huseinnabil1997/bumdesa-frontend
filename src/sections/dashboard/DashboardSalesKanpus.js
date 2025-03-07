import merge from 'lodash/merge';
import { useEffect, useState } from 'react';
// @mui
import { Card, CardHeader, Box, TextField } from '@mui/material';
// components
import ReactApexChart, { BaseOptionChart } from '../../components/chart';
import { useTheme } from '@emotion/react';
import { useGetSales } from 'src/query/hooks/dashboard/useGetSales';
import { DatePicker } from '@mui/lab';
import moment from 'moment';
import { fCurrencyJuta } from 'src/utils/formatNumber';

// ----------------------------------------------------------------------

export default function DashboardSalesKanpus({ id, unit = false }) {
  const theme = useTheme();

  const [seriesData, setSeriesData] = useState(new Date());
  const [chartData, setChartData] = useState([]);
  // const [chartOptions, setChartOptions] = useState(null);

  const { data, isLoading } = useGetSales({
    date: moment(seriesData).format('yyyy'),
    ...(unit ? { unit: id } : { bumdesa_id: id }),
  });

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
    yaxis: {
      labels: {
        formatter: (val) => fCurrencyJuta(val),
      },
    },
    tooltip: {
      x: { show: true },
      y: {
        formatter: (val) => `${fCurrencyJuta(val)}`,
        title: { formatter: () => `Total: ` },
      },
    },
  });

  useEffect(() => {
    if (data)
      setChartData([
        {
          name: 'Amount',
          data: data.amount,
          color: theme.palette.primary.main,
        },
      ]);
  }, [data]);

  return (
    <Card elevation={0} sx={{ border: `1px solid ${theme.palette.grey[300]}`, minHeight: 500 }}>
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

      {!isLoading && chartOptions && (
        <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
          <ReactApexChart type="bar" series={chartData} options={chartOptions} height={360} />
        </Box>
      )}
    </Card>
  );
}
