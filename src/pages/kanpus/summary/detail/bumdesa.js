// @mui
import {
  Box,
  Card,
  Table,
  TableBody,
  Container,
  TableContainer,
  Pagination,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
// hooks
import useSettings from 'src/hooks/useSettings';
import useTable from 'src/hooks/useTable';
// layouts
import Layout from 'src/layouts';
// components
import Page from 'src/components/Page';
import Scrollbar from 'src/components/Scrollbar';
import { TableHeadCustom, TableNoData, TableSkeleton } from 'src/components/table';
// sections
import { FormProvider } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { BUMDES_DETAIL_HEAD } from 'src/utils/constant';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import TableError from 'src/components/table/TableError';
import { TableRow } from 'src/sections/kanpus/summary-bumdesa';
import { Header } from 'src/sections/kanpus/list';
import { useGetSummaryBumdesa } from 'src/query/hooks/dashboard/useGetSummaryBumdesa';

// ----------------------------------------------------------------------

DetailSummaryPage.getLayout = function getLayout(page) {
  return <Layout title="Summary BUM Desa">{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function DetailSummaryPage() {
  const router = useRouter();
  const { area } = router.query;

  const { page, onChangePage, rowsPerPage, onChangeRowsPerPage } = useTable({
    defaultCurrentPage: 1,
    defaultRowsPerPage: 10,
  });

  const { themeStretch } = useSettings();
  const theme = useTheme();

  const methods = useForm({
    defaultValues: { search: '' },
    mode: 'onChange',
  });

  const { watch } = methods;

  const {
    data: summary,
    isLoading,
    isError,
  } = useGetSummaryBumdesa({
    limit: rowsPerPage,
    page,
    area,
  });

  const handleViewRow = (row) => {
    router.push(`/unit/detail?id=${row.bumdesa_id}`);
  };

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <FormProvider methods={methods}>
          <Header value={watch('search')} />
        </FormProvider>

        <Card sx={{ mt: 3 }} elevation={3}>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              <Table>
                <TableHeadCustom
                  headLabel={BUMDES_DETAIL_HEAD}
                  rowCount={summary?.data?.length}
                  sx={{ background: theme.palette.grey[200] }}
                />

                <TableBody>
                  {!isLoading &&
                    summary?.data?.length > 0 &&
                    summary?.data?.map((row, i) => (
                      <TableRow
                        key={row.id}
                        index={i}
                        row={row}
                        onViewRow={() => handleViewRow(row)}
                      />
                    ))}

                  {isLoading && <TableSkeleton />}

                  {!summary?.data?.length > 0 && !isError && !isLoading && (
                    <TableNoData
                      isNotFound
                      title="BUMDesa belum tersedia."
                      description="Silakan cek koneksi Anda dan muat ulang halaman."
                    />
                  )}

                  {!isLoading && isError && (
                    <TableError
                      title="Koneksi Error"
                      description="Silakan cek koneksi Anda dan muat ulang halaman."
                    />
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box display="flex" justifyContent="space-between" sx={{ p: 3 }}>
            <FormControl>
              <Select
                value={rowsPerPage}
                onChange={onChangeRowsPerPage}
                displayEmpty
                inputProps={{ 'aria-label': 'Rows per page' }}
                aria-controls=""
                sx={{ height: 32, width: 72 }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
            <Pagination
              showFirstButton
              showLastButton
              variant="outlined"
              shape="rounded"
              color="primary"
              count={summary?.metadata?.paging?.total_page ?? 0}
              rowsPerPage={rowsPerPage ?? 10}
              page={page ?? 0}
              onChange={onChangePage}
              sx={{
                '& .MuiPaginationItem-page': {
                  border: 'none !important',
                },
                '& .MuiPaginationItem-icon': {
                  color: '#1078CA',
                },
                '& .MuiPaginationItem-previousNext': {
                  borderColor: '#1078CA',
                },
                '& .MuiPaginationItem-firstLast': {
                  borderColor: '#1078CA',
                },
              }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}
