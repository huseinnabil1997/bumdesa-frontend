import { useEffect, useMemo } from 'react';

// @mui
import {
  Box,
  Card,
  Table,
  TableBody,
  Container,
  TableContainer,
  Pagination,
  Alert,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
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
import { FormProvider } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { SUPERVISOR_HEAD } from 'src/utils/constant';
import { useTheme } from '@mui/material/styles';
import { StyledButton } from 'src/theme/custom/Button';
import { Add } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import TableError from 'src/components/table/TableError';
import { debounce } from 'lodash';
import { useSelector } from 'react-redux';
import SupervisorHeader from 'src/sections/supervisor/SupervisorHeader';
import { TableRow } from 'src/sections/supervisor';
import { useGetSupervisors } from 'src/query/hooks/supervisor/useGetSupervisors';
import { useDeleteSupervisor } from 'src/query/hooks/supervisor/useDeleteSupervisor';

// ----------------------------------------------------------------------

SupervisorList.getLayout = function getLayout(page) {
  return <Layout title="Pengawas BUM Desa">{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function SupervisorList() {
  const userData = useSelector((state) => state.user.userData);
  const { page, onChangePage, rowsPerPage, onChangeRowsPerPage } = useTable({
    defaultCurrentPage: 1,
    defaultRowsPerPage: 10,
  });

  const { themeStretch } = useSettings();
  const theme = useTheme();
  const router = useRouter();

  const methods = useForm({
    defaultValues: { search: '' },
    mode: 'onChange',
  });

  const { watch } = methods;

  const search = watch('search');

  const { data, isLoading, isError, refetch } = useGetSupervisors({
    limit: rowsPerPage,
    page,
    search,
  });

  const debounceRefetch = useMemo(() => debounce((search) => refetch({ search }), 1000), []);

  const { mutate: onDelete, isLoading: deleting } = useDeleteSupervisor();

  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteRow = (id) => {
    onDelete(id, {
      onSuccess: (res) => {
        enqueueSnackbar(res.message, { variant: 'success' });
        refetch();
      },
      onError: (err) => {
        console.log(err);
        enqueueSnackbar('Gagal', { variant: 'error' });
      },
    });
  };

  const handleEditRow = (row) => {
    router.push(`/supervisor/${row.id}`);
  };

  useEffect(() => {
    onChangePage(null, 1);
    debounceRefetch(search);
  }, [search, debounceRefetch]);

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <FormProvider methods={methods}>
          <SupervisorHeader
            value={search}
            isEmpty={data?.supervisors?.length === 0}
            filter={{
              page,
              search,
            }}
          />
        </FormProvider>
        {deleting && (
          <Alert
            sx={{ mt: 3 }}
            severity="warning"
            variant="outlined"
            icon={<CircularProgress size={20} color="warning" />}
          >
            Sedang menghapus...
          </Alert>
        )}
        <Card sx={{ mt: 3 }} elevation={3}>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              <Table>
                <TableHeadCustom
                  headLabel={SUPERVISOR_HEAD}
                  rowCount={data?.supervisors?.length}
                  sx={{ background: theme.palette.grey[200] }}
                />

                <TableBody>
                  {!isLoading &&
                    data?.supervisors?.length > 0 &&
                    data?.supervisors.map((row, i) => (
                      <TableRow
                        key={row.id}
                        index={i}
                        row={row}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row)}
                      />
                    ))}

                  {isLoading && <TableSkeleton />}

                  {!data?.supervisors?.length > 0 && !isError && !isLoading && (
                    <TableNoData
                      isNotFound
                      title="Pengawas belum tersedia."
                      description={
                        userData?.role !== 4
                          ? 'Silakan buat pengawas dengan klik tombol di bawah ini.'
                          : 'Silahkan tunggu sampai pengawas tersedia.'
                      }
                      action={
                        userData?.role !== 4 && (
                          <StyledButton
                            sx={{ mt: 2, width: 200 }}
                            variant="outlined"
                            startIcon={<Add fontSize="small" />}
                            onClick={() => router.push('/supervisor/create')}
                          >
                            Tambah Pengawas
                          </StyledButton>
                        )
                      }
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
              sx={{ height: 32, width: 100 }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
          <Pagination
            showFirstButton
            showLastButton
            variant="outlined"
            shape="rounded"
            color="primary"
            count={data?.page?.total_page ?? 0}
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
      </Container>
    </Page>
  );
}
