import * as React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import { Stack, Typography } from '@mui/material';
import { StyledLoadingButton } from 'src/theme/custom/Button';

ModalSolvabilitasInfo.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

const titleStyle = {
  fontWeight: 700,
  fontSize: '24px',
  textAlign: 'center',
  mb: 1,
};

export default function ModalSolvabilitasInfo({ open, onClose }) {
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
          <Typography sx={titleStyle}>Profitabilitas</Typography>
          <Typography variant="caption" align="center">
            Ukuran atau indikator yang digunakan untuk menilai kemampuan suatu perusahaan dalam
            menghasilkan keuntungan (profit) dari aktivitas bisnisnya. Ini mencerminkan seberapa
            efisien dan efektif perusahaan dalam mengelola sumber daya dan mengoptimalkan pendapatan
            serta mengendalikan biaya.
          </Typography>
        </Stack>
        <StyledLoadingButton sx={{ width: 200 }} onClick={onClose} variant="outlined">
          Tutup
        </StyledLoadingButton>
      </Stack>
    </Dialog>
  );
}
