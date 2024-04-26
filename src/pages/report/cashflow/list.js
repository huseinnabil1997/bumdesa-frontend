import { useState } from 'react';

// @mui
import { Card, Table, TableBody, Container, TableContainer } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import { TableHeadCustom, TableNoData, TableSkeleton } from '../../../components/table';
import AlertDeleteVendor from '../../../components/modal/DeleteVendor';
// sections
import { UserTableRow } from '../../../sections/report/balance';
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

  const { data, isLoading, refetch } = useGetCashFlow(submitValue);

  const methods = useForm({
    defaultValues: { unit: null, date: null },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    setSubmitValue(data);
    await refetch()
  };

  function convertToMonthYear(dateString) {
    if (dateString) {
      const [year, month] = dateString.split('-');
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
      ];

      const monthIndex = parseInt(month, 10) - 1;
      const monthName = monthNames[monthIndex];

      return `${monthName} ${year}`;
    }
    return 'Saldo';
  }

  return (
    <Page title="Laporan: Arus Kas">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <ArusKasHeader onSubmit={onSubmit} />
        </FormProvider>
        <Card sx={{ mt: 3 }} elevation={3}>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              <Table>
                <TableHeadCustom
                  headLabel={[
                    { id: 'nama_akun', label: 'Nama Akun', align: 'left', width: 480 },
                    { id: 'saldo', label: convertToMonthYear(submitValue?.date), align: 'left', width: 480 },
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
                  <TableNoData
                    isNotFound={!isLoading && data === undefined}
                    title="Laporan Arus Kas belum tersedia."
                    description="Silakan pilih unit usaha dan tanggal laporan"
                  />
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
