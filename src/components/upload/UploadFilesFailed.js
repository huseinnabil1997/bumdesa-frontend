import { alpha } from '@mui/material/styles';
import { Box, Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function UploadFilesFailed() {
  return (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        maxWidth: 350,
        borderColor: 'error.light',
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box sx={{ mr: 1 }}>
        <Typography variant="h6" color="error">
          ✖
        </Typography>
      </Box>
      <Box>
        <Box sx={{ my: 1 }}>
          <Typography variant="caption" component="p">
            Gagal mengunggah dokumen
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

