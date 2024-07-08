import React, { useState, useEffect } from 'react';
import { Grid, Box, TablePagination, Pagination, PaginationItem, Skeleton } from '@mui/material';
import EducationCard from './Card';
import { styled } from '@mui/system';
import Filter from './Filter';
import { TableNoData } from 'src/components/table';

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: theme.spacing(2),
}));

const StyledPagination = styled(Pagination)(() => ({
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
}));

const StyledTablePagination = styled(TablePagination)(() => ({
  '& .MuiTablePagination-toolbar': {
    justifyContent: 'flex-end',
  },
  '& .MuiTablePagination-selectLabel, & .MuiTablePagination-input, & .MuiTablePagination-displayedRows': {
    color: '#1078CA',
  },
  '& .MuiTablePagination-actions': {
    color: '#1078CA',
  },
  '& .MuiTablePagination-actions button': {
    border: '1px solid #1078CA',
    borderRadius: '8px',
    padding: '3px',
    margin: '5px',
  },
  '& .MuiTablePagination-actions .MuiSvgIcon-root': {
    color: '#1078CA',
  },
  '& .MuiSelect-select': {
    color: '#000000', // Mengubah warna teks pada opsi rowsPerPage menjadi hitam
    borderColor: '#1078CA', // Mengubah warna border pada opsi rowsPerPage
  },
  '& .MuiSelect-icon': {
    color: '#1078CA', // Mengubah warna ikon dropdown pada opsi rowsPerPage
  },
  '& .MuiMenuItem-root': {
    color: '#000000', // Mengubah warna teks pada item menu menjadi hitam
  },
}));

export default function EducationList({ data }) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [selected, setSelected] = React.useState('Pelatihan Umum');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 detik
    return () => clearTimeout(timer);
  }, []);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Filter selected={selected} setSelected={setSelected} />
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {loading ? (
          Array.from(new Array(rowsPerPage)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: '16px' }} />
            </Grid>
          ))
        ) : (
          data.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <EducationCard content={item} />
            </Grid>
          ))
        )}
        {data?.length === 0 && (
          <Grid item xs={12} alignItems="center" justifyContent="center" display="flex">
            <TableNoData
              isNotFound={data?.length === 0}
              title="Konten Edukasi belum tersedia."
              sx={{ display: 'flex', justifyContent: 'center' }}
            />
          </Grid>
        )}
      </Grid>
      <PaginationContainer>
        <StyledPagination
          count={Math.ceil(data.length / rowsPerPage)}
          page={page}
          variant="outlined"
          shape="rounded"
          color="primary"
          onChange={handleChangePage}
          renderItem={(item) => (
            <PaginationItem
              {...item}
            />
          )}
        />
        <StyledTablePagination
          component="div"
          count={data.length}
          page={page - 1}
          onPageChange={(event, newPage) => handleChangePage(event, newPage + 1)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[6, 12, 24]}
        />
      </PaginationContainer>
    </Box>
  );
};