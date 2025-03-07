// @mui
import { Box, Typography, Stack } from '@mui/material';
// assets
import Image from '../Image';

// ----------------------------------------------------------------------

export default function BlockContent({ isLoading }) {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction="column"
      sx={{ width: '100%', textAlign: 'center' }}
    >
      {isLoading ? (
        <Image src="/image/bulk_upload_loading.svg" alt="ornament" />
      ) : (
        <Image src="/image/bulk_upload.svg" alt="ornament" />
      )}

      <Box>
        <Typography fontWeight={600} fontSize={22} mb={1}>
          Tarik Dokumen atau klik Unggah Massal
        </Typography>

        <Typography fontSize={12} fontWeight={500} sx={{ color: 'text.secondary' }}>
          Ukuran dokumen maksimum 5 MB dengan format xlsx
        </Typography>
      </Box>
    </Stack>
  );
}
