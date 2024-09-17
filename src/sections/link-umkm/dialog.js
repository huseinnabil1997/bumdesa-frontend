import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { StyledButton } from 'src/theme/custom/Button';

export default function LinkUMKMDialog({ open, onClose }) {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Dialog open={open} onClose={onClose} sx={{ maxWidth: '800px', maxHeight: '768px', margin: 'auto' }} fullWidth>
      <DialogTitle fontSize="22px" fontWeight={700} color="#1078CA" sx={{ px: '40px', pt: '20px' }}>Syarat dan Ketentuan LinkUMKM</DialogTitle>
      <DialogContent sx={{ p: '40px' }}>
        <Typography fontSize="16px" fontWeight={500} gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
        </Typography>
        <Typography fontSize="16px" fontWeight={500} gutterBottom>
          Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentum ullamcorper quis venenatis nisi. Proin vitae facilisis nisi, ac posuere leo.
        </Typography>
        <Typography fontSize="16px" fontWeight={500} gutterBottom>
          Nam pulvinar blandit velit, id condimentum diam faucibus at. Aliquam lacus nisi, s id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet.
        </Typography>
        <FormControlLabel
          control={<Checkbox name="checkedLinkUMKM" checked={checked} onChange={handleCheckboxChange} />}
          label={
            <Typography fontSize="14px" fontWeight={400}>
              Saya telah menyetujui <span style={{ color: '#1078CA', fontWeight: 600 }}>Syarat & Ketentuan</span> dan <span style={{ color: '#1078CA', fontWeight: 600 }}>Pemberitahuan Privasi</span> LinkUMKM
            </Typography>
          }
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', p: 2, gap: 2 }}>
        <StyledButton onClick={onClose} variant="outlined" color="primary" sx={{ height: '48px', width: '100%' }}>
          Batal
        </StyledButton>
        <StyledButton onClick={onClose} variant="contained" color="primary" disabled={!checked} sx={{ height: '48px', width: '100%' }}>
          Setuju
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
}