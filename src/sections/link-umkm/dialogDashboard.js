import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, CardMedia } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { StyledButton } from 'src/theme/custom/Button';
import { useRouter } from 'next/router';

export default function LinkUMKMDialogDashboard({ open, onClose }) {
  const router = useRouter();

  const handleClose = () => {
    router.push('/link-umkm');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} sx={{ maxWidth: '480px', maxHeight: '608px', margin: 'auto' }} fullWidth>
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <CardMedia
          component="img"
          image="/image/ilustrasi_link_umkm.png"
          alt="Integrasi LinkUMKM"
          sx={{ width: '100%', maxWidth: 480, maxHeight: 480 }}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', px: 2, pb: 2 }}>
        <StyledButton onClick={handleClose} variant="contained" color="primary" sx={{ height: '48px', width: '100%' }}>
          Integrasi LinkUMKM
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
}