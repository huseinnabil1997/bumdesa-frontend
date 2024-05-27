import PropTypes from 'prop-types';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { Stack, Typography } from '@mui/material';
import Image from 'src/components/Image';
import { StyledLoadingButton } from 'src/theme/custom/Button';

ChangeStatusModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  action: PropTypes.func,
  status: PropTypes.number,
};

const titleStyle = {
  fontWeight: 700,
  fontSize: '24px',
  textAlign: 'center',
}

const subtitleStyle = {
  color: '#666666',
  fontWeight: 500,
  fontSize: '16px',
  textAlign: 'center'
}

const buttonStyle = {
  width: '212px',
  height: '48px'
}

export default function ChangeStatusModal({ open, onClose, action, status }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          width: '480px',
          height: '506px',
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
          src="/image/delete_unit.svg"
          alt="Change status"
          sx={{ width: '216px', height: '216px' }}
        />
        <Stack>
          <Typography sx={titleStyle}>Apakah Anda yakin ingin</Typography>
          <Typography sx={titleStyle}>{status !== 3 ? 'menonaktifkan' : 'mengaktifkan'} unit usaha ini?</Typography>
        </Stack>
        <Stack alignItems="center">
          <Typography sx={subtitleStyle}>Tindakan ini tidak dapat diubah. Data dan status</Typography>
          <Typography sx={subtitleStyle}>terkait unit usaha ini akan diubah menjadi {status !== 3 ? 'nonaktif' : 'aktif'}</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <StyledLoadingButton sx={buttonStyle} onClick={onClose} variant="outlined">
            Tidak
          </StyledLoadingButton>
          <StyledLoadingButton sx={buttonStyle} onClick={action} variant="contained">
            Ya, {status !== 3 ? 'nonaktifkan' : 'aktifkan'}
          </StyledLoadingButton>
        </Stack>
      </Stack>
    </Dialog>
  );
}
