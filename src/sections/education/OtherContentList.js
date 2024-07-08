import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, List, ListItem, Box, Skeleton } from '@mui/material';
import Image from 'src/components/Image';

const OtherContentList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulasi pengambilan data
    setTimeout(() => {
      setData([
        { title: 'Pencatatan dan Pelaporan', content: 'Pencatatan dan pelaporan adalah proses penggalian data dan informasi yang berhubungan dengan keuangan dan pengeluaran.', date: '18 Okt 2023', category: 'BUM Desa', image: 'https://dishub.banjarmasinkota.go.id/wp-content/uploads/2024/02/WhatsApp-Image-2024-02-07-at-10.32.15-scaled.jpeg' },
        { title: 'Cara mengatur UMKM lokal', content: 'Cara mengatur UMKM lokal adalah proses penggalian data dan informasi yang berhubungan dengan keuangan dan pengeluaran.', date: '3 Sep 2023', category: 'UMKM', image: 'https://dishub.banjarmasinkota.go.id/wp-content/uploads/2024/02/WhatsApp-Image-2024-02-07-at-10.32.15-scaled.jpeg' },
        { title: 'Menilik Potensi: Jenis-jenis', content: 'Menilik potensi jenis-jenis adalah proses penggalian data dan informasi yang berhubungan dengan keuangan dan pengeluaran.', date: '3 Sep 2023', category: 'UMKM', image: 'https://dishub.banjarmasinkota.go.id/wp-content/uploads/2024/02/WhatsApp-Image-2024-02-07-at-10.32.15-scaled.jpeg' },
        { title: 'Strategi Jitu: Membangun', content: 'Strategi jitu membangun adalah proses penggalian data dan informasi yang berhubungan dengan keuangan dan pengeluaran.', date: '3 Sep 2023', category: 'UMKM', image: 'https://dishub.banjarmasinkota.go.id/wp-content/uploads/2024/02/WhatsApp-Image-2024-02-07-at-10.32.15-scaled.jpeg' },
        { title: 'Menuju Kesejahteraan Ber', content: 'Menuju kesejahteraan berkarakter adalah proses penggalian data dan informasi yang berhubungan dengan keuangan dan pengeluaran.', date: '3 Sep 2023', category: 'UMKM', image: 'https://dishub.banjarmasinkota.go.id/wp-content/uploads/2024/02/WhatsApp-Image-2024-02-07-at-10.32.15-scaled.jpeg' },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Card sx={{ minWidth: { xs: '100%', lg: 326 }, padding: '24px', marginTop: 4 }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography fontSize='16px' component="div" fontWeight={600}>
            Konten Edukasi Lainnya
          </Typography>
          <Box component="img" src="/icons/ic_abstract.svg" alt="icon" />
        </Box>
        <List>
          {loading ? (
            Array.from(new Array(5)).map((_, index) => (
              <ListItem key={index} alignItems="flex-start" disableGutters>
                <Card sx={{ display: 'flex', width: '100%', p: '8px', borderRadius: '8px' }}>
                  <Skeleton variant="rectangular" width={64} height={64} sx={{ borderRadius: '8px' }} />
                  <Box ml={1} width="100%">
                    <Skeleton width="60%" />
                    <Skeleton width="80%" />
                    <Skeleton width="40%" />
                  </Box>
                </Card>
              </ListItem>
            ))
          ) : (
            data.map((item, index) => (
              <ListItem key={index} alignItems="flex-start" disableGutters>
                <Card sx={{ display: 'flex', width: '100%', p: '8px', borderRadius: '8px' }}>
                  <Image alt={item.title} src={item.image} sx={{ minWidth: 64, maxWidth: 64, height: 64, borderRadius: '8px' }} />
                  <Box ml={1}>
                    <Typography
                      fontSize='14px'
                      fontWeight={600}
                      sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        WebkitLineClamp: 1,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      fontSize='12px'
                      fontWeight={400}
                      sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        WebkitLineClamp: 2,
                      }}
                    >
                      {item.content}
                    </Typography>
                    <Box display="flex" flexDirection="row" mt={1}>
                      <Typography variant="body2" color="text.secondary" fontSize='10px' fontWeight={400}>
                        {item.date}
                      </Typography>
                      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" ml={2}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: item.category === 'UMKM' ? '#FEDCC0' : '#BBDEFA',
                            marginRight: 1,
                          }}
                        />
                        <Typography variant="body2" color="text.secondary" fontSize='10px' fontWeight={400}>
                          {item.category}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </ListItem>
            ))
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default OtherContentList;