import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import SuccessDialog from './successDialog';
import FailedDialog from './failedDialog';
import { useCreateLink } from 'src/query/hooks/link-umkm/useCreateLink';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import axios from 'axios';

const dialogStyles = {
  dialog: { maxWidth: '800px', maxHeight: '768px', margin: 'auto' },
  title: { px: '40px', pt: '20px', fontSize: '22px', fontWeight: 700, color: '#1078CA' },
  content: { p: '40px' },
  checkboxLabel: { mt: 2 },
  button: { height: '48px', width: '100%' },
  actions: { justifyContent: 'space-between', p: 2, gap: 2 }
};

export default function LinkUMKMDialog({ open, onClose }) {
  const [checked, setChecked] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);
  const [responseLink, setResponseLink] = useState({});
  const [html, setHtml] = useState('');

  const { enqueueSnackbar } = useSnackbar();
  const { mutate: onCreate, isLoading: creating } = useCreateLink();
  const router = useRouter();

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BUMDESA_ASSET}privacy-policy/privacy-policy.html`)
      .then(res => {
        setHtml(res.data)
      })
      .catch(err => {
        console.log('err:', err);
      });
  }, [html]);

  const handleAgree = async () => {
    onCreate({
      onSuccess: (res) => {
        setResponseLink(res?.data);
        enqueueSnackbar(res?.message);
        setOpenSuccess(true);
      },
      onError: (err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
        setOpenFailed(true);
      },
    });
    onClose();
  };

  const handleSuccess = () => {
    setOpenSuccess(false);
    const { hotLink, token, userFullname, userEmail } = responseLink;
    const url = new URL(hotLink);
    url.searchParams.append('token', token);
    url.searchParams.append('userFullname', userFullname);
    url.searchParams.append('userEmail', userEmail);
    window.open(url.toString(), '_blank');
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} sx={dialogStyles.dialog} fullWidth>
        <DialogTitle sx={dialogStyles.title}>Syarat dan Ketentuan LinkUMKM</DialogTitle>
        <DialogContent sx={dialogStyles.content}>
          <Typography>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </Typography>

          <FormControlLabel
            control={<Checkbox name="checkedLinkUMKM" checked={checked} onChange={handleCheckboxChange} />}
            label={
              <Typography fontSize="14px" fontWeight={400}>
                Saya telah menyetujui <span style={{ color: '#1078CA', fontWeight: 600 }}>Syarat & Ketentuan</span> dan <span style={{ color: '#1078CA', fontWeight: 600 }}>Pemberitahuan Privasi</span> LinkUMKM
              </Typography>
            }
            sx={dialogStyles.checkboxLabel}
          />
        </DialogContent>
        <DialogActions sx={dialogStyles.actions}>
          <StyledLoadingButton onClick={onClose} variant="outlined" color="primary" sx={dialogStyles.button}>
            Batal
          </StyledLoadingButton>
          <StyledLoadingButton onClick={handleAgree} variant="contained" color="primary" disabled={!checked} sx={dialogStyles.button} loading={creating}>
            Setuju
          </StyledLoadingButton>
        </DialogActions>
      </Dialog>
      <SuccessDialog
        open={openSuccess}
        onClose={() => {
          setOpenSuccess(false);
          router.push('/dashboard');
        }}
        handleSuccess={handleSuccess}
      />
      <FailedDialog open={openFailed} onRetry={handleAgree} onClose={() => setOpenFailed(false)} loading={creating} />
    </>
  );
}