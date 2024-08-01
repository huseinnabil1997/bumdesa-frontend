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
import usePost from 'src/query/hooks/mutation/usePost';
import useDelete from 'src/query/hooks/mutation/useDelete';
import { useDeactivate } from 'src/query/hooks/units/useDeactivate';
import { useActivate } from 'src/query/hooks/units/useActivate';
import ChangeStatusModal from 'src/components/modal/ChangeStatus';
import { UserTableRow } from 'src/sections/data-unit';
import { FormProvider } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { useGetListUnit } from 'src/query/hooks/data-unit/useGetListUnit';
import UnitHeader from 'src/sections/data-unit/UnitHeader';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Nama Unit Usaha', align: 'left' },
  { id: 'bumdesa_name', label: 'Nama BUMDesa', align: 'left' },
  { id: 'registration_date', label: 'Tahun Registrasi', align: 'left' },
  { id: 'activation_status', label: 'Status Aktivasi BUMDesa', align: 'center' },
  { id: 'financial_status', label: 'Status Laporan Keuangan', align: 'center' },
  { id: 'cash_count', label: 'Jumlah Kas Tunai', align: 'left' },
  { id: 'detail', label: 'Detail', align: 'center' },
];

// ----------------------------------------------------------------------

UserList.getLayout = function getLayout(page) {
  return <Layout title="Data Unit Usaha">{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function UserList() {
  const { page, rowsPerPage, onChangeRowsPerPage, selected, onSelectRow, onChangePage } = useTable({
    defaultCurrentPage: 1,
  });

  const router = useRouter();

  const { themeStretch } = useSettings();

  const { enqueueSnackbar } = useSnackbar();

  const mutationPost = usePost();

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

  const { data: units, isLoading, refetch } = useGetListUnit({
    page: page,
    limit: rowsPerPage,
    search: watch('search'),
    province: watch('provinsi')?.value,
    city: watch('kota')?.value,
    district: watch('kecamatan')?.value,
    subdistrict: watch('desa')?.value,
    report: watch('report')?.value,
  });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    refetch();
  }, [page, rowsPerPage, watch('search')]);

  const handleResendRow = async (id) => {
    try {
      const response = await mutationPost.mutateAsync({
        endpoint: `/business-units/resend-verify/${id}`,
      });
      await enqueueSnackbar(response.messsage ?? 'Berhasil kirim ulang ke email!', {
        variant: 'success',
      });
      refetch();
    } catch (error) {
      await enqueueSnackbar(error.messsage ?? 'Gagal kirim ulang ke email!', { variant: 'error' });
      console.log('error handleResendRow', error);
    }
  };

  const handleDeleteRow = (id) => {
    setAlertDelete({ id: id });
  };

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

  const handleChangeStatus = async (id, status) => {
    setAlertChangeStatus({ id: id, status: status });
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
              report: watch('report') ?? null,
            }}
            setValue={setValue}
          />
        </FormProvider>

        <Card sx={{ borderRadius: 2 }}>
          <TableContainer sx={{ minWidth: 300, position: 'relative', borderRadius: 2 }}>
            <Table>
              <TableHeadCustom
                headLabel={TABLE_HEAD}
                rowCount={units?.data?.length}
                numSelected={selected.length}
                sx={{
                  backgroundColor: '#F8F9F9',
                  border: 1,
                  borderRadius: 8,
                  borderColor: '#EAEBEB',
                }}
              />

              <TableBody>
                {!isLoading &&
                  units &&
                  units?.data?.map((row, index) => (
                    <UserTableRow
                      id={row.id}
                      key={row.id}
                      row={row}
                      index={index}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      disableDelete={units?.data.length === 1 && page === 1}
                      onEditRow={() => router.push(`edit?id=${row.id}`)}
                      onResendRow={() => handleResendRow(row.id)}
                      onViewRow={() => router.push(`detail?id=${row.id}`)}
                      onDeactivateRow={() => handleChangeStatus(row.id, row.status)}
                      onActivateRow={() => handleChangeStatus(row.id, row.status)}
                      sx={{
                        backgroundColor: '#F8F9F9',
                        border: 1,
                        borderRadius: 8,
                        borderColor: '#EAEBEB',
                      }}
                    />
                  ))}
                <TableNoData
                  isNotFound={units?.data?.length === 0}
                  title="Data Unit Usaha belum tersedia."
                  // description="Silakan tambah BUMDesa dengan klik tombol di bawah ini."
                  // action={
                  //   <StyledButton
                  //     sx={{ mt: 2, width: 200 }}
                  //     variant="outlined"
                  //     startIcon={<Add fontSize="small" />}
                  //     onClick={() => router.push('new')}
                  //   >
                  //     Tambah BUMDesa
                  //   </StyledButton>
                  // }
                />
                {isLoading && <TableSkeleton />}
              </TableBody>
            </Table>
          </TableContainer>
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
