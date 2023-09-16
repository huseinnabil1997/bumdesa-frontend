import { useEffect, useState } from 'react';

// @mui
import {
  Box,
  Card,
  Table,
  Button,
  Tooltip,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  Pagination,
  Alert,
} from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
import useTable, { emptyRows } from '../../hooks/useTable';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
  TableSkeleton,
} from '../../components/table';
import ModalAddVendor from '../../components/modal/AddVendor';
import AlertDeleteVendor from '../../components/modal/DeleteVendor';
// sections
import { UserTableToolbar, UserTableRow } from '../../sections/@dashboard/user/list';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVendor, getVendors, resetMessage } from '../../redux/slices/vendor';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Nama Vendor', align: 'left' },
  { id: 'tdr', label: 'Nomor TDR', align: 'left' },
  { id: 'tdr_start_date', label: 'Awal Masa Berlaku', align: 'left' },
  { id: 'tdr_end_date', label: 'Akhir Masa Berlaku', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

UserList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function UserList() {
  let debounceTimeout;
  const {
    page,
    rowsPerPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onChangePage,
  } = useTable({ defaultCurrentPage: 1 });

  const { themeStretch } = useSettings();

  const { vendors, isLoading, error, success } = useSelector((state) => state.vendor);
  const dispatch = useDispatch();

  const [filterName, setFilterName] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [isEdit, setEdit] = useState(false);
  const [alertDelete, setAlertDelete] = useState(null);

  const fetchData = (key) => {
    dispatch(getVendors(page, key));
    setTimeout(() => {
      dispatch(resetMessage());
    }, [3000]);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleDeleteRow = (id) => {
    setAlertDelete(id);
    setSelected([]);
  };

  const onDelete = () => {
    dispatch(deleteVendor(alertDelete));
    setAlertDelete(null);
    setTimeout(() => {
      dispatch(resetMessage());
    }, [3000]);
  };

  const handleDeleteRows = () => {
    setSelected([]);
  };

  const handleEditRow = (row) => {
    setOpen(true);
    setId(row.id);
    setEdit(true);
  };

  const handleViewRow = (row) => {
    setOpen(true);
    setId(row.id);
  };

  const handleClose = () => {
    setId(null);
    setOpen(false);
    setEdit(false);
  };

  const handleInputChange = (event) => {
    if (event.key === 'Enter') {
      fetchData(filterName);
    }
  };

  return (
    <Page title="User: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Vendor"
          links={[{ name: 'Dashboard' }, { name: 'Vendor' }]}
          action={
            <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />} onClick={() => setOpen(true)}>
              New Vendor
            </Button>
          }
        />

        <Card>
          <UserTableToolbar
            filterName={filterName}
            onFilterName={setFilterName}
            handleInputChange={handleInputChange}
          />

          {success && (
            <Alert severity="success" sx={{ m: 1 }}>
              {success}
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ m: 1 }}>
              {error}
            </Alert>
          )}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  numSelected={selected.length}
                  rowCount={vendors?.data.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      vendors?.data.map((row) => row.id)
                    )
                  }
                  actions={
                    <Tooltip title="Delete">
                      <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                        <Iconify icon={'eva:trash-2-outline'} />
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}

              <Table>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  rowCount={vendors?.data.length}
                  numSelected={selected.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      vendors?.data.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {!isLoading &&
                    vendors?.data.map((row) => (
                      <UserTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row)}
                        onViewRow={() => handleViewRow(row)}
                      />
                    ))}

                  <TableEmptyRows emptyRows={emptyRows(page, rowsPerPage, vendors?.data.length)} />
                  {isLoading && <TableSkeleton />}
                  <TableNoData isNotFound={!vendors?.data} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box display="flex" justifyContent="end" sx={{ p: 3 }}>
            <Pagination
              showFirstButton
              showLastButton
              color="primary"
              count={vendors?.lastPage}
              rowsPerPage={vendors?.totalPerPage}
              page={page}
              onChange={onChangePage}
            />
          </Box>
        </Card>
        <ModalAddVendor open={isOpen} onClose={handleClose} id={id} refetch={fetchData} isEdit={isEdit} />
        <AlertDeleteVendor open={!!alertDelete} onClose={() => setAlertDelete(null)} action={onDelete} />
      </Container>
    </Page>
  );
}
