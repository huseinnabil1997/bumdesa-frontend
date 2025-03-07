import { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
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
import useSettings from '../../../hooks/useSettings';
import useTable from '../../../hooks/useTable';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import { TableHeadCustom, TableNoData, TableSkeleton } from '../../../components/table';
import { StyledButton, StyledLoadingButton } from 'src/theme/custom/Button';
// sections
import { Add } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import {
  DeleteModal,
  EditModal,
  NewModal,
  UserTableRow,
  UserTableToolbar,
} from 'src/sections/manager';
import { useGetManagers } from 'src/query/hooks/manager/useGetManagers';
import { useDeleteManager } from 'src/query/hooks/manager/useDeleteManager';
import { useGetPositions } from 'src/query/hooks/manager/useGetPositions';
import { useSelector } from 'react-redux';
import { TABLE_HEAD_MANAGER } from 'src/utils/constant';

// ----------------------------------------------------------------------

const styles = {
  snackbar: {
    width: '344px',
    height: '48px',
    backgroundColor: '#E1F8EB',
    gap: '8px',
    padding: '8px',
    borderRadius: '4px',
  },
  snackbarIcon: {
    width: '16px',
    height: '16px',
    color: '#27AE60',
  },
  loadingButton: {
    width: '100%',
    maxWidth: 164,
    height: '48px',
    backgroundColor: '#1078CA',
    mb: { xs: 2.5, sm: 0, md: 0, lg: 0 },
    fontSize: '13px',
    fontWeight: 700,
  },
  tableHead: {
    backgroundColor: '#F8F9F9',
    border: 1,
    borderRadius: 8,
    borderColor: '#EAEBEB',
  },
  tableRow: {
    backgroundColor: '#F8F9F9',
    border: 1,
    borderRadius: 8,
    borderColor: '#EAEBEB',
  },
  pagination: {
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
  },
  select: {
    height: 32,
    width: 70,
  },
  addButton: {
    mt: 2,
    width: 200,
  },
};

// ----------------------------------------------------------------------

ManagerList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function ManagerList() {
  const { page, rowsPerPage, onChangeRowsPerPage, selected, onSelectRow, onChangePage } = useTable({
    defaultCurrentPage: 1,
  });

  const userData = useSelector((state) => state.user.userData);

  const { themeStretch } = useSettings();

  const { enqueueSnackbar } = useSnackbar();

  const { mutate: onDeleteManager } = useDeleteManager();

  const { data: positions } = useGetPositions();

  const [filterName, setFilterName] = useState('');
  const [alertDelete, setAlertDelete] = useState(null);
  const [openNewModal, setOpenNewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(null);

  const {
    data: managers,
    isLoading,
    refetch,
  } = useGetManagers({
    page: page,
    limit: rowsPerPage,
    search: filterName,
  });

  const {
    data: managersDeleteStatus,
  } = useGetManagers({
    page: page,
    limit: rowsPerPage,
  });

  useEffect(() => {
    refetch();
  }, [page, rowsPerPage, filterName]);

  const handleDeleteRow = (id) => {
    setAlertDelete({ id: id });
  };

  const onDelete = async () => {
    onDeleteManager(alertDelete?.id, {
      onSuccess: () => {
        enqueueSnackbar('', {
          variant: 'success',
          content: () => (
            <Box display="flex" alignItems="center" sx={styles.snackbar}>
              <Iconify icon={'eva:checkmark-circle-2-fill'} sx={styles.snackbarIcon} />
              <Typography fontSize="12px">Hapus Data Pengurus Berhasil!</Typography>
            </Box>
          ),
        });
        refetch();
        setAlertDelete(null);
      },
      onError: (err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      },
    });
  };

  const handleInputChange = useCallback(
    debounce((event) => {
      setFilterName(event.target.value);
    }, 300),
    []
  );

  return (
    <Page title="Pengurus: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Box
          flexDirection={{ xs: 'column', sm: 'row', md: 'row', lg: 'row' }}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <UserTableToolbar
              filterName={filterName}
              onFilterName={setFilterName}
              handleInputChange={handleInputChange}
            />
          </Box>

          {userData.role !== 4 && (
            <StyledLoadingButton
              sx={styles.loadingButton}
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} />}
              onClick={() => setOpenNewModal(true)}
            >
              Tambah Anggota
            </StyledLoadingButton>
          )}
        </Box>

        <Card sx={{ borderRadius: 2 }}>
          <TableContainer sx={{ minWidth: 300, position: 'relative', borderRadius: 2 }}>
            <Table>
              <TableHeadCustom
                headLabel={TABLE_HEAD_MANAGER(userData.role)}
                rowCount={managers?.data?.length}
                numSelected={selected.length}
                sx={styles.tableHead}
              />

              <TableBody>
                {!isLoading &&
                  managers &&
                  managers?.data?.map((row, index) => (
                    <UserTableRow
                      id={row.id}
                      key={row.id}
                      row={row}
                      index={index}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      disableDelete={managersDeleteStatus?.data.length <= 3 && page === 1}
                      onEditRow={() => setOpenEditModal(row.id)}
                      sx={styles.tableRow}
                    />
                  ))}
                <TableNoData
                  isNotFound={
                    (managers?.data?.length === 0 || managers?.data?.length === undefined) &&
                    !isLoading
                  }
                  title="Pengurus BUM Desa belum tersedia."
                  description="Silakan tambah Pengurus BUM Desa dengan klik tombol di bawah ini."
                  action={
                    <StyledButton
                      sx={styles.addButton}
                      variant="outlined"
                      startIcon={<Add fontSize="small" />}
                      onClick={() => setOpenNewModal(true)}
                    >
                      Tambah Anggota
                    </StyledButton>
                  }
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
              sx={styles.select}
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
            count={managers?.metadata?.paging?.total_page}
            rowsPerPage={rowsPerPage}
            page={page}
            onChange={onChangePage}
            sx={styles.pagination}
          />
        </Box>
        <DeleteModal
          open={!!alertDelete}
          onClose={() => {
            setAlertDelete(null);
            refetch();
          }}
          action={onDelete}
        />
        <NewModal
          open={openNewModal}
          positions={positions}
          onClose={() => {
            setOpenNewModal(false);
            refetch();
          }}
        />
        <EditModal
          open={!!openEditModal}
          positions={positions}
          onClose={() => {
            setOpenEditModal(null);
            refetch();
          }}
          id={openEditModal}
        />
      </Container>
    </Page>
  );
}
