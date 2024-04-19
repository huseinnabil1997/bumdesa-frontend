import { useState } from 'react';

// @mui
import { Box, Card, Table, TableBody, Container, TableContainer, Pagination } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
import useTable from '../../../hooks/useTable';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import { TableHeadCustom, TableNoData, TableSkeleton } from '../../../components/table';
import AlertDeleteVendor from '../../../components/modal/DeleteVendor';
// sections
import { UserTableRow } from '../../../sections/report/profit';
import { FormProvider } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { PROFIT_HEAD } from 'src/utils/constant';
import { useTheme } from '@mui/material/styles';
import { StyledButton } from 'src/theme/custom/Button';
import { Add } from '@mui/icons-material';
import { LabaRugiHeader } from 'src/sections/report/profit';
import { useGetProfit } from 'src/query/hooks/report/profit/useGetProfit';
import { dataLabaRugi } from './data';

// ----------------------------------------------------------------------

LaporanLabaRugi.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function LaporanLabaRugi() {

  const { themeStretch } = useSettings();
  const theme = useTheme();

  // const { data, isLoading } = useGetProfit();

  const data = dataLabaRugi;
  const isLoading = false;

  console.log('data---', data)

  const [filterName, setFilterName] = useState('');
  const [alertDelete, setAlertDelete] = useState(null);

  const handleDeleteRow = (id) => {};

  const handleEditRow = (row) => {};

  const handleViewRow = (row) => {};

  const methods = useForm({
    defaultValues: { unit: null, year: null },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Page title="Laporan: Laba Rugi">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <LabaRugiHeader />
        </FormProvider>
        <Card sx={{ mt: 3 }} elevation={3}>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              <Table>
                <TableHeadCustom
                  headLabel={PROFIT_HEAD}
                  rowCount={data?.length}
                  sx={{ background: theme.palette.grey[200], height: '56px' }}
                />

                <TableBody>
                  {!isLoading &&
                    data.map((row, i) => (
                      <UserTableRow
                        key={row.id}
                        index={i}
                        row={row}
                        onViewRow={() => handleViewRow(row)}
                      />
                    ))}

                  {isLoading && <TableSkeleton />}
                  {!data?.length > 0 && (
                    <TableNoData
                      title="Jurnal belum tersedia."
                      description="Silakan buat jurnal dengan klik tombol di bawah ini."
                      action={
                        <StyledButton
                          sx={{ mt: 2, width: 200 }}
                          variant="outlined"
                          startIcon={<Add fontSize="small" />}
                        >
                          Buat Jurnal
                        </StyledButton>
                      }
                    />
                  )}
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
