import { Box, CircularProgress, Container, Typography, } from '@mui/material';
import useSettings from '../../hooks/useSettings';
import Layout from '../../layouts';
import Page from '../../components/Page';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LinkUMKMDialogDashboard from 'src/sections/link-umkm/dialogDashboard';
import { useGetLink } from 'src/query/hooks/link-umkm/useGetLink';
import { useCreateLink } from 'src/query/hooks/link-umkm/useCreateLink';
import FailedDialog from 'src/sections/link-umkm/failedDialog';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

Education.getLayout = function getLayout(page) {
  return <Layout title="Konten Edukasi">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Education() {
  const { themeStretch } = useSettings();
  const { data } = useGetLink();
  const { enqueueSnackbar } = useSnackbar();
  const { mutate: onCreate, isLoading: loading } = useCreateLink();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);

  const handleCreateLink = async () => {
    onCreate({}, {
      onSuccess: (res) => {
        const { hot_link, token, user_fullname, user_email } = res.data;
        try {
          const url = new URL(hot_link);
          url.searchParams.append('token', token);
          url.searchParams.append('user_fullname', user_fullname);
          url.searchParams.append('user_email', user_email);
          window.open(url.toString(), '_blank');
        } catch (error) {
          enqueueSnackbar('URL tidak valid', { variant: 'error' });
          setOpenFailed(true);
        }
        router.push('/dashboard');
      },
      onError: () => {
        setOpenFailed(true);
      },
    });
  };

  useEffect(() => {
    if (data) {
      if (data?.linkumkm_integrated !== 1) {
        setOpen(true);
      } else {
        handleCreateLink();
      }
    }
  }, [data]);

  const handleClose = () => {
    setOpen(false);
    setOpenFailed(false);
    router.push('/dashboard');
  };

  return (
    <Page title="Konten Edukasi: Link UMKM">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <LinkUMKMDialogDashboard open={open} onClose={handleClose} />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '65vh' }}>
          {loading && <CircularProgress size="5rem" color="primary" />}
          {loading && <Typography variant="h4" sx={{ mt: 2 }}>Mengalihkan...</Typography>}
        </Box>
      </Container>
      <FailedDialog open={openFailed} onClose={handleClose} onRetry={handleCreateLink} loading={loading} />
    </Page >
  );
}




