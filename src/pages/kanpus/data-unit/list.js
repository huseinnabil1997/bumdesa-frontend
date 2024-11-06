import { useEffect } from 'react';
import { useRouter } from 'next/router';
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
import useSettings from '../../../hooks/useSettings';
import useTable from '../../../hooks/useTable';
import Layout from '../../../layouts';
import Page from '../../../components/Page';
import { TableHeadCustom, TableNoData, TableSkeleton } from '../../../components/table';
import { UserTableRow } from 'src/sections/data-unit';
import { FormProvider } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { useGetListUnit } from 'src/query/hooks/data-unit/useGetListUnit';
import UnitHeader from 'src/sections/data-unit/UnitHeader';
import TableError from 'src/components/table/TableError';
import Scrollbar from 'src/components/Scrollbar';
import { TABLE_HEAD_DATA_UNIT } from 'src/utils/constant';

UnitList.getLayout = function getLayout(page) {
  return <Layout title="Data Unit Usaha">{page}</Layout>;
};

export default function UnitList() {
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
    },
    mode: 'onChange',
  });

  const { watch, setValue } = methods;

  const { data: units, isLoading, isError } = useGetListUnit({
    page,
    limit: rowsPerPage,
    unit: watch('search'),
    area_code: watch('kecamatan')?.value ?? watch('kota')?.value ?? watch('provinsi')?.value,
    status_report: watch('report')?.value,
  });

  useEffect(() => {
    setPage(1);
  }, [watch('search'), watch('report'), watch('provinsi'), watch('kota'), watch('kecamatan')]);

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
              status_report: watch('report') ?? null,
              unit: watch('search') ?? null,
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
                  headLabel={TABLE_HEAD_DATA_UNIT}
                  rowCount={units?.data?.length}
                  sx={{ background: theme.palette.grey[200] }}
                />
                <TableBody>
                  {!isLoading && units?.data?.length > 0 && units?.data?.map((row, i) => (
                    <UserTableRow
                      key={row.unit_id}
                      index={i}
                      row={row}
                      onViewRow={() => router.push(`${row.unit_id}`)}
                    />
                  ))}
                  {isLoading && <TableSkeleton />}
                  {!units?.data?.length && !isError && !isLoading && (
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
              sx={{ height: 32, width: 70 }}
            >
              {[5, 10, 15, 20].map((value) => (
                <MenuItem key={value} value={value}>{value}</MenuItem>
              ))}
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
              '& .MuiPaginationItem-page': { border: 'none !important' },
              '& .MuiPaginationItem-icon': { color: '#1078CA' },
              '& .MuiPaginationItem-previousNext': { borderColor: '#1078CA' },
              '& .MuiPaginationItem-firstLast': { borderColor: '#1078CA' },
            }}
          />
        </Box>
      </Container>
    </Page>
  );
}