import React from 'react';
import { Box, CardMedia, Dialog, DialogContent, DialogActions, Typography, useTheme } from '@mui/material';
import { StyledLoadingButton } from 'src/theme/custom/Button';

function FailedDialog({ open, onClose, onRetry, loading }) {
  const theme = useTheme();

  const styles = {
    dialogContent: {
      textAlign: 'center',
      pt: '38px',
      pb: '8px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      maxWidth: '150px',
      margin: '0 auto',
    },
    title: {
      fontWeight: 'bold',
      marginTop: theme.spacing(2),
    },
    description: {
      marginTop: theme.spacing(1),
      color: theme.palette.text.secondary,
    },
    dialogActions: {
      padding: '8px 24px 24px 24px',
    },
    button: {
      height: '48px',
    },
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Box>
        <DialogContent sx={styles.dialogContent}>
          <CardMedia
            component="img"
            image="/image/link_failed.png"
            alt="Integrasi LinkUMKM Gagal"
            sx={{ width: '100%', maxWidth: 205, maxHeight: 205 }}
          />
          <Typography variant="h6" sx={styles.title}>
            Gagal Menghubungkan
          </Typography>
          <Typography variant="body2" sx={styles.description}>
            Sistem gagal menyambungkan BUM Desa dengan LinkUMKM, silakan coba beberapa saat lagi
          </Typography>
        </DialogContent>
        <DialogActions sx={styles.dialogActions}>
          <StyledLoadingButton onClick={onClose} variant="outlined" sx={styles.button} fullWidth>
            Kembali
          </StyledLoadingButton>
          <StyledLoadingButton onClick={onRetry} variant="contained" sx={styles.button} loading={loading} fullWidth>
            Coba Lagi
          </StyledLoadingButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default FailedDialog;