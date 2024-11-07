// @mui
import { Container, Typography, CardMedia, Box, Button, MobileStepper, Slide } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
// hooks
import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import useSettings from 'src/hooks/useSettings';
import { StyledButton } from 'src/theme/custom/Button';

// ----------------------------------------------------------------------

LinkUmkm.getLayout = function getLayout(page) {
  return <Layout title="Pemberdayaan UMKM">{page}</Layout>;
};

// ----------------------------------------------------------------------

const steps = [
  {
    image: "/image/umkm_smart.png",
    alt: "Scoring UMKM Naik Kelas",
    title: "Scoring UMKM Naik Kelas",
    description: "Naik Kelas Bersama Skoring UMKM. Temukan potensi yang belum tergali dan ambil langkah pertama menuju pertumbuhan yang lebih besar."
  },
  {
    image: "/image/modul_pembelajaran.png",
    alt: "Modul Pembelajaran UMKM",
    title: "Modul Pembelajaran UMKM",
    description: "Temukan materi-materi yang relevan, tingkatkan keterampilan Anda, dan terapkan pengetahuan baru Anda untuk mengambil langkah-langkah cerdas dalam bisnis UMKM Anda"
  },
  {
    image: "/image/media_pelatihan.png",
    alt: "⁠Video Pelatihan UMKM",
    title: "⁠Video Pelatihan UMKM",
    description: "Dapatkan Informasi Terkini dan Berita Menarik seputar Dunia UMKM. Jadilah yang terdepan dalam dunia UMKM dengan pengetahuan dan informasi terkini dari LinkUMKM"
  },
  {
    image: "/image/komunitas.png",
    alt: "⁠Komunitas UMKM",
    title: "⁠Komunitas UMKM",
    description: "Temui seseorang dengan hobi atau profesi yang sama, setelah itu menjadi teman, sahabat dan keluarga, bersama komunitas LinkUMKM"
  },
  {
    image: "/image/keahlian.png",
    alt: "Coaching Clinic dengan Expert",
    title: "Coaching Clinic dengan Expert",
    description: "Temukan Solusi Cerdas untuk meningkatkan keberhasilan Bisnis UMKM Anda. Jadilah pemilik Bisnis yang cerdas dengan Link UMKM"
  },
];

const maxSteps = steps.length;

export default function LinkUmkm() {
  const { themeStretch } = useSettings();
  const [activeStep, setActiveStep] = useState(0);
  const [slideDirection, setSlideDirection] = useState('left');
  const [key, setKey] = useState(0);
  const router = useRouter();

  const handleStepChange = useCallback((direction) => {
    setSlideDirection(direction);
    setActiveStep((prevActiveStep) => prevActiveStep + (direction === 'left' ? 1 : -1));
    setKey((prevKey) => prevKey + 1);
  }, []);

  const currentStep = useMemo(() => steps[activeStep], [activeStep]);

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflowX: 'hidden' }}>
          <Button onClick={() => handleStepChange('right')} disabled={activeStep === 0} variant="outlined" sx={{ width: 48, height: 48, borderRadius: 2, pt: 3.5, pb: 3.5 }}>
            <ChevronLeft sx={{ fontSize: 48 }} />
          </Button>
          <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection="column" width="50%" margin={5} height="69vh">
            <Slide key={key} direction={slideDirection} in mountOnEnter unmountOnExit timeout={300}>
              <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <CardMedia component="img" image={currentStep.image} alt={currentStep.alt} sx={{ width: '100%', maxWidth: 300, maxHeight: 260, marginBottom: 5 }} />
                <Typography variant="h6" align="center" gutterBottom>{currentStep.title}</Typography>
                <Typography variant="body2" align="center">{currentStep.description}</Typography>
              </Box>
            </Slide>
            <Box display="flex" justifyContent="center" sx={{ width: '100%', maxWidth: 400, mt: 2 }}>
              <MobileStepper
                variant="dots"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                sx={{
                  '& .MuiMobileStepper-dot': { borderRadius: 4, width: 16, height: 8, margin: '0 4px' },
                  '& .MuiMobileStepper-dotActive': { backgroundColor: 'primary.main' },
                }}
              />
            </Box>
          </Box>
          <Button onClick={() => handleStepChange('left')} disabled={activeStep === maxSteps - 1} variant="outlined" sx={{ width: 48, height: 48, borderRadius: 2, pt: 3.5, pb: 3.5 }}>
            <ChevronRight sx={{ fontSize: 48 }} />
          </Button>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <StyledButton onClick={() => router.push('/link-umkm/link')} variant="contained" color="primary" sx={{ width: 240, height: 48 }}>
            Lanjutkan
          </StyledButton>
        </Box>
      </Container>
    </Page>
  );
}