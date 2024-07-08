import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Avatar, Grid, Box, Skeleton, Rating, Stack } from '@mui/material';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StarIcon from '@mui/icons-material/Star';
import ReviewsList from './ReviewsList';

export default function CardDetail() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      <Card sx={{ padding: '24px', maxWidth: '626px' }}>
        <CardContent>
          {loading ? (
            <>
              <Skeleton variant="text" width="60%" height={40} />
              <Skeleton variant="text" width="40%" height={20} />
              <Skeleton variant="rectangular" width="100%" height={215} sx={{ my: '16px', borderRadius: '16px' }} />
              <Skeleton variant="text" width="80%" height={20} />
              <Skeleton variant="text" width="90%" height={20} />
              <Skeleton variant="text" width="70%" height={20} />
              <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: '8px', my: '16px' }} />
              <Skeleton variant="text" width="50%" height={30} />
              <Grid container spacing={1}>
                {Array.from(new Array(5)).map((_, index) => (
                  <Grid item xs={6} key={index}>
                    <Skeleton variant="text" width="80%" height={20} />
                  </Grid>
                ))}
              </Grid>
              <Skeleton variant="text" width="50%" height={30} sx={{ my: '16px' }} />
              <Grid container spacing={2}>
                {Array.from(new Array(2)).map((_, index) => (
                  <Grid item xs={12} key={index}>
                    <Skeleton variant="text" width="80%" height={20} />
                  </Grid>
                ))}
              </Grid>
              <Skeleton variant="text" width="50%" height={30} sx={{ mt: '16px' }} />
              <Box display="flex" alignItems="center" sx={{ marginTop: '8px', backgroundColor: '#F8F9F9', padding: '16px', borderRadius: '16px', maxWidth: 'fit-content' }}>
                <Skeleton variant="circular" width={52} height={52} />
                <Box ml={2}>
                  <Skeleton variant="text" width="60%" height={20} />
                  <Skeleton variant="text" width="40%" height={20} />
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography fontSize="24px" fontWeight={700} variant="h5" component="div">
                  Cara mengatur UMKM lokal
                </Typography>
                <Stack direction="row" alignItems="center">
                  <Rating
                    value={4 / 5}
                    max={5 / 5}
                    precision={0.01}
                    readOnly
                    size="large"
                    icon={<StarIcon sx={{ color: '#1078CA', fontSize: 'inherit', borderRadius: '50%' }} />}
                    emptyIcon={<StarIcon sx={{ color: '#BBDEFA', fontSize: 'inherit', borderRadius: '50%' }} />}
                  />
                  <Typography variant="body2" color="textSecondary" ml={0.5}>
                    4
                  </Typography>
                </Stack>
              </Box>
              <Typography fontWeight={400} fontSize="12px" color="text.secondary" display="flex" flexDirection="row" alignItems="center">
                3 Sep 2023
                <Avatar sx={{ bgcolor: '#BBDEFA', width: '10px', height: '10px', margin: '8px' }}>{' '}</Avatar>
                BUM Desa
              </Typography>
              <CardMedia
                component="img"
                height="215px"
                width="578px"
                image="https://via.placeholder.com/578x215" // Ganti dengan URL gambar yang sesuai
                alt="UMKM lokal"
                sx={{ my: '16px', borderRadius: '16px' }}
              />
              <Typography fontSize='16px' fontWeight={400} variant="body2" color="#292929" paragraph>
                Usaha Mikro, Kecil, dan Menengah (UMKM) memiliki peran vital dalam perekonomian lokal. Mereka menciptakan lapangan kerja, mendorong pertumbuhan ekonomi, dan menjadi tulang punggung perekonomian nasional. Namun, membangun dan mengembangkan UMKM yang sukses bukanlah hal yang mudah. Diperlukan strategi, perencanaan, dan kerja keras yang matang.
              </Typography>
              <StyledLoadingButton
                variant="contained"
                color="primary"
                sx={{ borderRadius: '8px', fontSize: '16px', fontWeight: 700, padding: '10px 16px' }}
                endIcon={<ArrowForwardIcon sx={{ width: '10px', height: '10px' }} />}
              >
                Lihat Modul
              </StyledLoadingButton>
              <Typography fontSize='20px' fontWeight={600} variant="h6" component="div" sx={{ my: '16px' }}>
                Poin Penting
              </Typography>
              <Grid container spacing={1}>
                {['Pahami Pasar dan Target Pelanggan', 'Buat Rencana Bisnis yang Jelas', 'Kelola Keuangan dengan Baik', 'Dapatkan Izin dan Perizinan yang Diperlukan', 'Bangun Jaringan dan Hubungan'].map((item, index) => (
                  <Grid item xs={6} key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <Box component="img" src="/icons/ic_dot_education.svg" alt="icon" style={{ marginRight: '8px' }} />
                    <Typography variant="body2" color="text.secondary">
                      {item}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Typography fontSize='20px' fontWeight={600} variant="h6" component="div" sx={{ my: '16px' }}>
                Untuk Kamu yang Ingin
              </Typography>
              <Grid container spacing={2}>
                {['Sukses di UMKM', 'Bisa bertahan jangka panjang pada UMKM'].map((item, index) => (
                  <Grid item xs={12} key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <Box component="img" src="/icons/ic_dot_education.svg" alt="icon" style={{ marginRight: '8px' }} />
                    <Typography variant="body2" color="text.secondary">
                      {item}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Typography fontSize='20px' fontWeight={600} variant="h6" component="div" sx={{ mt: '16px' }}>
                Penulis
              </Typography>
              <Box display="flex" alignItems="center" sx={{ marginTop: '8px', backgroundColor: '#F8F9F9', padding: '16px', borderRadius: '16px', maxWidth: 'fit-content' }}>
                <Avatar sx={{ width: '52px', height: '52px' }} alt="Angga Defano" src="https://via.placeholder.com/40" /> {/* Ganti dengan URL gambar yang sesuai */}
                <Box ml={2}>
                  <Typography fontSize='16px' fontWeight={600} variant="body2" color="text.primary">
                    Angga Defano
                  </Typography>
                  <Typography fontSize='14px' fontWeight={400} variant="body2" color="#292929">
                    UMKM Kuliner
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
      <ReviewsList />
    </Box>

  );
}