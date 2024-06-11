import PropTypes from 'prop-types';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { Stack, Typography } from '@mui/material';
import Image from 'src/components/Image';
import { StyledLoadingButton } from 'src/theme/custom/Button';

FirstBalance.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onAccept: PropTypes.func,
};

const titleStyle = {
  fontWeight: 700,
  fontSize: '24px',
  textAlign: 'center',
};

export default function FirstBalance({ open, onClose, onAccept }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          width: '480px',
          height: '394px',
          borderRadius: '16px',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        },
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Image
          visibleByDefault
          disabledEffect
          src="/image/empty.svg"
          alt="Verifikasi email berhasil"
          sx={{ width: '216px', height: '216px' }}
        />
        <Stack>
          <Typography sx={titleStyle}>Saldo Awal Tidak Ditemukan</Typography>
          <Typography variant="caption">
            Apakah Anda ingin membuat saldo awal dengan jurnal ini?
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
          <StyledLoadingButton fullWidth onClick={onClose} variant="outlined" color="error">
            Tidak
          </StyledLoadingButton>
          <StyledLoadingButton fullWidth onClick={onAccept} variant="contained">
            Iya
          </StyledLoadingButton>
        </Stack>
      </Stack>
    </Dialog>
  );
}
