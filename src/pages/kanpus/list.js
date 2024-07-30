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
import { BUMDES_HEAD } from 'src/utils/constant';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import TableError from 'src/components/table/TableError';
import { Header, TableRow } from 'src/sections/kanpus/list';
import { useGetListBumdesa } from 'src/query/hooks/bumdesa/useGetListBumdesa';

// ----------------------------------------------------------------------

JurnalList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function JurnalList() {
  const { page, onChangePage } = useTable({ defaultCurrentPage: 1 });

  const { themeStretch } = useSettings();
  const theme = useTheme();
  const router = useRouter();

  const methods = useForm({
    defaultValues: { search: '' },
    mode: 'onChange',
  });

  const { watch } = methods;

  const { data, isLoading, isError } = useGetListBumdesa({
    limit: 10,
    page,
    search: watch('search'),
  });

  const handleViewRow = (row) => {
    router.push(`/kanpus/dashboard/${row.id}`);
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
                  headLabel={BUMDES_HEAD}
                  rowCount={data?.journals?.length}
                  sx={{ background: theme.palette.grey[200] }}
                />

                <TableBody>
                  {!isLoading &&
                    data?.data?.length > 0 &&
                    data?.data?.map((row, i) => (
                      <TableRow
                        key={row.id}
                        index={i}
                        row={row}
                        onViewRow={() => handleViewRow(row)}
                      />
                    ))}

                  {isLoading && <TableSkeleton />}

                  {!data?.data?.length > 0 && !isError && !isLoading && (
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

          <Box display="flex" justifyContent="end" sx={{ p: 3 }}>
            <Pagination
              showFirstButton
              showLastButton
              variant="outlined"
              shape="rounded"
              color="primary"
              count={data?.metadata?.paging?.total_page}
              rowsPerPage={10}
              page={page}
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
