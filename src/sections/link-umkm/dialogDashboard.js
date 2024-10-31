import React, { useCallback } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, CardMedia } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { StyledButton } from 'src/theme/custom/Button';
import { useRouter } from 'next/router';

const LinkUMKMDialogDashboard = ({ open, onClose }) => {
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.push('/link-umkm');
    onClose();
  }, [router, onClose]);

  return (
    <Dialog open={open} onClose={onClose} sx={{ maxWidth: 350, maxHeight: '608px', margin: 'auto' }} fullWidth>
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
          image="/image/LINKUMKM.gif"
          alt="Integrasi LinkUMKM"
          sx={{ width: '100%', maxWidth: 236, maxHeight: 480 }}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', px: 2, pb: 2 }}>
        <StyledButton onClick={handleClose} variant="contained" color="primary" sx={{ height: '48px', width: '100%' }}>
          Integrasi LinkUMKM
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(LinkUMKMDialogDashboard);