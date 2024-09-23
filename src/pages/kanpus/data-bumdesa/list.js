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
import { UserTableRow } from 'src/sections/data-bumdesa';
import { useGetListBumdesa } from 'src/query/hooks/data-bumdesa/useGetListBumdesa';
import { FormProvider } from 'src/components/hook-form';
import BumdesaHeader from 'src/sections/data-bumdesa/BumdesaHeader';
import { useForm } from 'react-hook-form';
import Scrollbar from 'src/components/Scrollbar';
import { useTheme } from '@mui/material/styles';
import TableError from 'src/components/table/TableError';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name_sticky', label: 'Nama BUM Desa', align: 'left', minWidth: 200 },
  { id: 'unit_count', label: 'Jumlah Unit Usaha', align: 'left', minWidth: 150 },
  { id: 'registration_date', label: 'Tahun Registrasi', align: 'left', minWidth: 150 },
  { id: 'activation_status', label: 'Status Aktivasi BUMDesa', align: 'center', minWidth: 150 },
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

BumdesaList.getLayout = function getLayout(page) {
  return <Layout title="Data BUMDesa">{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function BumdesaList() {
  const { page, rowsPerPage, onChangeRowsPerPage, onChangePage, setPage } = useTable({
    defaultCurrentPage: 1,
    defaultRowsPerPage: 5,
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
    },
    mode: 'onChange',
  });

  const { watch, setValue } = methods;

  const { data: bumdesas, isLoading, isError } = useGetListBumdesa({
    page: page,
    limit: rowsPerPage,
    search: watch('search'),
    area_code: watch('kecamatan')?.value ?? watch('kota')?.value ?? watch('provinsi')?.value,
    status_active: watch('status_active')?.value,
  });

  useEffect(() => {
    setPage(1);
  }, [watch('search'), watch('status_active'), watch('provinsi'), watch('kota'), watch('kecamatan')]);

  return (
    <Page title="Data BUM Desa: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <FormProvider methods={methods}>
          <BumdesaHeader
            value={watch('search')}
            isEmpty={bumdesas?.data?.length === 0}
            filter={{
              page,
              limit: rowsPerPage,
              provinsi: watch('provinsi') ?? null,
              kota: watch('kota') ?? null,
              kecamatan: watch('kecamatan') ?? null,
              status_active: watch('status_active') ?? null,
              search: watch('search') ?? null,
              area: watch('kecamatan')?.value ?? watch('kota')?.value ?? watch('provinsi')?.value,
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
                  rowCount={bumdesas?.data?.length}
                  sx={{ background: theme.palette.grey[200] }}
                />

                <TableBody>
                  {!isLoading &&
                    bumdesas?.data?.length > 0 &&
                    bumdesas?.data?.map((row, i) => (
                      <UserTableRow
                        key={row.bumdesa_id}
                        index={i}
                        row={row}
                        onViewRow={() => router.push(`${row.bumdesa_id}`)}
                      />
                    ))}

                  {isLoading && <TableSkeleton />}

                  {!bumdesas?.data?.length > 0 && !isError && !isLoading && (
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
            count={bumdesas?.metadata?.paging?.total_page}
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
