// @mui
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// hooks
import { useState, memo } from 'react';
import { useRouter } from 'next/router';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import useSettings from 'src/hooks/useSettings';
import { StyledButton } from 'src/theme/custom/Button';
import Image from 'src/components/Image';
import LinkUMKMDialog from 'src/sections/link-umkm/dialog';
import SuccessDialog from 'src/sections/link-umkm/successDialog';
import FailedDialog from 'src/sections/link-umkm/failedDialog';
import { useCreateLink } from 'src/query/hooks/link-umkm/useCreateLink';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

const handleClickOpen = (setOpen) => () => setOpen(true);
const handleClose = (setOpen) => () => setOpen(false);

const Link = memo(() => {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);

  const { mutate: onCreate, isLoading: creating } = useCreateLink();

  const handleSuccess = (responseLink) => {
    const { hot_link, token, user_fullname, user_email } = responseLink;

    try {
      const url = new URL(hot_link);
      url.searchParams.append('token', token);
      url.searchParams.append('user_fullname', user_fullname);
      url.searchParams.append('user_email', user_email);
      window.open(url.toString(), '_blank');
      setOpenSuccess(true);
    } catch (error) {
      enqueueSnackbar('URL tidak valid', { variant: 'error' });
      setOpenFailed(true);
    }
  };

  const handleAgree = async () => {
    onCreate({}, {
      onSuccess: (res) => {
        setTimeout(() => {
          handleSuccess(res?.data);
        }, 1000);
        enqueueSnackbar(res?.message);
      },
      onError: (err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
        setOpenFailed(true);
      },
    });
    setOpen(false);
  };

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ width: '65%' }}>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mt={5}>
          <Image src="/image/ilustrasi_link_umkm.png" alt="LinkUMKM" sx={{ width: 300, mb: 2 }} />
          <Typography fontSize={24} fontWeight={700} mb={3} variant="h4" gutterBottom>
            Menyambung Akun
          </Typography>
          <Typography fontSize={16} variant="body1" align="justify" fontWeight={400} color="text.secondary" paragraph>
            Untuk dapat menggunakan layanan LinkUMKM di BUM Desa, kami membutuhkan persetujuan Anda untuk mengirimkan data atau informasi pribadi Anda kepada BRI Research Institute ("BRIRINS"):
          </Typography>
          <Accordion sx={{ mb: 2, width: '100%', border: 1.5, borderColor: 'divider', borderRadius: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontSize={14} fontWeight={600}>Data atau Informasi apa yang akan dikirim?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography fontSize={12} color="text.secondary" fontWeight={400} variant="body2">
                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                  <Box component="li">Nama</Box>
                  <Box component="li">NIK</Box>
                  <Box component="li">Jenis Kelamin</Box>
                  <Box component="li">Alamat</Box>
                  <Box component="li">No. Handphone</Box>
                </Box>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ mb: 2, width: '100%', border: 1.5, borderColor: 'divider', borderRadius: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontSize={14} fontWeight={600}>Mengapa Kami membutuhkan Anda untuk mengirimkan data atau informasi Anda?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography fontSize={12} color="text.secondary" fontWeight={400} variant="body2">
                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                  <Box component="li">Sudah memiliki akun LinkUMKM: Melakukan verifikasi dan menyusun data atau informasi Akun LinkUMKM Anda</Box>
                  <Box component="li">Belum memiliki akun LinkUMKM: Melakukan pendaftaran akun LinkUMKM</Box>
                </Box>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Typography fontSize={16} variant="body1" align="left" fontWeight={400} color="text.secondary" paragraph sx={{ textAlign: 'left', width: '100%' }}>
            Klik "Sambungkan" untuk menghubungkan Akun Anda
          </Typography>
          <Box display="flex" justifyContent="center" sx={{ width: '100%', mt: 2 }}>
            <StyledButton variant="outlined" color="primary" sx={{ mr: 2, minWidth: 308, height: 48 }} onClick={() => router.back()}>
              Batal
            </StyledButton>
            <StyledButton variant="contained" color="primary" sx={{ minWidth: 308, height: 48 }} onClick={handleClickOpen(setOpen)}>
              Sambungkan
            </StyledButton>
          </Box>
        </Box>
      </Container>

      <LinkUMKMDialog open={open} onClose={handleClose(setOpen)} onAgree={handleAgree} loading={creating} />
      <SuccessDialog
        open={openSuccess}
        onClose={() => {
          setOpenSuccess(false);
          router.push('/dashboard');
        }}
      />
      <FailedDialog open={openFailed} onRetry={handleAgree} onClose={() => setOpenFailed(false)} loading={creating} />
    </Page>
  );
});

Link.getLayout = function getLayout(page) {
  return <Layout title="Permberdayaan UMKM">{page}</Layout>;
};

export default Link;