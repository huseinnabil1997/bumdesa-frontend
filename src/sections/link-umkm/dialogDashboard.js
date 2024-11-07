import React, { useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CardMedia,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { StyledButton } from 'src/theme/custom/Button';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const LinkUMKMDialogDashboard = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const router = useRouter();

  const handleClose = useCallback(() => {
    router.push('/link-umkm');
    onClose();
  }, [router, onClose]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        maxWidth: isMobile ? 350 : 900,
        maxHeight: isMobile ? '608px' : '720px',
        margin: 'auto',
      }}
      fullWidth
    >
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
          image={isMobile ? '/image/LINKUMKM.gif' : '/image/LINKUMKM_Desktop.gif'}
          alt="Integrasi LinkUMKM"
          sx={{
            width: '100%',
            maxWidth: isMobile ? 236 : '100%',
            maxHeight: isMobile ? 480 : '100%',
          }}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', px: 2, pb: 2 }}>
        <StyledButton
          onClick={handleClose}
          variant="contained"
          color="primary"
          sx={{ height: '48px', width: '100%' }}
        >
          Integrasi LinkUMKM
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(LinkUMKMDialogDashboard);
