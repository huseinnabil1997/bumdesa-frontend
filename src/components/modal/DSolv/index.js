import * as React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import { Stack, Typography } from '@mui/material';
import { StyledLoadingButton } from 'src/theme/custom/Button';

ModalProfitInfo.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

const titleStyle = {
  fontWeight: 700,
  fontSize: '24px',
  textAlign: 'center',
  mb: 1,
};

export default function ModalProfitInfo({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          width: '480px',
          borderRadius: '16px',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        },
      }}
    >
      <Stack spacing={2} alignItems="center" sx={{ p: 3 }}>
        <Stack>
          <Typography sx={titleStyle}>Solvabilitas</Typography>
          <Typography variant="caption" align="justify">
            Kemampuan perusahaan dalam menyelesaikan kewajiban/utang kepada kreditur baik dalam
            jangka pendek maupun jangka panjang. Rasio ini mencerminkan seberapa stabil keuangan
            perusahaan. Hasil perhitungan rasio utang terhadap aset (debt-to-aset ratio) menunjukkan
            sejauh mana perusahaan menggunakan utang untuk membiayai asetnya. Investor menggunakan
            rasio ini untuk mengevaluasi apakah perusahaan memiliki cukup dana untuk memenuhi
            kewajiban/utang jangka pendek dan jangka panjangnya saat ini dan untuk menilai apakah
            perusahaan dapat membayar bagi hasil (return) investasinya. Kreditur menggunakan rasio
            ini untuk melihat seberapa besar utang yang telah dimiliki perusahaan dan apakah
            perusahaan mampu melunasi utang yang ada. Hal ini akan menentukan keputusan memberikan
            pinjaman atau tidak ke perusahaan. Secara umum, rasio yang dapat diterima investor
            maupun kreditur yaitu sekitar 0,3 hingga 0,6,dan tergantung jenis industri.
          </Typography>
        </Stack>
        <StyledLoadingButton sx={{ width: 200 }} onClick={onClose} variant="outlined">
          Tutup
        </StyledLoadingButton>
      </Stack>
    </Dialog>
  );
}
