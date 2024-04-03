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
import useTable, { emptyRows } from '../../hooks/useTable';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSkeleton,
} from '../../components/table';
import AlertDeleteUnit from 'src/components/modal/DeleteUnit';
import { StyledButton, StyledLoadingButton } from 'src/theme/custom/Button';
// sections
import { UserTableToolbarUnit, UserTableRowUnit } from '../../sections/dashboard/unit';
import { useDispatch } from 'react-redux';
import { deleteVendor, resetMessage } from '../../redux/slices/vendor';
import axiosInstance from 'src/utils/axiosCoreService';
import { Add } from '@mui/icons-material';


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
    //
    selected,
    setSelected,
    onSelectRow,
    //
    onChangePage,
  } = useTable({ defaultCurrentPage: 1 });

  console.log('page', page, rowsPerPage);

  const router = useRouter()

  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const [units, setUnits] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [alertDelete, setAlertDelete] = useState(null);

  const fetchData = async (search) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/business-units', {
        params: {
          page: page,
          limit: rowsPerPage,
          search: search,
        }
      });
      setUnits(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log('error setUnits', error);
    }
  };


  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  const handleDeleteRow = (id, status) => {
    setAlertDelete({ id: id, status: status });
    setSelected([]);
  };

  const onDelete = () => {
    dispatch(deleteVendor(alertDelete));
    setAlertDelete(null);
    setTimeout(() => {
      dispatch(resetMessage());
    }, [3000]);
  };

  // const handleEditRow = (row) => {
  //   router.push(`editid=${row.id}`);
  //   setOpen(true);
  //   setId(row.id);
  //   setEdit(true);
  // };

  const handleViewRow = () => {
  };

  const handleInputChange = (event) => {
    if (event.key === 'Enter') {
      fetchData(filterName);
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
                      disableDelete={units?.data.length === 1}
                      onEditRow={() => router.push(`edit?id=${row.id}`)}
                      onViewRow={() => handleViewRow(row)}
                      sx={{ backgroundColor: '#F8F9F9', border: 1, borderRadius: 8, borderColor: '#EAEBEB' }}
                    />
                  ))}

                <TableEmptyRows emptyRows={emptyRows(page, rowsPerPage, units?.data?.length)} />
                {isLoading && <TableSkeleton />}
                <TableNoData
                  isNotFound={!units?.data}
                  title="Unit usaha belum tersedia."
                  description="Silakan tambah Unit usaha dengan klik tombol di bawah ini."
                  action={
                    <StyledButton
                      sx={{ mt: 2, width: 200 }}
                      variant="outlined"
                      startIcon={<Add fontSize="small" />}
                    >
                      Tambah Unit usaha
                    </StyledButton>
                  }
                />
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
