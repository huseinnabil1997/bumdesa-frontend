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

export default function ChangeStatusModal({ open, onClose, action, status }) {
  const titleStyle = React.useMemo(() => ({
    fontWeight: 700,
    fontSize: '24px',
    textAlign: 'center',
  }), []);

  const subtitleStyle = React.useMemo(() => ({
    color: '#666666',
    fontWeight: 500,
    fontSize: '16px',
    textAlign: 'center',
  }), []);

  const buttonStyle = React.useMemo(() => ({
    width: '212px',
    height: '48px',
  }), []);

  const imageMemo = React.useMemo(() => (
    <Image
      visibleByDefault
      disabledEffect
      src="/image/delete_unit.svg"
      alt="Change status"
      sx={{ width: '216px', height: '216px' }}
    />
  ), []);

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
        {imageMemo}
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