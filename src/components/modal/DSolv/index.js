import * as React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import { Stack, Typography } from '@mui/material';
import { StyledLoadingButton } from 'src/theme/custom/Button';

ModalProfitInfo.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

const titleStyle = {
  fontWeight: 700,
  fontSize: '24px',
  textAlign: 'center',
  mb: 1,
};

export default function ModalProfitInfo({ open, onClose }) {
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
          <Typography sx={titleStyle}>Solvabilitas</Typography>
          <Typography variant="caption" align="center">
            Ukuran kemampuan suatu perusahaan untuk memenuhi kewajiban jangka panjangnya. Ini
            mencerminkan stabilitas keuangan perusahaan dan kemampuannya untuk bertahan dalam jangka
            panjang dengan membayar utang dan kewajiban lainnya yang jatuh tempo lebih dari satu
            tahun.
          </Typography>
        </Stack>
        <StyledLoadingButton sx={{ width: 200 }} onClick={onClose} variant="outlined">
          Tutup
        </StyledLoadingButton>
      </Stack>
    </Dialog>
  );
}
