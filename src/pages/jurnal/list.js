import { useEffect, useState } from 'react';

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
import { JurnalHeader, TableRow } from 'src/sections/jurnal';
import { DEFAULT_FILTER, JURNAL_HEAD } from 'src/utils/constant';
import { useGetJurnals } from 'src/query/hooks/jurnals/useGetJurnals';
import { useTheme } from '@mui/material/styles';
import { StyledButton } from 'src/theme/custom/Button';
import { Add } from '@mui/icons-material';
import { useDeleteJurnal } from 'src/query/hooks/jurnals/useDeleteJurnal';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import TableError from 'src/components/table/TableError';

// ----------------------------------------------------------------------

JurnalList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function JurnalList() {
  const { page, onChangePage, setPage } = useTable({ defaultCurrentPage: 1 });

  const { themeStretch } = useSettings();
  const theme = useTheme();
  const router = useRouter();

  const [filter, setFilter] = useState(DEFAULT_FILTER);

  const { data, isLoading, isError, refetch } = useGetJurnals(filter);
  const { mutate: onDelete, isLoading: deleting } = useDeleteJurnal();

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
    router.push(`/jurnal/${row.id}`);
  };

  const methods = useForm({
    defaultValues: { date: null },
  });

  const { watch } = methods;

  const handleChangeFilter = () => {
    setPage(1);

    setFilter((prevState) => ({
      ...prevState,
      date: watch('date'),
      page: 1,
    }));
  };

  useEffect(() => {
    handleChangeFilter();
  }, [watch('date')]);

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <FormProvider methods={methods}>
          <JurnalHeader />
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
                  headLabel={JURNAL_HEAD}
                  rowCount={data?.length}
                  sx={{ background: theme.palette.grey[200] }}
                />

                <TableBody>
                  {!isLoading &&
                    data?.length > 0 &&
                    data.map((row, i) => (
                      <TableRow
                        key={row.id}
                        index={i}
                        row={row}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row)}
                      />
                    ))}

                  {isLoading && <TableSkeleton />}

                  {!data?.length > 0 && !isError && !isLoading && (
                    <TableNoData
                      title="Jurnal belum tersedia."
                      description="Silakan buat jurnal dengan klik tombol di bawah ini."
                      action={
                        <StyledButton
                          sx={{ mt: 2, width: 200 }}
                          variant="outlined"
                          startIcon={<Add fontSize="small" />}
                          onClick={() => router.push('/jurnal/create')}
                        >
                          Buat Jurnal
                        </StyledButton>
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

          {data?.length > 0 && (
            <Box display="flex" justifyContent="end" sx={{ p: 3 }}>
              <Pagination
                showFirstButton
                showLastButton
                color="primary"
                count={data?.lastPage}
                rowsPerPage={data?.totalPerPage}
                page={page}
                onChange={onChangePage}
              />
            </Box>
          )}
        </Card>
      </Container>
    </Page>
  );
}
