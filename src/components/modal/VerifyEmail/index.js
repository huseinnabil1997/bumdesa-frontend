import PropTypes from 'prop-types';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { Stack, Typography } from '@mui/material';
import Image from 'src/components/Image';
import { StyledLoadingButton } from 'src/theme/custom/Button';

AlertVerifyEmail.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

const titleStyle = {
  fontWeight: 700,
  fontSize: '24px',
  textAlign: 'center',
}

const buttonActiveStyle = {
  width: '432px',
  height: '48px'
}

export default function AlertVerifyEmail({ open, onClose }) {
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
          src="/image/registration_success.svg"
          alt="Verifikasi email berhasil"
          sx={{ width: '216px', height: '216px' }}
        />
        <Stack>
          <Typography sx={titleStyle}>Verifikasi Berhasil!</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <StyledLoadingButton sx={buttonActiveStyle} onClick={onClose} variant="contained">
            Mengerti
          </StyledLoadingButton>
        </Stack>
      </Stack>
    </Dialog>
  );
}
