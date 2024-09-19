import { useEffect, useState } from 'react';
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
import AlertDeleteUnit from 'src/components/modal/DeleteUnit';
// sections
import { useSnackbar } from 'notistack';
import useDelete from 'src/query/hooks/mutation/useDelete';
import { useDeactivate } from 'src/query/hooks/units/useDeactivate';
import { useActivate } from 'src/query/hooks/units/useActivate';
import ChangeStatusModal from 'src/components/modal/ChangeStatus';
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

  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();

  const mutationDelete = useDelete();

  const [alertDelete, setAlertDelete] = useState(null);
  const [alertChangeStatus, setAlertChangeStatus] = useState(null);

  const { mutate: onDeactivate } = useDeactivate();

  const { mutate: onActivate } = useActivate();

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

  const { data: bumdesas, isLoading, refetch, isError } = useGetListBumdesa({
    page: page,
    limit: rowsPerPage,
    search: watch('search'),
    // province: watch('provinsi')?.value,
    // city: watch('kota')?.value,
    // district: watch('kecamatan')?.value,
    // subdistrict: watch('desa')?.value,
    area_code: watch('desa')?.value ?? watch('kecamatan')?.value ?? watch('kota')?.value ?? watch('provinsi')?.value,
    status_active: watch('status_active')?.value,
  });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    refetch();
  }, [page, rowsPerPage]);

  useEffect(() => {
    setPage(1);
    refetch();
  }, [watch('search'), watch('status_active'), watch('provinsi'), watch('kota'), watch('kecamatan'), watch('desa')]);

  const onDelete = async () => {
    try {
      const response = await mutationDelete.mutateAsync({
        endpoint: `/business-units/${alertDelete?.id}`,
      });
      enqueueSnackbar(response.message ?? 'Sukses menghapus data', { variant: 'success' });
      refetch();
      setAlertDelete(null);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      if (error.code === 412) {
        setAlertDelete({ id: alertDelete?.id, status: 1 });
      }
      console.log('error delete', error);
    }
  };

  const onChangeStatus = async () => {
    if (alertChangeStatus?.status !== 3) {
      onDeactivate(alertChangeStatus?.id, {
        onSuccess: (res) => {
          enqueueSnackbar(res.message ?? 'Sukses menonaktifkan unit usaha', { variant: 'success' });
          refetch();
          setAlertChangeStatus(null);
        },
        onError: (err) => {
          enqueueSnackbar(err.message ?? 'Gagal menonaktifkan unit usaha', { variant: 'error' });
          console.log('error handleDeactivateRow', err);
        },
      });
    } else {
      onActivate(alertChangeStatus?.id, {
        onSuccess: (res) => {
          enqueueSnackbar(res.message ?? 'Sukses mengaktifkan unit usaha', { variant: 'success' });
          refetch();
          setAlertChangeStatus(null);
        },
        onError: (err) => {
          enqueueSnackbar(err.message ?? 'Gagal mengaktifkan unit usaha', { variant: 'error' });
          console.log('error handleActivateRow', err);
        },
      });
    }
  };

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
              desa: watch('desa') ?? null,
              status_active: watch('status_active') ?? null,
              search: watch('search') ?? null,
              area_code: watch('desa')?.value ?? watch('kecamatan')?.value ?? watch('kota')?.value ?? watch('provinsi')?.value,
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
        <ChangeStatusModal
          open={!!alertChangeStatus}
          onClose={() => setAlertChangeStatus(null)}
          action={onChangeStatus}
          status={alertChangeStatus?.status}
        />
        <AlertDeleteUnit
          open={!!alertDelete}
          onClose={() => setAlertDelete(null)}
          action={onDelete}
          status={alertDelete?.status}
        />
      </Container>
    </Page>
  );
}
