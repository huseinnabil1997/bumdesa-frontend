import { useState } from 'react';
// @mui
import {
  Card,
  Container,
  Box,
  CircularProgress,
  Divider,
  TableContainer,
  Table,
  TableBody,
  Pagination,
  IconButton,
  Typography,
  Stack,
} from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import { FormProvider, RHFUploadSingleFile } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { BtnLightPrimary, StyledLoadingButton } from 'src/theme/custom/Button';
import { ArrowBackOutlined } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { jurnalBulkDefaultValues, jurnalBulkSchema } from 'src/sections/jurnal/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import Iconify from 'src/components/Iconify';
import { handleDrop } from 'src/utils/helperFunction';
import Scrollbar from 'src/components/Scrollbar';
import { TableError, TableHeadCustom, TableNoData, TableSkeleton } from 'src/components/table';
import useTable from 'src/hooks/useTable';
import { useGetJurnals } from 'src/query/hooks/jurnals/useGetJurnals';
import { JURNAL_HEAD } from 'src/utils/constant';
import { TableRow } from 'src/sections/jurnal';
import BulkModal from 'src/sections/jurnal/BulkModal';
import { useSnackbar } from 'notistack';
import { useDownloadJurnalTemplate } from 'src/query/hooks/jurnals/useDownloadJurnalTemplate';
import onDownload from 'src/utils/onDownload';

// ----------------------------------------------------------------------

JurnalBulkCreate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function JurnalBulkCreate() {
  const { page, onChangePage } = useTable({ defaultCurrentPage: 1 });

  const { themeStretch } = useSettings();

  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();

  const router = useRouter();

  const { mutate: download, isLoading: isDownloading } = useDownloadJurnalTemplate();

  const { data, isLoading, isError } = useGetJurnals({
    limit: 10,
    page,
    start_date: '2025-01-01',
    end_date: '2025-01-31',
  });

  const [fileRejections, setFileRejections] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const methods = useForm({
    resolver: yupResolver(jurnalBulkSchema),
    defaultValues: jurnalBulkDefaultValues,
    mode: 'onChange',
  });

  const { handleSubmit, watch, setValue } = methods;

  const onSubmit = async (data) => {
    console.log(data);
    handleOpen();
  };

  const handleBack = () => router.back();

  const handleCancelUpload = () => {
    setValue('file', null);
  };

  const handleDownload = () => {
    const payload = {
      type: 4,
    };

    download(payload, {
      onSuccess: (res) => {
        console.log('res = ', res)
        enqueueSnackbar('Sedang mengunduh...', { variant: 'warning' });
        onDownload({
          file: res,
          title: 'Template Jurnal',
          type: 4,
        });
        setOpen(false);
      },
      onError: () => {
        enqueueSnackbar('Gagal mengunduh!', { variant: 'error' });
      },
    });
  };

  console.log('file upload = ', watch('file'))

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <BtnLightPrimary
              variant="contained"
              startIcon={<ArrowBackOutlined />}
              onClick={handleBack}
            >
              Kembali
            </BtnLightPrimary>
            <StyledLoadingButton
              variant="outlined"
              disabled={isDownloading}
              endIcon={
                isDownloading ? (
                  <CircularProgress size="1rem" />
                ) : (
                  <Iconify width={14} height={14} icon={'bi:download'} />
                )
              }
              onClick={handleDownload}
            >
              Unduh Template Jurnal
            </StyledLoadingButton>
          </Box>
          <Card sx={{ mt: 3, border: fileRejections.length > 0 ? `1px solid ${theme.palette.error.main}` : `1px solid ${theme.palette.grey[300]}` }}>
            {watch('file') ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
                <Typography fontWeight={600} fontSize={22}>
                  Pratinjau Dokumen Jurnal
                </Typography>
                <Card elevation={3}>
                  <Card sx={{ m: 3, minWidth: 864 }} elevation={3}>
                    <Scrollbar>
                      <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
                        <Table>
                          <TableHeadCustom
                            headLabel={JURNAL_HEAD}
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
                                // onDeleteRow={() => handleDeleteRow(row.id)}
                                // onEditRow={() => handleEditRow(row)}
                                />
                              ))}

                            {isLoading && <TableSkeleton />}

                            {!data?.journals?.length > 0 && !isError && !isLoading && (
                              <TableNoData
                                isNotFound
                                title="Jurnal belum tersedia."
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
                  <Divider
                    sx={{
                      width: '100%',
                      borderStyle: 'dashed',
                      my: 2,
                      borderWidth: '1px',
                      borderColor: '#EAEBEB',
                    }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pl: 1, border: `1px solid ${theme.palette.grey[300]}`, borderRadius: 1, mb: 3 }}>
                      <Typography fontWeight={500} fontSize={12} color={theme.palette.grey[500]}>
                        {watch('file')?.name} ({(watch('file')?.size / 1000000).toFixed(3)} MB)
                      </Typography>
                      <IconButton onClick={handleCancelUpload}>
                        <Iconify icon="material-symbols-light:close" sx={{ fontSize: 16, color: 'red', cursor: 'pointer' }} />
                      </IconButton>
                    </Box>
                  </Box>
                </Card>
                <Divider sx={{ width: '100%', my: 2 }} />
                <Stack alignSelf="flex-end" mx={3}>
                  <StyledLoadingButton
                    variant="contained"
                    sx={{ width: 200, height: 42 }}
                    type="submit"
                  >
                    Simpan
                  </StyledLoadingButton>
                </Stack>
              </Box>
            ) : (
              <Box>
                <RHFUploadSingleFile
                  name="file"
                  onFileRejections={(fileRejections) => {
                    setFileRejections(fileRejections);
                  }}
                  onDrop={(file) => handleDrop(file, (val) => { setValue(`file`, val) })}
                />
              </Box>
            )}
          </Card>
        </FormProvider>
      </Container>
      <BulkModal open={open} handleClose={handleClose} />
    </Page>
  );
}