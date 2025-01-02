// @mui
import { Box, Typography, Stack, Divider, LinearProgress, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
// assets
import { UploadIllustration } from '../../assets';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

export default function BlockContent({ file, isUploading, uploadProgress, handleUpload }) {

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
