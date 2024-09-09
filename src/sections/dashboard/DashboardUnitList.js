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
import { useEffect } from 'react';
import { TableHeadCustom, TableNoData, TableSkeleton } from 'src/components/table';
import { UserTableRow } from '../data-unit';
import useTable from 'src/hooks/useTable';
import { useGetListUnit } from 'src/query/hooks/data-unit/useGetListUnit';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Nama Unit Usaha', align: 'left' },
  { id: 'bumdesa_name', label: 'Nama BUMDesa', align: 'left' },
  { id: 'registration_date', label: 'Tahun Registrasi', align: 'left' },
  // { id: 'activation_status', label: 'Status Aktivasi BUMDesa', align: 'center' },
  { id: 'financial_status', label: 'Status Laporan Keuangan', align: 'center' },
  { id: 'profitability', label: 'Profitabilitas', align: 'left' },
  { id: 'liquidity', label: 'Liquiditas', align: 'left' },
  { id: 'solvency', label: 'Solvabilitas', align: 'left' },
  { id: 'total_omset', label: 'Total Omset', align: 'left' },
  { id: 'profit', label: 'Laba Rugi', align: 'left' },
  { id: 'cash_balance', label: 'Total Kas Tunai', align: 'left' },
  { id: 'detail', label: 'Detail', align: 'center' },
];

export default function DashboardUnitList({ id }) {
  const {
    page,
    rowsPerPage,
    onChangeRowsPerPage,
    selected,
    onChangePage,
  } = useTable({ defaultCurrentPage: 1 });

  const theme = useTheme();

  const { data: units, isLoading, refetch } = useGetListUnit({
    page: page,
    limit: rowsPerPage,
    bumdesa_id: id,
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Card elevation={0} sx={{ border: `1px solid ${theme.palette.grey[300]}` }}>
      <CardHeader
        sx={{ p: 3, pb: 0 }}
        title="Daftar Unit Usaha"
      />

      <CardContent>
        {!isLoading && units && (
          <>
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
                        disableDelete={units?.data.length === 1 && page === 1}
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
          </>
        )}
      </CardContent>
    </Card>
  );
}
