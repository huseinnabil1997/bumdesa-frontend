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
  from: PropTypes.string,
};

const styles = {
  title: {
    fontWeight: 700,
    fontSize: '24px',
    textAlign: 'center',
  },
  subtitle: {
    color: '#666666',
    fontWeight: 500,
    fontSize: '16px',
    textAlign: 'center',
  },
  button: {
    width: '212px',
    height: '48px',
  },
  dialogPaper: (status) => ({
    width: '480px',
    height: status === 0 ? '486px' : '506px',
    borderRadius: '16px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  }),
  image: {
    width: '216px',
    height: '216px',
  },
};

export default function DeleteModal({ open, onClose, action, status, from }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ sx: styles.dialogPaper(status) }}
    >
      <Stack spacing={2} alignItems="center">
        <Image
          visibleByDefault
          disabledEffect
          src="/image/delete_unit.svg"
          alt="Delete Unit"
          sx={styles.image}
        />
        <Stack>
          <Typography sx={styles.title}>Apakah Anda yakin ingin</Typography>
          <Typography sx={styles.title}>menghapus pengurus ini?</Typography>
        </Stack>
        <Stack alignItems="center">
          <Typography sx={styles.subtitle}>Tindakan ini tidak dapat diubah. Data dan semua</Typography>
          <Typography sx={styles.subtitle}>
            informasi terkait pengurus {from === 'employee' ? "Unit Usaha" : "BUM Desa"} ini akan dihapus permanen.
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <StyledLoadingButton sx={styles.button} onClick={onClose} variant="outlined">
            Tidak
          </StyledLoadingButton>
          <StyledLoadingButton sx={styles.button} onClick={action} variant="contained">
            Ya, Hapus
          </StyledLoadingButton>
        </Stack>
      </Stack>
    </Dialog>
  );
}
