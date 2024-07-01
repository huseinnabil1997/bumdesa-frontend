import * as React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import { Stack, Typography } from '@mui/material';
import { StyledLoadingButton } from 'src/theme/custom/Button';

ModalLikuiditasInfo.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

const titleStyle = {
  fontWeight: 700,
  fontSize: '24px',
  textAlign: 'center',
  mb: 1,
};

export default function ModalLikuiditasInfo({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          width: '480px',
          borderRadius: '16px',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        },
      }}
    >
      <Stack spacing={2} alignItems="center" sx={{ p: 3 }}>
        <Stack>
          <Typography sx={titleStyle}>Likuiditas</Typography>
          <Typography variant="caption" align="justify">
            Ukuran kemampuan suatu perusahaan untuk memenuhi kewajiban jangka pendeknya dengan aset
            lancarnya. Ini mencerminkan seberapa cepat dan mudah aset perusahaan dapat diubah
            menjadi kas untuk membayar utang dan kewajiban lainnya yang jatuh tempo dalam waktu
            dekat.
          </Typography>
        </Stack>
        <StyledLoadingButton sx={{ width: 200 }} onClick={onClose} variant="outlined">
          Tutup
        </StyledLoadingButton>
      </Stack>
    </Dialog>
  );
}
