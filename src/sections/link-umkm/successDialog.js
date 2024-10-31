import React from 'react';
import { Box, CardMedia, Dialog, DialogContent, DialogActions, Typography, useTheme } from '@mui/material';
import { StyledButton } from 'src/theme/custom/Button';

function SuccessDialog({ open, onClose, handleSuccess }) {
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
            image="/image/change_email_success.svg"
            alt="Integrasi LinkUMKM Berhasil"
            sx={{ width: '100%', maxWidth: 216, maxHeight: 216 }}
          />
          <Typography variant="h6" sx={styles.title}>
            Berhasil Menghubungkan
          </Typography>
          <Typography variant="body2" sx={styles.description}>
            Selamat, Anda berhasil menghubungkan akun BUM Desa dengan LinkUMKM
          </Typography>
        </DialogContent>
        <DialogActions sx={styles.dialogActions}>
          <StyledButton onClick={handleSuccess} variant="contained" sx={styles.button} fullWidth>
            Lanjutkan
          </StyledButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default SuccessDialog;