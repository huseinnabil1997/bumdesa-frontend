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
import useSettings from '../../hooks/useSettings';
import useTable from '../../hooks/useTable';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import {
  TableHeadCustom,
  TableNoData,
  TableSkeleton,
} from '../../components/table';
import AlertDeleteUnit from 'src/components/modal/DeleteUnit';
import { StyledButton, StyledLoadingButton } from 'src/theme/custom/Button';
// sections
import { UserTableToolbarUnit, UserTableRowUnit } from '../../sections/dashboard/unit';
import { Add } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { useGetUnits } from 'src/query/hooks/units/useGetUnits';
import usePost from 'src/query/hooks/mutation/usePost';
import useDelete from 'src/query/hooks/mutation/useDelete';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Unit Usaha', align: 'left' },
  { id: 'tdr', label: 'Alamat Email', align: 'left' },
  { id: 'tdr_start_date', label: 'Tahun Berdiri', align: 'left' },
  { id: 'tdr_end_date', label: 'Status', align: 'left' },
  { id: 'status', label: 'Action', align: 'center' },
];

// ----------------------------------------------------------------------

UserList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function UserList() {
  const {
    page,
    rowsPerPage,
    onChangeRowsPerPage,
    selected,
    onSelectRow,
    onChangePage,
  } = useTable({ defaultCurrentPage: 1 });

  const router = useRouter()

  const { themeStretch } = useSettings();

  const { enqueueSnackbar } = useSnackbar();

  const mutationPost = usePost();

  const mutationDelete = useDelete();

  // const [units, setUnits] = useState({});
  // const [isLoading, setIsLoading] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [alertDelete, setAlertDelete] = useState(null);

  const { data, isLoading, refetch } = useGetUnits({
    page: page,
    limit: rowsPerPage,
    search: filterName,
  });

  const units = data;

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    refetch();
  }, [page, rowsPerPage]);

  const handleResendRow = async (id) => {
    try {
      const response = await mutationPost.mutateAsync({
        endpoint: `/business-units/resend-verify/${id}`,
      });
      await enqueueSnackbar(response.messsage ?? 'Berhasil kirim ulang ke email!', { variant: 'success' });
      refetch();
    } catch (error) {
      await enqueueSnackbar(error.messsage ?? 'Gagal kirim ulang ke email!', { variant: 'error' });
      console.log('error handleResendRow', error);
    }
  }

  const handleDeleteRow = (id) => {
    setAlertDelete({ id: id });
  };

  const onDelete = async () => {
    try {
      const response = await mutationDelete.mutateAsync({
        endpoint: `/business-units/${alertDelete?.id}`,
      });
      enqueueSnackbar(response.message ?? "Sukses menghapus data", { variant: 'success' });
      refetch();
      setAlertDelete(null);
      console.log('response delete', response)
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      if (error.code === 412) {
        setAlertDelete({ id: alertDelete?.id, status: 1 });
      }
      console.log('error delete', error)
    }
  };

  const handleInputChange = (event) => {
    if (event.key === 'Enter') {
      refetch();
    }
  };

  return (
    <Page title="Unit Usaha: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Box flexDirection={{ xs: 'column', sm: 'row', md: 'row', lg: 'row' }} sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flexGrow: 1 }}>
            <UserTableToolbarUnit
              filterName={filterName}
              onFilterName={setFilterName}
              handleInputChange={handleInputChange}
            />
          </Box>

          <StyledLoadingButton
            sx={{
              width: 210,
              height: '48px',
              backgroundColor: '#1078CA',
              mb: { xs: 2.5, sm: 0, md: 0, lg: 0 }
            }}
            variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}
            onClick={() => router.push('new')}
          >
            Tambah Unit Usaha
          </StyledLoadingButton>
        </Box>

        <Card sx={{ borderRadius: 2 }}>
          <TableContainer sx={{ minWidth: 300, position: 'relative', borderRadius: 2, }}>

            <Table>
              <TableHeadCustom
                headLabel={TABLE_HEAD}
                rowCount={units?.data?.length}
                numSelected={selected.length}
                sx={{ backgroundColor: '#F8F9F9', border: 1, borderRadius: 8, borderColor: '#EAEBEB' }}
              />

              <TableBody>
                {!isLoading && units &&
                  units?.data?.map((row, index) => (
                    <UserTableRowUnit
                      id={row.id}
                      key={row.id}
                      row={row}
                      index={index}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id, row.status)}
                      disableDelete={units?.data.length === 1 && page === 1}
                      onEditRow={() => router.push(`edit?id=${row.id}`)}
                      onResendRow={() => handleResendRow(row.id)}
                      onViewRow={() => router.push(`detail?id=${row.id}`)}
                      sx={{ backgroundColor: '#F8F9F9', border: 1, borderRadius: 8, borderColor: '#EAEBEB' }}
                    />
                  ))}
                <TableNoData
                  isNotFound={units?.data?.length === 0}
                  title="Unit usaha belum tersedia."
                  description="Silakan tambah Unit usaha dengan klik tombol di bawah ini."
                  action={
                    <StyledButton
                      sx={{ mt: 2, width: 200 }}
                      variant="outlined"
                      startIcon={<Add fontSize="small" />}
                      onClick={() => router.push('new')}
                    >
                      Tambah Unit usaha
                    </StyledButton>
                  }
                />
                {isLoading && (<TableSkeleton />)}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        <Box display="flex" justifyContent="space-between" sx={{ p: 3 }} flexDirection={{ xs: 'column', sm: 'row', md: 'row', lg: 'row' }}>
          <FormControl>
            <Select
              value={rowsPerPage}
              onChange={onChangeRowsPerPage}
              displayEmpty
              inputProps={{ 'aria-label': 'Rows per page' }} aria-controls=''
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
                borderColor: "#1078CA",
              },
              '& .MuiPaginationItem-firstLast': {
                borderColor: "#1078CA",
              },
            }}
          />
        </Box>
        <AlertDeleteUnit open={!!alertDelete} onClose={() => setAlertDelete(null)} action={onDelete} status={alertDelete?.status} />
      </Container>
    </Page>
  );
}
