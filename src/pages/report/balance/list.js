import { useState, useCallback, useMemo } from 'react';

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
import { UserTableRows } from '../../../sections/report/balance';
import { FormProvider } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';
import NeracaHeader from 'src/sections/report/balance/NeracaHeader';
import { useGetBalance } from 'src/query/hooks/report/balance/useGetBalance';
import { end_date } from 'src/utils/helperFunction';

// ----------------------------------------------------------------------

LaporanNeraca.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function LaporanNeraca() {

  const { themeStretch } = useSettings();
  const theme = useTheme();

  const [alertDelete, setAlertDelete] = useState(null);
  const [submitValue, setSubmitValue] = useState(null);

  const { data, isLoading } = useGetBalance(submitValue);

  const methods = useForm({
    defaultValues: { unit: null, start_date: null, end_date: null },
  });

  const { handleSubmit } = methods;

  const onSubmit = useCallback((data) => {
    setSubmitValue(data);
  }, []);

  const convertToMonthYear = useCallback((start_date, end_date) => {
    let endDateText = '...';
    const monthNames = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
      'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    if (end_date) {
      const [year, month, day] = end_date.split('-');
      const monthIndex = parseInt(month, 10) - 1;
      const monthName = monthNames[monthIndex];
      const dayNumber = parseInt(day, 10);

      endDateText = `${dayNumber} ${monthName} ${year}`;
    }
    return `${endDateText == 'NaN undefined NaN' ? '...' : endDateText}`;
  }, []);

  const getIndicatorBalance = useMemo(() => {
    const totalAset = data?.find(item => item.title === "ASET").child?.find(childItem => childItem.nama === "Total ASET").saldo;

    const totalKewajibanDanEkuitas = data?.find(item => item.title === "TOTAL KEWAJIBAN DAN EKUITAS").saldo;

    const selisih = totalAset - totalKewajibanDanEkuitas;

    if (selisih === 0) return 'Seimbang';
    if (selisih !== 0 || !data) return 'Tidak seimbang';
  }, [data]);

  const tableHeadLabel = useMemo(() => [
    { id: 'nama_akun', label: 'Nama Akun', align: 'left', width: 480 },
    { id: 'saldo', label: convertToMonthYear(submitValue?.start_date, submitValue?.end_date), align: 'left', width: 480 },
    { id: 'saldo_tahun_lalu', label: new Date(end_date).getFullYear() - 1, align: 'left', width: 480 },
  ], [convertToMonthYear, submitValue?.end_date]);

  return (
    <Page title="Laporan: Posisi Keuangan">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <NeracaHeader onSubmit={onSubmit} indicatorBalance={getIndicatorBalance} loading={isLoading} />
        </FormProvider>
        <Card sx={{ mt: 3 }} elevation={3}>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              <Table>
                <TableHeadCustom
                  headLabel={tableHeadLabel}
                  rowCount={data?.length}
                  sx={{ background: theme.palette.grey[200], height: '56px' }}
                />

                <TableBody>
                  {!isLoading &&
                    data?.map((row, i) => (
                      <UserTableRows
                        key={row.id}
                        index={i}
                        row={row}
                      />
                    ))}

                  {isLoading && <TableSkeleton />}
                  {/* <TableNoData
                    isNotFound={!isLoading && data === undefined}
                    title="Laporan Posisi Keuangan (Neraca) belum tersedia."
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
