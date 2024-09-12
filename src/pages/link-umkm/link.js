// @mui
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// hooks
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import useSettings from 'src/hooks/useSettings';
import { StyledButton } from 'src/theme/custom/Button';
import Image from 'src/components/Image';

// ----------------------------------------------------------------------

Link.getLayout = function getLayout(page) {
  return <Layout title="BUM Desa X LinkUMKM">{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function Link() {
  const { themeStretch } = useSettings();

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mt={5}>
          <Image src="/image/ilustrasi_link_umkm.png" alt="LinkUMKM" style={{ width: '150px', marginBottom: '20px' }} />
          <Typography variant="h4" gutterBottom>
            Menyambung Akun
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Untuk dapat menggunakan layanan LinkUMKM di SenyuM, kami membutuhkan persetujuan Anda untuk mengirimkan data atau informasi pribadi Anda kepada BRI Research Institute ("BRIIRINS"):
          </Typography>
          <Accordion sx={{ mb: 2, width: '100%' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Data atau Informasi apa yang akan dikirim?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                - Nama<br />
                - NIK<br />
                - Jenis Kelamin<br />
                - Alamat<br />
                - No. Handphone
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ mb: 2, width: '100%' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Mengapa Kami membutuhkan Anda untuk mengirimkan data atau informasi Anda?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                - Sudah memiliki akun LinkUMKM: Melakukan verifikasi dan menyusun data atau informasi Akun LinkUMKM Anda<br />
                - Belum memiliki akun LinkUMKM: Melakukan pendaftaran akun LinkUMKM
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Box display="flex" justifyContent="center" sx={{ width: '100%', mt: 2 }}>
            <StyledButton variant="outlined" color="primary" sx={{ mr: 2 }}>
              Batal
            </StyledButton>
            <StyledButton variant="contained" color="primary">
              Sambungkan
            </StyledButton>
          </Box>
        </Box>
      </Container>
    </Page>
  );
}