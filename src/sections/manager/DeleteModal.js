import PropTypes from 'prop-types';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { Stack, Typography } from '@mui/material';
import Image from 'src/components/Image';
import { StyledLoadingButton } from 'src/theme/custom/Button';

DeleteModal.propTypes = {
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

export default function DeleteModal({ open, onClose, action }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          width: '480px',
          height: status === 0 ? '486px' : '506px',
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
          alt="Delete Unit"
          sx={{ width: '216px', height: '216px' }}
        />
        <Stack>
          <Typography sx={titleStyle}>Apakah Anda yakin ingin</Typography>
          <Typography sx={titleStyle}>menghapus pengurus ini?</Typography>
        </Stack>
        <Stack alignItems="center">
          <Typography sx={subtitleStyle}>Tindakan ini tidak dapat diubah. Data dan semua</Typography>
          <Typography sx={subtitleStyle}>informasi terkait pengurus BUM Desa ini akan dihapus permanen.</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <StyledLoadingButton sx={buttonStyle} onClick={onClose} variant="outlined">
            Tidak
          </StyledLoadingButton>
          <StyledLoadingButton sx={buttonStyle} onClick={action} variant="contained">
            Ya, Hapus
          </StyledLoadingButton>
        </Stack>
      </Stack>
    </Dialog>
  );
}
