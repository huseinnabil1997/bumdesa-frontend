import { useEffect } from 'react';
import { useRouter } from 'next/router';
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
  useTheme,
} from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
import useTable from '../../../hooks/useTable';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import { TableHeadCustom, TableNoData, TableSkeleton } from '../../../components/table';
// sections
import { UserTableRow } from 'src/sections/data-unit';
import { FormProvider } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { useGetListUnit } from 'src/query/hooks/data-unit/useGetListUnit';
import UnitHeader from 'src/sections/data-unit/UnitHeader';
import TableError from 'src/components/table/TableError';
import Scrollbar from 'src/components/Scrollbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name_sticky', label: 'Nama Unit Usaha', align: 'left', minWidth: 200 },
  { id: 'bumdesa_name', label: 'Nama BUMDesa', align: 'left', minWidth: 200 },
  { id: 'registration_date', label: 'Tahun Registrasi', align: 'left', minWidth: 150 },
  { id: 'financial_status', label: 'Status Laporan Keuangan', align: 'center', minWidth: 150 },
  { id: 'profitability', label: 'Profitabilitas', align: 'left', minWidth: 150 },
  { id: 'liquidity', label: 'Liquiditas', align: 'left', minWidth: 150 },
  { id: 'solvency', label: 'Solvabilitas', align: 'left', minWidth: 150 },
  { id: 'total_omset', label: 'Total Omset', align: 'left', minWidth: 150 },
  { id: 'profit', label: 'Laba Rugi', align: 'left', minWidth: 150 },
  { id: 'cash_balance', label: 'Total Kas Tunai', align: 'left', minWidth: 150 },
  { id: 'detail', label: 'Detail', align: 'center', minWidth: 100 },
];

// ----------------------------------------------------------------------

UserList.getLayout = function getLayout(page) {
  return <Layout title="Data Unit Usaha">{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function UserList() {
  const { page, rowsPerPage, onChangeRowsPerPage, onChangePage, setPage } = useTable({
    defaultCurrentPage: 1,
  });

  const router = useRouter();

  const { themeStretch } = useSettings();

  const theme = useTheme();

  const methods = useForm({
    defaultValues: {
      search: '',
      provinsi: null,
      kota: null,
      kecamatan: null,
      desa: null,
    },
    mode: 'onChange',
  });

  const { watch, setValue } = methods;

  const { data: units, isLoading, isError, refetch } = useGetListUnit({
    page: page,
    limit: rowsPerPage,
    unit: watch('search'),
    // province: watch('provinsi')?.value,
    // city: watch('kota')?.value,
    // district: watch('kecamatan')?.value,
    // subdistrict: watch('desa')?.value,
    area_code: watch('desa')?.value ?? watch('kecamatan')?.value ?? watch('kota')?.value ?? watch('provinsi')?.value,
    status_report: watch('report')?.value,
  });

  console.log('search', watch('search'));

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    refetch();
  }, [page, rowsPerPage]);

  useEffect(() => {
    setPage(1);
  }, [watch('search'), watch('report'), watch('provinsi'), watch('kota'), watch('kecamatan'), watch('desa ')]);

  return (
    <Page title="Data Unit Usaha: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <FormProvider methods={methods}>
          <UnitHeader
            value={watch('search')}
            isEmpty={units?.data?.length === 0}
            filter={{
              page,
              limit: rowsPerPage,
              provinsi: watch('provinsi') ?? null,
              kota: watch('kota') ?? null,
              kecamatan: watch('kecamatan') ?? null,
              desa: watch('desa') ?? null,
              status_report: watch('report') ?? null,
              unit: watch('search') ?? null,
            }}
            setValue={setValue}
          />
        </FormProvider>

        <Card sx={{ borderRadius: 2 }}>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              <Table>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  rowCount={units?.data?.length}
                  sx={{ background: theme.palette.grey[200] }}
                />

                <TableBody>
                  {!isLoading &&
                    units?.data?.length > 0 &&
                    units?.data?.map((row, i) => (
                      <UserTableRow
                        key={row.unit_id}
                        index={i}
                        row={row}
                        onViewRow={() => router.push(`${row.unit_id}`)}
                      />
                    ))}

                  {isLoading && <TableSkeleton />}

                  {!units?.data?.length > 0 && !isError && !isLoading && (
                    <TableNoData
                      isNotFound
                      title="Unit Usaha belum tersedia."
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
        </Card>

        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ p: 3 }}
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
            count={units?.metadata?.paging?.total_page}
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
