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
  Typography,
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
import { StyledButton, StyledLoadingButton } from 'src/theme/custom/Button';
// sections
import { Add } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { useGetUnits } from 'src/query/hooks/units/useGetUnits';
import { DeleteModal, EditModal, NewModal, UserTableRow, UserTableToolbar } from 'src/sections/manager';
import { useDeleteJurnal } from 'src/query/hooks/jurnals/useDeleteJurnal';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Nama', align: 'left' },
  { id: 'position', label: 'Jabatan', align: 'left' },
  { id: 'phone', label: 'Nomor Telepon', align: 'left' },
  { id: 'status', label: 'Action', align: 'center' },
];

const styles = {
  snackbar: {
    backgroundColor: '#1078CA',
    color: '#fff',
    borderRadius: 8,
    padding: '4px 8px',
  },
  snackbarIcon: {
    width: 16,
    height: 16,
    marginRight: 0.5,
  },
};

// ----------------------------------------------------------------------

ManagerList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function ManagerList() {
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

  const { mutate: onDeleteManager } = useDeleteJurnal();

  const [filterName, setFilterName] = useState('');
  const [alertDelete, setAlertDelete] = useState(null);
  const [openNewModal, setOpenNewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(null);

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

  const handleDeleteRow = (id) => {
    setAlertDelete({ id: id });
  };

  const onDelete = async () => {
    onDeleteManager(alertDelete?.id, {
      onSuccess: () => {
        enqueueSnackbar('', {
          variant: 'success',
          content: () => (
            <Box
              display="flex"
              alignItems="center"
              sx={styles.snackbar}
            >
              <Iconify icon={'eva:checkmark-circle-2-fill'} sx={styles.snackbarIcon} />
              <Typography fontSize="12px">Hapus Data Pengurus Berhasil!</Typography>
            </Box>
          )
        });
        refetch();
        setAlertDelete(null);
      },
      onError: (err) => {
        console.log(err);
        enqueueSnackbar('Gagal', { variant: 'error' });
      },
    });
  };

  const handleInputChange = (event) => {
    if (event.key === 'Enter') {
      refetch();
    }
  };

  return (
    <Page title="Pengurus: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Box flexDirection={{ xs: 'column', sm: 'row', md: 'row', lg: 'row' }} sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flexGrow: 1 }}>
            <UserTableToolbar
              filterName={filterName}
              onFilterName={setFilterName}
              handleInputChange={handleInputChange}
            />
          </Box>

          <StyledLoadingButton
            sx={{
              width: '100%',
              maxWidth: 164,
              height: '48px',
              backgroundColor: '#1078CA',
              mb: { xs: 2.5, sm: 0, md: 0, lg: 0 },
              fontSize: '13px',
              fontWeight: 700,
            }}
            variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}
            onClick={() => setOpenNewModal(true)}
          >
            Tambah Anggota
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
                    <UserTableRow
                      id={row.id}
                      key={row.id}
                      row={row}
                      index={index}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      disableDelete={units?.data.length === 3 && page === 1}
                      onEditRow={() => setOpenEditModal(row.id)}
                      sx={{ backgroundColor: '#F8F9F9', border: 1, borderRadius: 8, borderColor: '#EAEBEB' }}
                    />
                  ))}
                <TableNoData
                  isNotFound={units?.data?.length === 0}
                  title="Pengurus BUM Desa belum tersedia."
                  description="Silakan tambah Pengurus BUM Desa dengan klik tombol di bawah ini."
                  action={
                    <StyledButton
                      sx={{ mt: 2, width: 200 }}
                      variant="outlined"
                      startIcon={<Add fontSize="small" />}
                      onClick={() => router.push('new')}
                    >
                      Tambah Anggota
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
        <DeleteModal open={!!alertDelete} onClose={() => setAlertDelete(null)} action={onDelete} />
        <NewModal open={openNewModal} onClose={() => setOpenNewModal(false)} />
        <EditModal open={!!openEditModal} onClose={() => setOpenEditModal(null)} id={openEditModal} />
      </Container>
    </Page>
  );
}
