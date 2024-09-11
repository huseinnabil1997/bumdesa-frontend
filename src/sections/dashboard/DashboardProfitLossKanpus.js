import merge from 'lodash/merge';
import { useEffect, useState } from 'react';
// @mui
import { Card, CardHeader, Box, TextField, Typography, Skeleton } from '@mui/material';
// components
import ReactApexChart, { BaseOptionChart } from '../../components/chart';
import { useTheme } from '@emotion/react';
import { DatePicker } from '@mui/lab';
import moment from 'moment';
import { useGetProfileLoss } from 'src/query/hooks/dashboard/useGetProfitLoss';
import { fCurrency } from 'src/utils/formatNumber';

// ----------------------------------------------------------------------

const currentDate = new Date();

export default function DashboardProfitLossKanpus({ id, unit = false }) {
  const theme = useTheme();

  const [chartData, setChartData] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date(currentDate.setFullYear(currentDate.getFullYear() - 2))
  );
  const [endDate, setEndDate] = useState(new Date());

  const { data, isLoading } = useGetProfileLoss({
    start_date: moment(startDate).format('yyyy'),
    end_date: moment(endDate).format('yyyy'),
    ...(unit ? { unit: id } : { bumdesa_id: id }),
  });

  const chartOptions = merge(BaseOptionChart(), {
    legend: { show: false },
    xaxis: {
      categories: data?.key ?? [],
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
    if (data)
      setChartData([
        {
          name: 'Amount',
          data: data.amount,
          color: theme.palette.warning.main,
        },
      ]);
  }, [data]);

  return (
    <Card elevation={0} sx={{ border: `1px solid ${theme.palette.grey[300]}` }}>
      <CardHeader
        sx={{ p: 3, pb: 0 }}
        title="Laba (Rugi) Bersih"
        action={
          <Box display="flex" alignItems="center">
            <DatePicker
              views={['year']}
              label="Tahun Awal"
              maxDate={endDate}
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} sx={{ width: 160 }} margin="normal" size="small" />
              )}
            />
            <Typography sx={{ mx: 1 }}>s/d</Typography>
            <DatePicker
              views={['year']}
              label="Tahun Akhir"
              minDate={startDate}
              value={endDate}
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} sx={{ width: 160 }} margin="normal" size="small" />
              )}
            />
          </Box>
        }
      />

      {!isLoading && chartOptions && (
        <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
          <ReactApexChart type="bar" series={chartData} options={chartOptions} height={360} />
        </Box>
      )}

      {isLoading && <Skeleton height={500} />}
    </Card>
  );
}
