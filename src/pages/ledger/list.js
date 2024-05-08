// @mui
import { Box, Card, Table, TableBody, Container, TableContainer, Pagination } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
import useTable from '../../hooks/useTable';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import { TableHeadCustom, TableNoData, TableSkeleton } from '../../components/table';
// sections
import { FormProvider } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { LedgerHeader, TableRow } from 'src/sections/ledger';
import { DEFAULT_FILTER, LEDGER_HEAD } from 'src/utils/constant';
import { useTheme } from '@mui/material/styles';
import { useGetLedgers } from 'src/query/hooks/ledger/useGetLedgers';
import moment from 'moment';

// ----------------------------------------------------------------------

JurnalList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function JurnalList() {
  const { page, onChangePage } = useTable({ defaultCurrentPage: 1 });

  const { themeStretch } = useSettings();
  const theme = useTheme();

  const methods = useForm({
    defaultValues: { unit: null, year: null },
  });

  const { watch } = methods;

  const { data, isLoading } = useGetLedgers({
    ...DEFAULT_FILTER,
    account_code: watch('account')?.value ?? null,
    date: moment(watch('year')).format('yyyy') ?? null,
  });

  console.log(data);

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <FormProvider methods={methods}>
          <LedgerHeader />
        </FormProvider>

        <Card sx={{ mt: 3 }} elevation={3}>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              <Table>
                <TableHeadCustom
                  headLabel={LEDGER_HEAD}
                  rowCount={data?.length}
                  sx={{ background: theme.palette.grey[200] }}
                />

                <TableBody>
                  {!isLoading &&
                    data &&
                    data?.map((row, i) => <TableRow key={row.id} index={i} row={row} />)}

                  {isLoading && <TableSkeleton />}
                  <TableNoData
                    isNotFound={!data}
                    title="Buku Besar Belum Tersedia."
                    description="Silakan pilih tipe akun dan tahun."
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          {data?.length > 0 && (
            <Box display="flex" justifyContent="end" sx={{ p: 3 }}>
              <Pagination
                showFirstButton
                showLastButton
                color="primary"
                count={data?.lastPage}
                rowsPerPage={data?.totalPerPage}
                page={page}
                onChange={onChangePage}
              />
            </Box>
          )}
        </Card>
      </Container>
    </Page>
  );
}
