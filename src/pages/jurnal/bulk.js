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
  IconButton,
  Typography,
  Stack,
  Modal,
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
import { JURNAL_BULK_HEAD } from 'src/utils/constant';
import { TableRowBulk } from 'src/sections/jurnal';
import { useSnackbar } from 'notistack';
import { useDownloadJurnalTemplate } from 'src/query/hooks/jurnals/useDownloadJurnalTemplate';
import onDownload from 'src/utils/onDownload';
import { useUploadJurnals } from 'src/query/hooks/jurnals/useUploadJurnals';
import { useSubmitJurnals } from 'src/query/hooks/jurnals/useSubmitJurnals';
import { LoadingButton } from '@mui/lab';
import { useDownloadJurnalPreview } from 'src/query/hooks/jurnals/useDownloadJurnalPreview';
import BulkModal from 'src/sections/jurnal/BulkModal';
import BulkModalSuccess from 'src/sections/jurnal/BulkModalSuccess';
import onPreview from 'src/utils/onPreview';
import { useSystemFlag } from 'src/query/hooks/jurnals/useSystemFlag';

// ----------------------------------------------------------------------

JurnalBulkCreate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function JurnalBulkCreate() {
  const { themeStretch } = useSettings();

  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();

  const router = useRouter();

  const [isUploadSuccess, setUploadSuccess] = useState(false);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [data, setData] = useState([]);
  const [linkPreview, setLinkPreview] = useState('');
  const [isTutorialModalOpen, setIsTutorialModalOpen] = useState(false);

  const { mutate: download, isLoading: downloading } = useDownloadJurnalTemplate();
  const { mutate: downloadPreview, isLoading: downloadingPreview } = useDownloadJurnalPreview();
  const { mutate: upload, isLoading: uploading, isError } = useUploadJurnals();
  const { mutate: submit, isLoading: submitting } = useSubmitJurnals();
  const { data: systemFlag } = useSystemFlag();

  const [fileRejections, setFileRejections] = useState([]);

  const methods = useForm({
    resolver: yupResolver(jurnalBulkSchema),
    defaultValues: jurnalBulkDefaultValues,
    mode: 'onChange',
  });

  const { handleSubmit, watch, setValue } = methods;

  const onSubmit = async () => {
    const uploadId = data[0]?.id_upload;
    submit(uploadId, {
      onSuccess: (res) => {
        enqueueSnackbar(res?.message ?? 'Berhasil melakukan bulk upload', { variant: 'success' });
        setUploadSuccess(true);
        handleCancelUpload();
      },
      onError: (err) => {
        enqueueSnackbar(err?.message ?? 'Gagal melakukan bulk upload', { variant: 'error' });
      },
    });
  };

  const handleBack = () => router.back();

  const handleCancelUpload = () => {
    setUploadProgress(0);
    setData([]);
    setValue('file', null);
  };

  const handleDownload = (type) => {
    const payload = {
      type: type,
    };

    download(payload, {
      onSuccess: (res) => {
        enqueueSnackbar('Sedang mengunduh...', { variant: 'success' });
        type === 2 
        ? onDownload({ file: res, title: 'Template Jurnal', type: type })
        : onPreview({ file: res, type: type })
      },
      onError: () => {
        enqueueSnackbar('Gagal mengunduh!', { variant: 'error' });
      },
    });
  };

  const handleDownloadPreview = () => {
    downloadPreview(linkPreview, {
      onSuccess: (res) => {
        enqueueSnackbar('Sedang mengunduh...', { variant: 'success' });
        onDownload({
          file: res,
          title: 'Template Jurnal',
          type: 2,
        });
      },
      onError: () => {
        enqueueSnackbar('Gagal mengunduh!', { variant: 'error' });
      },
    });
  };

  const onDrop = (file) => {
    setValue(`file`, file);
    setUploadProgress(0);
    const payload = {
      up: setUploadProgress,
      file,
    };

    upload(payload, {
      onSuccess: (res) => {
        setData(res.data);
        setLinkPreview(res.metadata?.file);
      },
      onError: (err) => {
        console.log(err.message);
        enqueueSnackbar(err.message, { variant: 'error' });
      },
    });
  };

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <>
              <BtnLightPrimary
                variant="contained"
                startIcon={<ArrowBackOutlined />}
                onClick={handleBack}
              >
                Kembali
              </BtnLightPrimary>
            </>
            <Stack direction="row" spacing={2}>
              <StyledLoadingButton
                variant="outlined"
                disabled={downloading || !systemFlag?.data?.Setting}
                endIcon={
                  downloading ? (
                    <CircularProgress size="1rem" />
                  ) : (
                    <Iconify icon={'lets-icons:lamp'} />
                  )
                }
                onClick={() => systemFlag?.data?.Setting === 'pdf' ? handleDownload(1) : setIsTutorialModalOpen(true)}
              >
                Panduan Unggah Jurnal
              </StyledLoadingButton>
              <StyledLoadingButton
                variant="outlined"
                disabled={downloading}
                endIcon={
                  downloading ? (
                    <CircularProgress size="1rem" />
                  ) : (
                    <Iconify width={14} height={14} icon={'bi:download'} />
                  )
                }
                onClick={() => handleDownload(2)}
              >
                Unduh Template Jurnal
              </StyledLoadingButton>
            </Stack>
          </Box>
          <Card
            sx={{
              mt: 3,
              border:
                fileRejections.length > 0 || isError
                  ? `1px solid ${theme.palette.error.main}`
                  : `1px solid ${theme.palette.grey[300]}`,
            }}
          >
            {uploadProgress === 100 && data?.length > 0 ? (
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
                            headLabel={JURNAL_BULK_HEAD}
                            rowCount={data?.journals?.length}
                            sx={{ background: theme.palette.grey[200] }}
                          />

                          <TableBody>
                            {!uploading &&
                              data?.length > 0 &&
                              data?.map((row, i) => (
                                <TableRowBulk key={row.id} index={i} row={row} />
                              ))}

                            {uploading && <TableSkeleton />}

                            {!data?.length > 0 && !isError && !uploading && (
                              <TableNoData isNotFound title="Jurnal belum tersedia." />
                            )}

                            {!uploading && isError && (
                              <TableError
                                title="Upload Gagal"
                                description="Silakan cek file atau koneksi Anda dan muat ulang halaman."
                              />
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Scrollbar>
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
                  {watch('file') && (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          pl: 1,
                          border: `1px solid ${theme.palette.grey[300]}`,
                          borderRadius: 1,
                          mb: 3,
                          mr: 1,
                        }}
                      >
                        <Typography fontWeight={500} fontSize={12} color={theme.palette.grey[500]}>
                          {watch('file')?.name} ({(watch('file')?.size / 1000000).toFixed(3)} MB)
                        </Typography>
                        <IconButton onClick={handleCancelUpload}>
                          <Iconify
                            icon="material-symbols-light:close"
                            sx={{ fontSize: 16, color: 'red', cursor: 'pointer' }}
                          />
                        </IconButton>
                      </Box>
                      {linkPreview && (
                        <LoadingButton
                          loading={downloadingPreview}
                          onClick={handleDownloadPreview}
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            pl: 1,
                            border: `1px solid #1877F2`,
                            borderRadius: 1,
                            mb: 3,
                            ml: 1,
                          }}
                        >
                          <Typography fontWeight={500} fontSize={12} sx={{ color: '#1877F2' }}>
                            Unduh Dokumen
                          </Typography>
                          <Iconify
                            icon="eva:download-fill"
                            sx={{ fontSize: 16, color: '#1877F2', cursor: 'pointer', ml: 1 }}
                          />
                        </LoadingButton>
                      )}
                    </Box>
                  )}
                </Card>
                <Divider sx={{ width: '100%', my: 2 }} />
                <Stack alignSelf="flex-end" mx={3}>
                  <StyledLoadingButton
                    variant="contained"
                    sx={{ width: 200, height: 42 }}
                    type="submit"
                    disabled={data?.length === 0 || linkPreview}
                    loading={submitting}
                  >
                    Simpan
                  </StyledLoadingButton>
                </Stack>
              </Box>
            ) : (
              <Box>
                <RHFUploadSingleFile
                  uploadProgress={uploadProgress}
                  name="file"
                  onFileRejections={(fileRejections) => {
                    setFileRejections(fileRejections);
                  }}
                  onDrop={(file) =>
                    handleDrop(file, (val) => {
                      onDrop(val);
                    })
                  }
                  isError={isError}
                />
              </Box>
            )}
          </Card>
        </FormProvider>
      </Container>
      <BulkModal open={submitting} />
      <BulkModalSuccess
        open={isUploadSuccess}
        handleClose={() => setUploadSuccess(false)}
        action={() => router.push('/jurnal')}
      />
      <Modal
        open={isTutorialModalOpen}
        onClose={() => setIsTutorialModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 20 }}
      >
        <Box sx={{ position: 'relative', width: '100%' }}>
          <IconButton
            onClick={() => setIsTutorialModalOpen(false)}
            sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1000 }}
          >
            <Iconify icon="eva:close-fill" />
          </IconButton>
          <video width="100%" controls>
            <source src={`${process.env.NEXT_PUBLIC_BUMDESA_ASSET}/tutorial/tutorial.mp4`} type="video/mp4" />
            Browser Anda tidak mendukung video.
          </video>
        </Box>
      </Modal>
    </Page>
  );
}
