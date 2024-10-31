import { useEffect, useMemo } from 'react';

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
import { JURNAL_HEAD, JURNAL_HEAD_PENGAWAS } from 'src/utils/constant';
import { useGetJurnals } from 'src/query/hooks/jurnals/useGetJurnals';
import { useTheme } from '@mui/material/styles';
import { StyledButton } from 'src/theme/custom/Button';
import { Add } from '@mui/icons-material';
import { useDeleteJurnal } from 'src/query/hooks/jurnals/useDeleteJurnal';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import TableError from 'src/components/table/TableError';
import moment from 'moment';
import { defaultRangeDate, end_date, start_date } from 'src/utils/helperFunction';
import { debounce } from 'lodash';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

JurnalList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function JurnalList() {
  const userData = useSelector((state) => state.user.userData);
  const { page, onChangePage, setPage } = useTable({ defaultCurrentPage: 1 });

  const { themeStretch } = useSettings();
  const theme = useTheme();
  const router = useRouter();

  const methods = useForm({
    defaultValues: { start_date: start_date, end_date: end_date, search: '' },
    mode: 'onChange',
  });

  const { watch, setValue } = methods;

  const search = watch('search');

  const { data, isLoading, isError, refetch } = useGetJurnals({
    limit: 10,
    page,
    start_date: moment(watch('start_date')).format('yyyy-MM-DD') ?? null,
    end_date: moment(watch('end_date')).format('yyyy-MM-DD') ?? null,
    search,
  });

  const debounceRefetch = useMemo(() => debounce((search) => refetch({ search }), 1000), []);

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

  useEffect(() => {
    setPage(1);
    refetch();
    defaultRangeDate(
      moment(watch('start_date')).format('yyyy-MM-DD'),
      moment(watch('end_date')).format('yyyy-MM-DD')
    );

    if (!watch('start_date') && !watch('end_date')) {
      setValue('start_date', start_date);
      setValue('end_date', end_date);
    }
  }, [watch('start_date'), watch('end_date')]);

  useEffect(() => {
    onChangePage(null, 1);
    debounceRefetch(search);
  }, [search, debounceRefetch]);

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <FormProvider methods={methods}>
          <JurnalHeader
            value={search}
            isEmpty={data?.journals?.length === 0}
            filter={{
              page,
              start_date: moment(watch('start_date')).format('yyyy-MM-DD') ?? null,
              end_date: moment(watch('end_date')).format('yyyy-MM-DD') ?? null,
            }}
          />
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
                  headLabel={userData?.role !== 4 ? JURNAL_HEAD : JURNAL_HEAD_PENGAWAS}
                  rowCount={data?.journals?.length}
                  sx={{ background: theme.palette.grey[200] }}
                />

                <TableBody>
                  {!isLoading &&
                    data?.journals?.length > 0 &&
                    data?.journals.map((row, i) => (
                      <TableRow
                        key={row.id}
                        index={i}
                        row={row}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row)}
                      />
                    ))}

                  {isLoading && <TableSkeleton />}

                  {!data?.journals?.length > 0 && !isError && !isLoading && (
                    <TableNoData
                      isNotFound
                      title="Jurnal belum tersedia."
                      description={
                        userData?.role !== 4
                          ? 'Silakan buat jurnal dengan klik tombol di bawah ini.'
                          : 'Silahkan tunggu sampai jurnal tersedia.'
                      }
                      action={
                        userData?.role !== 4 && (
                          <StyledButton
                            sx={{ mt: 2, width: 200 }}
                            variant="outlined"
                            startIcon={<Add fontSize="small" />}
                            onClick={() => router.push('/jurnal/create')}
                          >
                            Buat Jurnal
                          </StyledButton>
                        )
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

          {data?.journals?.length > 0 && (
            <Box display="flex" justifyContent="end" sx={{ p: 3 }}>
              <Pagination
                showFirstButton
                showLastButton
                color="primary"
                count={data?.page?.total_page}
                rowsPerPage={data?.page?.limit}
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
