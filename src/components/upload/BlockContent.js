// @mui
import { Box, Typography, Stack } from '@mui/material';
// assets
import { UploadIllustration } from '../../assets';

// ----------------------------------------------------------------------

export default function BlockContent() {

  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction="column"
      sx={{ width: '100%', textAlign: 'center' }}
    >
      <UploadIllustration sx={{ width: 220 }} />

      <Box>
        <Typography fontWeight={600} fontSize={22} mb={1}>Tarik Dokumen atau klik Unggah Massal</Typography>

        <Typography fontSize={12} fontWeight={500} sx={{ color: 'text.secondary' }}>
          Ukuran dokumen maksimum 5 MB dengan fotmat csv, xls dan xlsx
        </Typography>
      </Box>
    </Stack>
  );
}
