import React, { useState, useMemo } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import SuccessDialog from './successDialog';
import FailedDialog from './failedDialog';
import { useCreateLink } from 'src/query/hooks/link-umkm/useCreateLink';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

const dialogStyles = {
  dialog: { maxWidth: '800px', maxHeight: '768px', margin: 'auto' },
  title: { px: '40px', pt: '20px', fontSize: '22px', fontWeight: 700, color: '#1078CA' },
  content: { p: '40px' },
  checkboxLabel: { mt: 2 },
  button: { height: '48px', width: '100%' },
  actions: { justifyContent: 'space-between', p: 2, gap: 2 }
};

const termsText = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.",
  "Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentum ullamcorper quis venenatis nisi. Proin vitae facilisis nisi, ac posuere leo.",
  "Nam pulvinar blandit velit, id condimentum diam faucibus at. Aliquam lacus nisi, s id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet."
];

export default function LinkUMKMDialog({ open, onClose }) {
  const [checked, setChecked] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);
  const [responseLink, setResponseLink] = useState({});

  const { enqueueSnackbar } = useSnackbar();
  const { mutate: onCreate, isLoading: creating } = useCreateLink();
  const router = useRouter();

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const termsContent = useMemo(() => (
    termsText.map((text, index) => (
      <Typography key={index} fontSize="16px" fontWeight={500} gutterBottom>
        {text}
      </Typography>
    ))
  ), []);

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
          {termsContent}
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