import { useState } from 'react';

// @mui
import { Box, Card, Table, TableBody, Container, TableContainer, Pagination } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
import useTable from '../../hooks/useTable';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import { TableHeadCustom, TableNoData, TableSkeleton } from '../../components/table';
import AlertDeleteVendor from '../../components/modal/DeleteVendor';
// sections
import { UserTableRow } from '../../sections/@dashboard/user/list';
import { FormProvider } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { JurnalHeader } from 'src/sections/jurnal';
import { JURNAL_HEAD } from 'src/utils/constant';
import { useGetJurnals } from 'src/query/hooks/jurnals/useGetJurnals';
import { useTheme } from '@mui/material/styles';
import { StyledButton } from 'src/theme/custom/Button';
import { Add } from '@mui/icons-material';

// ----------------------------------------------------------------------

JurnalList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function JurnalList() {
  const { page, onChangePage } = useTable({ defaultCurrentPage: 1 });

  const { themeStretch } = useSettings();
  const theme = useTheme();

  const { data, isLoading } = useGetJurnals();

  const [filterName, setFilterName] = useState('');
  const [alertDelete, setAlertDelete] = useState(null);

  const handleDeleteRow = (id) => {};

  const handleEditRow = (row) => {};

  const handleViewRow = (row) => {};

  const methods = useForm({
    defaultValues: { unit: null, year: null },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <JurnalHeader />
        </FormProvider>
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
                    data.map((row, i) => (
                      <UserTableRow
                        key={row.id}
                        index={i}
                        row={row}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row)}
                        onViewRow={() => handleViewRow(row)}
                      />
                    ))}

                  {isLoading && <TableSkeleton />}
                  {!data?.length > 0 && (
                    <TableNoData
                      title="Jurnal belum tersedia."
                      description="Silakan buat jurnal dengan klik tombol di bawah ini."
                      action={
                        <StyledButton
                          sx={{ mt: 2, width: 200 }}
                          variant="outlined"
                          startIcon={<Add fontSize="small" />}
                        >
                          Buat Jurnal
                        </StyledButton>
                      }
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
        <AlertDeleteVendor open={!!alertDelete} onClose={() => setAlertDelete(null)} />
      </Container>
    </Page>
  );
}
