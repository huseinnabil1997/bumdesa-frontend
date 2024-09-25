import { Container, } from '@mui/material';
import useSettings from '../../hooks/useSettings';
import Layout from '../../layouts';
import Page from '../../components/Page';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LinkUMKMDialogDashboard from 'src/sections/link-umkm/dialogDashboard';
import { useGetLink } from 'src/query/hooks/link-umkm/useGetLink';
import { useCreateLink } from 'src/query/hooks/link-umkm/useCreateLink';
import FailedDialog from 'src/sections/link-umkm/failedDialog';

// ----------------------------------------------------------------------

Education.getLayout = function getLayout(page) {
  return <Layout title="Konten Edukasi">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Education() {
  const { themeStretch } = useSettings();
  const { data } = useGetLink();
  const { mutate: onCreate, isLoading: loading } = useCreateLink();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);

  const handleCreateLink = async () => {
    onCreate({
      onSuccess: (res) => {
        const { hotLink, token, userFullname, userEmail } = res.data;
        const url = new URL(hotLink);
        url.searchParams.append('token', token);
        url.searchParams.append('userFullname', userFullname);
        url.searchParams.append('userEmail', userEmail);
        window.open(url.toString(), '_blank');
      },
      onError: () => {
        setOpenFailed(true);
      },
    });
  };

  useEffect(() => {
    if (data?.linkumkm_integrated !== 1) {
      setOpen(true);
    } else {
      handleCreateLink();
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    setOpenFailed(false);
    router.push('/dashboard');
  };

  return (
    <Page title="Konten Edukasi: Link UMKM">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <LinkUMKMDialogDashboard open={open} onClose={handleClose} />
      </Container>
      <FailedDialog open={openFailed} onClose={handleClose} onRetry={handleCreateLink} loading={loading} />
    </Page >
  );
}




