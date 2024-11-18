import { useEffect, useMemo, useState } from 'react';
// @mui
import {
  Card,
  CardHeader,
  Stack,
  Typography,
  Grid,
  CardContent,
  Skeleton,
  Box,
} from '@mui/material';
// components
import { useTheme } from '@emotion/react';
import moment from 'moment';
import { fNumber } from 'src/utils/formatNumber';
import { useGetStatistics } from 'src/query/hooks/dashboard/useGetStatistics';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFCustomDateRangePicker } from 'src/components/hook-form';

// --------

export default function DashboardFinances() {
  const theme = useTheme();

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

  const { data: stat, isLoading } = useGetStatistics({
    start_date: startDate,
    end_date: endDate,
  });

  // const { data, isLoading } = useGetFinances({
  //   date: moment(seriesData).format('yyyy'),
  //   unit,
  // });

  const contents = useMemo(
    () => [
      { title: 'User BUMDesa Registrasi', value: stat?.total_bumdesa_active },
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

  return (
    <Card elevation={0} sx={{ border: `1px solid ${theme.palette.grey[300]}` }}>
      <CardHeader
        sx={{ p: 3, pb: 0 }}
        title="Statistik User BUM Desa"
        action={
          <Box display="flex" alignItems="center">
            <FormProvider methods={methods}>
              <RHFCustomDateRangePicker name="date" size="small" sx={{ width: 200 }} />
            </FormProvider>
          </Box>
        }
      />

      <CardContent>
        {!isLoading && stat && (
          <Grid container spacing={3}>
            {contents.map((row, i) => (
              <Grid item xs={6} md={4} lg={3} key={i}>
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
