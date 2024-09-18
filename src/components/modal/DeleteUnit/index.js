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

const styles = {
  title: {
    fontWeight: 700,
    textAlign: 'center',
  },
  subtitle: {
    color: '#666666',
    fontWeight: 500,
  },
  button: {
    height: '48px',
  },
};

export default function AlertDeleteUnit({ open, onClose, action, status = 0 }) {
  const isStatusZero = status === 0;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          width: '480px',
          height: isStatusZero ? '486px' : '506px',
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
          src={isStatusZero ? "/image/delete_unit.svg" : "/image/delete_active_unit.svg"}
          alt="Delete Unit"
          sx={{ width: '216px', height: '216px' }}
        />
        <Stack>
          <Typography sx={{ ...styles.title, fontSize: isStatusZero ? '24px' : '20px' }}>
            {isStatusZero ? 'Apakah Anda yakin' : 'Unit Usaha BUM Desa yang Sudah Memiliki'}
          </Typography>
          <Typography sx={{ ...styles.title, fontSize: isStatusZero ? '24px' : '20px' }}>
            {isStatusZero ? 'ingin menghapus unit usaha ini?' : 'Pencatatan Jurnal Tidak Bisa Dihapus'}
          </Typography>
        </Stack>
        <Stack alignItems="center">
          <Typography sx={{ ...styles.subtitle, fontSize: isStatusZero ? '16px' : '14px', textAlign: 'center' }}>
            {isStatusZero ? 'Tindakan ini tidak dapat diubah. Data dan semua' : 'Demi menjaga integrasi data, unit usaha dengan laporan'}
          </Typography>
          <Typography sx={{ ...styles.subtitle, fontSize: isStatusZero ? '16px' : '14px', textAlign: 'center' }}>
            {isStatusZero ? 'informasi terkait unit usaha ini akan dihapus permanen.' : 'keuangan tidak dapat dihapus. Penghapusan unit usaha akan'}
          </Typography>
          {!isStatusZero && (
            <>
              <Typography sx={{ ...styles.subtitle, fontSize: '14px', textAlign: 'center' }}>
                berdampak pada data keuangan BUM Desa yang terhubung
              </Typography>
              <Typography sx={{ ...styles.subtitle, fontSize: '14px', textAlign: 'center' }}>
                dengannya.
              </Typography>
            </>
          )}
        </Stack>
        <Stack direction="row" spacing={1}>
          <StyledLoadingButton sx={{ ...styles.button, width: isStatusZero ? '212px' : '432px' }} onClick={onClose} variant={isStatusZero ? 'outlined' : 'contained'}>
            {isStatusZero ? 'Tidak' : 'Kembali ke Daftar Unit Usaha'}
          </StyledLoadingButton>
          {isStatusZero && (
            <StyledLoadingButton sx={{ ...styles.button, width: '212px' }} onClick={action} variant="contained">
              Ya, Hapus
            </StyledLoadingButton>
          )}
        </Stack>
      </Stack>
    </Dialog>
  );
}