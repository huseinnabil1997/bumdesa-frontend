import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Paper, Typography } from '@mui/material';
// utils
// import { fData } from '../../utils/formatNumber';

// ----------------------------------------------------------------------

RejectionBulkFiles.propTypes = {
  fileRejections: PropTypes.array,
  errorPosition: PropTypes.string,
};

export default function RejectionBulkFiles({ errorPosition, fileRejections }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: errorPosition === 'bottom' ? 1 : 0,
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
        {fileRejections.map(({ file, errors }) => {
          const { path, size } = file;

          return (
            <Box key={path} sx={{ my: 1 }}>
              {/* <Typography variant="subtitle2" noWrap>
                {path} - {fData(size)}
              </Typography> */}

              {errors.map((error) => (
                <Typography key={error.code} variant="caption" component="p">
                  {error.code === 'file-too-large' && 'Ukuran dokumen maksimum 5 MB'}
                  {error.code === 'file-invalid-type' &&
                    'Format dokumen tidak sesuai (xlsx)'}
                  {error.code === 'file-format-invalid' &&
                    'Format dokumen tidak sesuai (xlsx)'}
                </Typography>
              ))}
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}
