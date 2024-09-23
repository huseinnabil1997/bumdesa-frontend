// @mui
import {
  Card,
  CardHeader,
  CardContent,
  TableContainer,
  Table,
  TableBody,
  Box,
  FormControl,
  Select,
  MenuItem,
  Pagination,
} from '@mui/material';
// components
import { useTheme } from '@emotion/react';
import { useGetManagers } from 'src/query/hooks/manager/useGetManagers';
import { useEffect } from 'react';
import { TableHeadCustom, TableNoData, TableSkeleton } from 'src/components/table';
import { UserTableRow } from '../manager';
import useTable from 'src/hooks/useTable';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Nama', align: 'left' },
  { id: 'position', label: 'Jabatan', align: 'left' },
  { id: 'phone', label: 'Nomor Telepon', align: 'left' },
  // { id: 'status', label: 'Action', align: 'center' },
];

export default function DashboardUnitManagerList({ unit, id }) {
  const {
    page,
    rowsPerPage,
    onChangeRowsPerPage,
    selected,
    onChangePage,
  } = useTable({ defaultCurrentPage: 1 });

  const theme = useTheme();

  const { data: managers, isLoading, refetch } = useGetManagers({
    page: page,
    limit: rowsPerPage,
    unit: unit,
    bumdesa_id: id,
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Card elevation={0} sx={{ border: `1px solid ${theme.palette.grey[300]}` }}>
      <CardHeader
        sx={{ p: 3, pb: 0 }}
        title={unit ? "Data Pengurus Unit Usaha" : "Data Pengurus BUM Desa"}
      />

      <CardContent>
        {!isLoading && managers && (
          <>
            <TableContainer sx={{ minWidth: 300, position: 'relative', borderRadius: 2, }}>

              <Table>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  rowCount={managers?.data?.length}
                  numSelected={selected.length}
                  sx={{ backgroundColor: '#F8F9F9', border: 1, borderRadius: 8, borderColor: '#EAEBEB' }}
                />

                <TableBody>
                  {!isLoading && managers &&
                    managers?.data?.map((row, index) => (
                      <UserTableRow
                        id={row.id}
                        key={row.id}
                        row={row}
                        index={index}
                        from="kanpus"
                        sx={{ backgroundColor: '#F8F9F9', border: 1, borderRadius: 8, borderColor: '#EAEBEB' }}
                      />
                    ))}
                  <TableNoData
                    isNotFound={(managers?.data?.length === 0 || managers?.data?.length === undefined) && !isLoading}
                    title={unit ? "Pengurus Unit Usaha belum tersedia." : "Pengurus BUM Desa belum tersedia."}
                  />
                  {isLoading && (<TableSkeleton />)}
                </TableBody>
              </Table>
            </TableContainer>
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
                count={managers?.metadata?.paging?.total_page}
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
          </>
        )}
      </CardContent>
    </Card>
  );
}
