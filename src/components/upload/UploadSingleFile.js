import PropTypes from 'prop-types';
import isString from 'lodash/isString';
import { useDropzone } from 'react-dropzone';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Divider, IconButton, LinearProgress, Stack, Typography } from '@mui/material';
//
import Image from '../Image';
import RejectionFiles from './RejectionFiles';
import BlockContent from './BlockContent';
import { useEffect, useRef, useState } from 'react';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import Iconify from '../Iconify';
import RejectionBulkFiles from './RejectionBulkFiles';

// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' },
}));

// ----------------------------------------------------------------------

UploadSingleFile.propTypes = {
  error: PropTypes.bool,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  helperText: PropTypes.node,
  sx: PropTypes.object,
  onFileRejections: PropTypes.func,
};

export default function UploadSingleFile({ error = false, file, helperText, sx, onFileRejections, ...other }) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    maxSize: 5 * 1024 * 1024,
    ...other,
  });

  const inputRef = useRef(null);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = () => {
    setIsUploading(true);
    setUploadProgress(0); // Inisialisasi progress ke 0
    // Simulasi upload
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 25; // Naik 25% setiap interval
      });
    }, 500); // Setengah detik
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleCancelUpload = () => {
    setIsUploading(false);
    setUploadProgress(0);
  };

  useEffect(() => {
    if (file && !isUploading) {
      handleUpload();
    }
  }, [file]);

  useEffect(() => {
    onFileRejections(fileRejections);
  }, [fileRejections, onFileRejections]);

  console.log('file =', file);

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <Box border="1px dashed #EAEBEB" borderRadius="16px">
        <DropZoneStyle
          {...getRootProps()}
          sx={{
            ...(isDragActive && { opacity: 0.72 }),
            ...((isDragReject || error) && {
              color: 'error.main',
              borderColor: '#EAEBEB',
              borderStyle: 'dashed',
              bgcolor: 'error.lighter',
            }),
            // padding: '2% 0',
            // ...(file && {
            //   padding: '2% 0',
            // }),
          }}
        >
          <input {...getInputProps()} ref={inputRef} />

          <BlockContent file={file} isUploading={isUploading} uploadProgress={uploadProgress} handleUpload={handleUpload} />

          {file && (
            <Image
              alt="file preview"
              src={isString(file) ? file : file.preview}
              sx={{
                top: 8,
                left: 8,
                borderRadius: 1,
                position: 'absolute',
                width: 'calc(100% - 16px)',
                height: 'calc(100% - 16px)',
              }}
            />
          )}
        </DropZoneStyle>

        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
          {isUploading ? (
            <Box sx={{ width: '100%', mt: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Typography fontSize={12} fontWeight={500} color="text.secondary" sx={{ mr: 1 }}>
                {file?.name} ({(file?.size / 1000000).toFixed(3)} MB)
              </Typography>
              <LinearProgress variant="determinate" value={uploadProgress} sx={{ width: 500, height: 8, borderRadius: '16px' }} />
              <Typography fontSize={12} fontWeight={500} color="text.secondary" sx={{ ml: 1 }}>
                {uploadProgress}%
              </Typography>
              <IconButton onClick={handleCancelUpload}>
                <Iconify icon="material-symbols-light:close" sx={{ fontSize: 16, color: 'red', cursor: 'pointer' }} />
              </IconButton>
            </Box>
          ) : (
            <StyledLoadingButton
              variant="contained"
              color="primary"
              size="large"
              height={44}
              startIcon={<Iconify icon="material-symbols-light:upload" />}
              sx={{ fontSize: 16, fontWeight: 700 }}
              onClick={handleButtonClick}
            >
              Unggah Massal
            </StyledLoadingButton>
          )}
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>{fileRejections.length > 0 && <RejectionBulkFiles fileRejections={fileRejections} />}</Box>
        <StyledLoadingButton
          variant="contained"
          sx={{ width: 200, height: 42 }}
          disabled
        >
          Simpan
        </StyledLoadingButton>
      </Stack>

      {helperText && <>{helperText}</>}
    </Box>
  );
}
