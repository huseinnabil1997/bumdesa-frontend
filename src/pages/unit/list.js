import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
  FormControl,
  Select,
  MenuItem,
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
import AlertDeleteUnit from 'src/components/modal/DeleteUnit';
import { StyledLoadingButton } from 'src/theme/custom/Button';
// sections
import { UserTableToolbarUnit, UserTableRowUnit } from '../../sections/@dashboard/user/list';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVendor, getVendors, resetMessage } from '../../redux/slices/vendor';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Unit Usaha', align: 'left' },
  { id: 'tdr', label: 'Alamat Email', align: 'left' },
  { id: 'tdr_start_date', label: 'Tahun Berdiri', align: 'left' },
  { id: 'tdr_end_date', label: 'Status', align: 'left' },
  { id: 'status', label: 'Action', align: 'center' },
];

const units = [
  { id: '1', name: 'Toko Ikan Pak Budi', email: 'budi@gmail.com', year: '2023', status: 0 },
  { id: '2', name: 'Toko Baju Budi', email: 'batabudi@gmail.com', year: '2019', status: 1 },
  { id: '3', name: 'Toko Ikan Pak Budi', email: 'budi@gmail.com', year: '2023', status: 0 },
  { id: '4', name: 'Toko Baju Budi', email: 'batabudi@gmail.com', year: '2019', status: 1 },
  { id: '5', name: 'Toko Ikan Pak Budi', email: 'budi@gmail.com', year: '2023', status: 0 },
  { id: '6', name: 'Toko Baju Budi', email: 'batabudi@gmail.com', year: '2019', status: 1 },
  { id: '7', name: 'Toko Ikan Pak Budi', email: 'budi@gmail.com', year: '2023', status: 0 },
  { id: '8', name: 'Toko Baju Budi', email: 'batabudi@gmail.com', year: '2019', status: 1 },
  { id: '9', name: 'Toko Ikan Pak Budi', email: 'budi@gmail.com', year: '2023', status: 0 },
  { id: '10', name: 'Toko Baju Budi', email: 'batabudi@gmail.com', year: '2019', status: 1 }
];

console.log(units);


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

  const router = useRouter()

  const { themeStretch } = useSettings();

  const { vendors, isLoading, error, success } = useSelector((state) => state.vendor);
  const dispatch = useDispatch();

  const [filterName, setFilterName] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [isEdit, setEdit] = useState(false);
  const [alertDelete, setAlertDelete] = useState(null);
  const [totalPerPage, setTotalPerPage] = useState(10);

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
    router.push(`edit?id=${row.id}`);
    // setOpen(true);
    // setId(row.id);
    // setEdit(true);
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

  const handleChangeRowsPerPage = (event) => {
    setTotalPerPage(event.target.value);
    // reset page ke 1
    onChangePage(1);
  };

  return (
    <Page title="Unit Usaha: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flexGrow: 1 }}>
            <UserTableToolbarUnit
              filterName={filterName}
              onFilterName={setFilterName}
              handleInputChange={handleInputChange}
            />
            {/* <Breadcrumbs links={links} {...other} /> */}
          </Box>

          <StyledLoadingButton
            sx={{ width: 210, height: 48, backgroundColor: '#1078CA' }}
            variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}
            onClick={() => router.push('new')}
          >
            Tambah Unit Usaha
          </StyledLoadingButton>
        </Box>
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

        <Card sx={{ borderRadius: 2 }}>
          {/* <Scrollbar sx={{ overflowY: 'auto', height: 350  }}> */}
            <TableContainer sx={{ minWidth: 960, position: 'relative', borderRadius: 2, }}>
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
                  // onSelectAllRows={(checked) =>
                  //   onSelectAllRows(
                  //     checked,
                  //     vendors?.data.map((row) => row.id)
                  //   )
                  // }
                  sx={{ backgroundColor: '#F8F9F9', border: 1, borderRadius: 8, borderColor: '#EAEBEB' }}
                />

                <TableBody>
                  {!isLoading &&
                    units?.map((row, index) => (
                      <UserTableRowUnit
                        key={row.id}
                        row={row}
                        index={index}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row)}
                        onViewRow={() => handleViewRow(row)}
                        sx={{ backgroundColor: '#F8F9F9', border: 1, borderRadius: 8, borderColor: '#EAEBEB' }}
                      />
                    ))}

                  <TableEmptyRows emptyRows={emptyRows(page, rowsPerPage, vendors?.data.length)} />
                  {isLoading && <TableSkeleton />}
                  <TableNoData isNotFound={!vendors?.data} />
                </TableBody>
              </Table>
            </TableContainer>
          {/* </Scrollbar> */}
        </Card>

        <Box display="flex" justifyContent="space-between" sx={{ p: 3 }}>
          <FormControl>
            <Select
              value={totalPerPage}
              onChange={handleChangeRowsPerPage}
              displayEmpty
              inputProps={{ 'aria-label': 'Rows per page' }} aria-controls=''
              sx={{ height: 32, width: 70 }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
          <Pagination
            showFirstButton
            showLastButton
            variant="outlined"
            shape="rounded"
            color="primary"
            // count={vendors?.lastPage}
            count={10}
            rowsPerPage={vendors?.totalPerPage}
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
        {/* <ModalAddVendor open={isOpen} onClose={handleClose} id={id} refetch={fetchData} isEdit={isEdit} /> */}
        <AlertDeleteUnit open={!!alertDelete} onClose={() => setAlertDelete(null)} action={onDelete} />
      </Container>
    </Page>
  );
}
