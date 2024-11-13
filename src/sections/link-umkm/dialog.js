import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import axios from 'axios';

const dialogStyles = {
  dialog: { maxWidth: '800px', maxHeight: '768px', margin: 'auto' },
  title: { px: '40px', pt: '20px', fontSize: '22px', fontWeight: 700, color: '#1078CA' },
  content: { p: '40px' },
  checkboxLabel: { mt: 2 },
  button: { height: '48px', width: '100%' },
  actions: { justifyContent: 'space-between', p: 2, gap: 2 }
};

export default function LinkUMKMDialog({ open, onClose, onAgree, loading }) {
  const [checked, setChecked] = useState(false);
  
  const [html, setHtml] = useState('');

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BUMDESA_ASSET}terms-and-condition/terms-and-condition-link-umkm1.html`)
      .then(res => {
        setHtml(res.data)
      })
      .catch(err => {
        console.log('err:', err);
      });
  }, [html]);

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
              <Typography fontSize="14px" fontWeight={400} sx={{ cursor: 'default' }}>
                Saya telah menyetujui <span style={{ color: '#1078CA', fontWeight: 600 }}>Syarat & Ketentuan</span> dan <span onClick={() => window.open('/link-umkm/privacy-policy', '_blank')} style={{ color: '#1078CA', fontWeight: 600, cursor: 'pointer' }}>Kebijakan Privasi</span> LinkUMKM
              </Typography>
            }
            sx={dialogStyles.checkboxLabel}
          />
        </DialogContent>
        <DialogActions sx={dialogStyles.actions}>
          <StyledLoadingButton onClick={onClose} variant="outlined" color="primary" sx={dialogStyles.button}>
            Batal
          </StyledLoadingButton>
          <StyledLoadingButton onClick={onAgree} variant="contained" color="primary" disabled={!checked} sx={dialogStyles.button} loading={loading}>
            Setuju
          </StyledLoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}