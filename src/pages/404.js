// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// routes
// hooks
// guards
// components
import Page from '../components/Page';
// sections
import { useRouter } from 'next/router';
import { PageNotFoundIllustration } from '../assets';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { StyledLoadingButton } from 'src/theme/custom/Button';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(() => ({
  maxWidth: '100vw',
  width: '100%',
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundImage: 'url("/image/email-verification.svg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
}));

// ----------------------------------------------------------------------

export default function PageNotFound() {
  const router = useRouter();

  return (
    <Page title="404 Halaman Tidak di temukan">
      <RootStyle>
        {/* <Container> */}
        <ContentStyle>
          <Box sx={{ maxWidth: 500, mx: 'auto' }}>
            <Box
              display="flex"
              flexDirection="column"
              sx={{ justifyContent: 'center', alignItems: 'center', mt: '10px', textAlign: 'center' }}
            >
              <Typography variant="h3" paragraph>
                Maaf, halaman tidak ditemukan!
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Maaf, kami tidak dapat menemukan halaman yang anda cari. Mungkin saja anda mengalami kesalahan mengetik URL?
                Pastikan untuk memeriksa ejaan Anda.
              </Typography>
              <PageNotFoundIllustration sx={{ height: '216px', m: 5 }} />
              <StyledLoadingButton
                sx={{ width: 432, height: 48, fontSize: '16px', fontWeight: 700 }}
                variant="contained"
                onClick={() => router.push(PATH_DASHBOARD.root)}>
                Kembali ke Halaman Utama
              </StyledLoadingButton>
            </Box>
          </Box>
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}