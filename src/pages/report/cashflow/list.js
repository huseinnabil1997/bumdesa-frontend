import { useState, useMemo } from 'react';

// @mui
import { Card, Table, TableBody, Container, TableContainer } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import { TableHeadCustom, TableSkeleton } from '../../../components/table';
import AlertDeleteVendor from '../../../components/modal/DeleteVendor';
// sections
import { UserTableRow } from '../../../sections/report/cashflow';
import { FormProvider } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';
import { useGetCashFlow } from 'src/query/hooks/report/cashflow/useGetCashFlow';
import { ArusKasHeader } from 'src/sections/report/cashflow';

// ----------------------------------------------------------------------

LaporanArusKas.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function LaporanArusKas() {

  const { themeStretch } = useSettings();
  const theme = useTheme();

  const [alertDelete, setAlertDelete] = useState(null);
  const [submitValue, setSubmitValue] = useState({});

  const { data, isLoading } = useGetCashFlow(submitValue);

  const methods = useForm({
    defaultValues: { unit: null, start_date: null, end_date: null },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    setSubmitValue(data);
  };

  const convertToMonthYear = useMemo(() => (start_date, end_date) => {
    let startDateText = '...';
    let endDateText = '...';
    const monthNames = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
      'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    if (start_date) {
      const [year, month, day] = start_date.split('-');
      const monthIndex = parseInt(month, 10) - 1;
      const monthName = monthNames[monthIndex];
      const dayNumber = parseInt(day, 10);

      startDateText = `${dayNumber} ${monthName} ${year}`;
    }
    if (end_date) {
      const [year, month, day] = end_date.split('-');
      const monthIndex = parseInt(month, 10) - 1;
      const monthName = monthNames[monthIndex];
      const dayNumber = parseInt(day, 10);

      endDateText = `${dayNumber} ${monthName} ${year}`;
    }
    return `${startDateText == 'NaN undefined NaN' ? '...' : startDateText} - ${endDateText == 'NaN undefined NaN' ? '...' : endDateText}`;
  }, []);

  return (
    <Page title="Laporan: Arus Kas">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <ArusKasHeader onSubmit={onSubmit} loading={isLoading} />
        </FormProvider>
        <Card sx={{ mt: 3 }} elevation={3}>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              <Table>
                <TableHeadCustom
                  headLabel={[
                    { id: 'nama_akun', label: 'Nama Akun', align: 'left', width: 480 },
                    { id: 'saldo', label: convertToMonthYear(submitValue?.start_date, submitValue?.end_date), align: 'left', width: 480 },
                  ]}
                  rowCount={data?.length}
                  sx={{ background: theme.palette.grey[200], height: '56px' }}
                />

                <TableBody>
                  {!isLoading &&
                    data?.map((row, i) => (
                      <UserTableRow
                        key={row.id}
                        index={i}
                        row={row}
                      />
                    ))}

                  {isLoading && <TableSkeleton />}
                  {/* <TableNoData
                    isNotFound={!isLoading && data === undefined}
                    title="Laporan Arus Kas belum tersedia."
                    description="Silakan pilih unit usaha dan tanggal laporan"
                  /> */}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
        <AlertDeleteVendor open={!!alertDelete} onClose={() => setAlertDelete(null)} />
      </Container>
    </Page>
  );
}
