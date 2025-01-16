import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import Image from 'src/components/Image';
import { StyledButton } from 'src/theme/custom/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 521,
  height: 358,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
};

export default function BulkModalSuccess({ open, handleClose, action }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack sx={style} spacing={3}>
        <Image src="/image/upload_success.svg" alt="ornament" />
        <Typography fontSize={24} fontWeight={700} sx={{ mt: 5 }}>
          Jurnal Berhasil Ditambahkan
        </Typography>
        <StyledButton variant="contained" fullWidth onClick={action}>
          Lihat Jurnal
        </StyledButton>
      </Stack>
    </Modal>
  );
}
