import PropTypes from 'prop-types';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { Stack, Typography } from '@mui/material';
import Image from 'src/components/Image';
import { StyledLoadingButton } from 'src/theme/custom/Button';

AlertDeleteUnit.propTypes = {
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

const titleActiveStyle = {
  fontWeight: 700,
  fontSize: '20px',
  textAlign: 'center',
}

const subtitleStyle = {
  color: '#666666',
  fontWeight: 500,
  fontSize: '16px',
}

const subtitleActiveStyle = {
  color: '#666666',
  fontWeight: 500,
  fontSize: '14px',
  textAlign: 'center',
}

const buttonStyle = {
  width: '212px',
  height: '48px'
}

const buttonActiveStyle = {
  width: '432px',
  height: '48px'
}

export default function AlertDeleteUnit({ open, onClose, action, status = 0 }) {
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
          src={status === 0 ? "/image/delete_unit.svg" : "/image/delete_active_unit.svg"}
          alt="Delete Unit"
          sx={{ width: '216px', height: '216px' }}
        />
        {status === 0 ? (
          <Stack>
            <Typography sx={titleStyle}>Apakah Anda yakin</Typography>
            <Typography sx={titleStyle}>ingin menghapus unit usaha ini?</Typography>
          </Stack>
        ) : (
          <Stack>
            <Typography sx={titleActiveStyle}>Unit Usaha BUM Desa yang Sudah Memiliki</Typography>
            <Typography sx={titleActiveStyle}>Pencatatan Jurnal Tidak Bisa Dihapus</Typography>
          </Stack>
        )}
        {status === 0 ? (
          <Stack alignItems="center">
            <Typography sx={subtitleStyle}>Tindakan ini tidak dapat diubah. Data dan semua</Typography>
            <Typography sx={subtitleStyle}>informasi terkait unit usaha ini akan dihapus permanen.</Typography>
          </Stack>
        ) : (
          <Stack alignItems="center">
            <Typography sx={subtitleActiveStyle}>Demi menjaga integrasi data, unit usaha dengan laporan</Typography>
            <Typography sx={subtitleActiveStyle}>keuangan tidak dapat dihapus. Penghapusan unit usaha akan</Typography>
            <Typography sx={subtitleActiveStyle}>berdampak pada data keuangan BUM Desa yang terhubung</Typography>
            <Typography sx={subtitleActiveStyle}>dengannya.</Typography>
          </Stack>
        )}
        {status === 0 ? (
          <Stack direction="row" spacing={1}>
            <StyledLoadingButton sx={buttonStyle} onClick={onClose} variant="outlined">
              Tidak
            </StyledLoadingButton>
            <StyledLoadingButton sx={buttonStyle} onClick={action} variant="contained">
              Ya, Hapus
            </StyledLoadingButton>
          </Stack>
        ) : (
          <Stack direction="row" spacing={1}>
            <StyledLoadingButton sx={buttonActiveStyle} onClick={onClose} variant="contained">
              Kembali ke Daftar Unit Usaha
            </StyledLoadingButton>
          </Stack>
        )}

      </Stack>
    </Dialog>
  );
}
