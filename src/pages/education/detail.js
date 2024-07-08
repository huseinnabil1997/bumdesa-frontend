import { Container, Grid, Breadcrumbs, Link, Typography } from '@mui/material';
import useSettings from '../../hooks/useSettings';
import Layout from '../../layouts';
import Page from '../../components/Page';
import React from 'react';
import { CardDetail, ReviewCard } from 'src/sections/education';
import { useRouter } from 'next/router';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// ----------------------------------------------------------------------

EducationDetail.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EducationDetail() {
  const router = useRouter();
  const { themeStretch } = useSettings();

  return (
    <Page title="Konten Edukasi: Detail">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }} separator={<NavigateNextIcon fontSize="small" />}>
          <Link fontSize='16px' fontWeight={500} underline="hover" color="#A3A3A3" href="/education/list">
            Konten Edukasi
          </Link>
          <Typography fontSize='16px' fontWeight={700} color="#292929">{router.query.title}</Typography>
        </Breadcrumbs>
        <Grid container>
          <Grid item xs={12} md={8} >
            <CardDetail />
          </Grid>
          <Grid item xs={12} md={4}>
            <ReviewCard />
          </Grid>
        </Grid>
      </Container>
    </Page >
  );
}