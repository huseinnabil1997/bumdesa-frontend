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
        margin: 'auto',
      }}
      fullWidth
      PaperProps={{
        sx: {
          maxWidth: 720,
        },
      }}
    >
      {/* <DialogTitle>
       
      </DialogTitle> */}
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 2,
          top: 2,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <CardMedia
        component="img"
        image={isMobile ? '/image/LINKUMKM.gif' : '/image/LINKUMKM_Desktop.gif'}
        alt="Integrasi LinkUMKM"
        sx={{
          width: '100%',
          maxWidth: '100%',
          maxHeight: isMobile ? 500 : '100%',
        }}
      />
      <DialogActions sx={{ justifyContent: 'center', px: 2, pb: 2 }}>
        <StyledButton
          onClick={handleClose}
          variant="contained"
          color="primary"
          sx={{ height: '48px', width: '100%', mt: 1 }}
        >
          Integrasi LinkUMKM
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(LinkUMKMDialogDashboard);
