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
  TextField,
} from '@mui/material';
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
import { TableRow, Header } from 'src/sections/log';
import { useTheme } from '@mui/material/styles';
import TableError from 'src/components/table/TableError';
import { useGetLogs } from 'src/query/hooks/log/useGetLog';
import { LOG_HEAD } from 'src/utils/constant';
import { Search } from '@mui/icons-material';
import { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';

// ----------------------------------------------------------------------

JurnalList.getLayout = function getLayout(page) {
  return <Layout title="Semua Log Aktivitas">{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function JurnalList() {
  const { page, rowsPerPage, onChangeRowsPerPage, onChangePage } = useTable({
    defaultCurrentPage: 1,
  });

  const [search, setSearch] = useState('');

  const { themeStretch } = useSettings();
  const theme = useTheme();

  const debounceRefetch = useMemo(() => debounce((search) => refetch({ search }), 1000), []);

  const { data, isLoading, isError, refetch } = useGetLogs({ page, limit: rowsPerPage, search });

  useEffect(() => {
    onChangePage(null, 1);
    debounceRefetch(search);
  }, [search, debounceRefetch]);

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Header />
        <TextField
          sx={{ mt: 3 }}
          size="small"
          placeholder="Cari log aktivitas disini..."
          InputProps={{ startAdornment: <Search sx={{ mr: 1 }} /> }}
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Card sx={{ mt: 3 }} elevation={3}>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              <Table>
                <TableHeadCustom
                  headLabel={LOG_HEAD}
                  rowCount={data?.length}
                  sx={{ background: theme.palette.grey[200] }}
                />

                <TableBody>
                  {!isLoading &&
                    data?.length > 0 &&
                    data?.map((row, i) => <TableRow key={row.id} index={i} row={row} />)}

                  {isLoading && <TableSkeleton />}

                  {!data?.length > 0 && !isError && !isLoading && (
                    <TableNoData
                      isNotFound
                      title="Data Kosong"
                      description="Buku besar belum tersedia."
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
        </Card>

        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ py: 3 }}
          flexDirection={{ xs: 'column', sm: 'row', md: 'row', lg: 'row' }}
        >
          <FormControl>
            <Select
              value={rowsPerPage}
              onChange={onChangeRowsPerPage}
              displayEmpty
              inputProps={{ 'aria-label': 'Rows per page' }}
              aria-controls=""
              sx={{ height: 32, width: 70 }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </FormControl>
          <Pagination
            showFirstButton
            showLastButton
            variant="outlined"
            shape="rounded"
            color="primary"
            count={10}
            rowsPerPage={rowsPerPage}
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
      </Container>
    </Page>
  );
}
