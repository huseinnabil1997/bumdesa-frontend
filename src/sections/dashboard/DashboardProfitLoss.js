import merge from 'lodash/merge';
import { useEffect, useState } from 'react';
// @mui
import { Card, CardHeader, Box, Skeleton } from '@mui/material';
// components
import ReactApexChart, { BaseOptionChart } from '../../components/chart';
import { useTheme } from '@emotion/react';
import moment from 'moment';
import { useGetProfileLoss } from 'src/query/hooks/dashboard/useGetProfitLoss';
import { fCurrency } from 'src/utils/formatNumber';
import { FormProvider, RHFCustomDateRangePicker } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';

// ----------------------------------------------------------------------

export default function DashboardProfitLoss({ unit }) {
  const theme = useTheme();

  const [chartData, setChartData] = useState([]);

  const defaultValues = {
    date: [
      moment().subtract(2, 'years').format('yyyy'),
      moment().format('yyyy'),
    ],
  };

  const methods = useForm({
    defaultValues,
  });

  const { watch } = methods;

  const [startDate, setStartDate] = useState(watch('date[0]'));
  const [endDate, setEndDate] = useState(watch('date[1]'));

  useEffect(() => {
    const subscription = watch((value) => {
      setStartDate(value.date[0]);
      setEndDate(value.date[1]);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const { data, isLoading } = useGetProfileLoss({
    start_date: startDate,
    end_date: endDate,
    unit,
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
            <FormProvider methods={methods}>
              <RHFCustomDateRangePicker name="date" size="small" sx={{ width: 200 }} />
            </FormProvider>
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
