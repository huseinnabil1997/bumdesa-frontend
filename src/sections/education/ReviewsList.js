import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Avatar, Grid, Box, Skeleton } from '@mui/material';
import { Star } from '@mui/icons-material';
import { StyledLoadingButton } from 'src/theme/custom/Button';

const reviews = [
  {
    rating: 4,
    date: '12 Okt 2023',
    title: 'Mudah Digunakan',
    content: 'Kelola keuangan BUMDesa/BUMDesa Bersama dengan mudah dan transparan! Dapatkan aplikasi pencatatan dan pelaporan keuangan yang terintegrasi dan mudah digunakan.',
    author: 'Aditya Sunaryo',
    position: 'Bum Desa Desa Jaya Makmur',
    avatar: 'path/to/avatar1.jpg'
  },
  {
    rating: 5,
    date: '8 Okt 2023',
    title: 'Sangat Akurat',
    content: 'Tingkatkan akuntabilitas dan profesionalisme BUMDesa/BUMDesa Bersama dengan sistem pencatatan dan pelaporan keuangan yang akurat dan terpercaya.',
    author: 'Putri Kinar',
    position: 'Bum Desa Desa Suka Maju',
    avatar: 'path/to/avatar2.jpg'
  },
  {
    rating: 4,
    date: '28 Sep 2023',
    title: 'Efektif',
    content: 'Wujudkan pengelolaan keuangan BUMDesa/BUMDesa Bersama yang efektif dan efisien dengan menggunakan software akuntansi yang tepat.',
    author: 'Jaya Maroni',
    position: 'Bum Desa Desa Sumber Kencana',
    avatar: 'path/to/avatar3.jpg'
  },
  {
    rating: 5,
    date: '3 Sep 2023',
    title: 'Lebih Cepat dan Mudah',
    content: 'Hilangkan kerumitan pencatatan keuangan manual dan buat laporan keuangan BUMDesa/BUMDesa Bersama lebih cepat dan mudah.',
    author: 'Farel Pahlevi',
    position: 'Bum Desa Desa Sukabumi',
    avatar: 'path/to/avatar4.jpg'
  }
];

const ReviewsList = () => {
  const [filter, setFilter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const filteredReviews = filter ? reviews.filter(review => review.rating === filter) : reviews;

  return (
    <Card sx={{ padding: '24px', maxWidth: '626px' }}>
      <CardContent>
        <Typography fontSize='20px' fontWeight={600} variant="h5" gutterBottom>Mereka yang Telah Terbantu</Typography>
        <Typography my={2} fontSize='14px' fontWeight={400} variant="subtitle1" gutterBottom>Ulasan dari mereka yang telah bergabung dikelas ini</Typography>
        <Box display="flex" marginBottom="20px" flexWrap="wrap">
          <StyledLoadingButton
            onClick={() => setFilter(null)}
            style={{
              backgroundColor: filter === null ? '#1078CA' : '#F8F9F9',
              color: filter === null ? '#FFFFFF' : '#000000',
              marginRight: '10px',
              fontSize: '14px',
              fontWeight: 600,
              padding: '5px 15px',
              marginBottom: '5px'
            }}
          >
            All Review
          </StyledLoadingButton>
          {[5, 4, 3, 2, 1].map(star => (
            <StyledLoadingButton
              key={star}
              onClick={() => setFilter(star)}
              style={{
                backgroundColor: filter === star ? '#1078CA' : '#F8F9F9',
                color: filter === star ? '#FFFFFF' : '#000000',
                marginRight: '10px',
                fontSize: '14px',
                fontWeight: 600,
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '5px'
              }}
            >
              {star} <Star fontSize="small" style={{ color: '#FFD700', marginLeft: '5px' }} />
            </StyledLoadingButton>
          ))}
        </Box>
        <Grid container spacing={2}>
          {loading ? (
            Array.from(new Array(4)).map((_, index) => (
              <Grid item xs={12} key={index}>
                <Card style={{ padding: '16px', borderRadius: '8px' }}>
                  <Box>
                    <Box display="flex">
                      <Skeleton variant="rectangular" width={24} height={24} style={{ marginRight: '5px' }} />
                      <Skeleton variant="rectangular" width={24} height={24} style={{ marginRight: '5px' }} />
                      <Skeleton variant="rectangular" width={24} height={24} style={{ marginRight: '5px' }} />
                      <Skeleton variant="rectangular" width={24} height={24} style={{ marginRight: '5px' }} />
                      <Skeleton variant="rectangular" width={24} height={24} style={{ marginRight: '5px' }} />
                      <Skeleton variant="text" width={80} style={{ marginLeft: 'auto' }} />
                    </Box>
                    <Skeleton variant="text" width="60%" height={30} style={{ marginTop: '10px' }} />
                    <Skeleton variant="text" width="80%" height={20} style={{ marginTop: '10px' }} />
                    <Box display="flex" alignItems="center" marginTop="10px">
                      <Skeleton variant="circular" width={40} height={40} style={{ marginRight: '10px' }} />
                      <Box>
                        <Skeleton variant="text" width={100} />
                        <Skeleton variant="text" width={80} />
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))
          ) : (
            filteredReviews.map((review, index) => (
              <Grid item xs={12} key={index}>
                <Card style={{ padding: '16px', borderRadius: '8px' }}>
                  <Box>
                    <Box display="flex">
                      {[...Array(5)].map((_, i) => (
                        i < review.rating ? <Star key={i} style={{ color: '#FFD700', fontSize: '24px' }} /> : <Star key={i} style={{ color: '#E1E3EA', fontSize: '24px' }} />
                      ))}
                      <Typography fontSize='14px' fontWeight={600} variant="body2" color="#777777" style={{ marginLeft: 'auto' }}>{review.date}</Typography>
                    </Box>
                    <Typography fontSize='16px' fontWeight={600} variant="h6" mt={1}>{review.title}</Typography>
                    <Typography fontSize='14px' fontWeight={400} variant="body2" mt={1}>{review.content}</Typography>
                    <Box display="flex" alignItems="center" marginTop="10px">
                      <Avatar src={review.avatar} style={{ marginRight: '10px' }} />
                      <Box>
                        <Typography fontSize='14px' fontWeight={600} variant="body2" color="#292929">{review.author}</Typography>
                        <Typography fontSize='12px' fontWeight={400} variant="body2" color="#292929">{review.position}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ReviewsList;