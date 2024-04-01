import PropTypes from 'prop-types';
import isString from 'lodash/isString';
import { useDropzone } from 'react-dropzone';
// @mui
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
//
import Image from '../Image';
import Iconify from '../Iconify';
import RejectionFiles from './RejectionFiles';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------
const Container = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'start',
  marginTop: '8px',
}));

const RootStyle = styled('div')(({ theme }) => ({
  width: 90,
  height: 90,
  borderRadius: '12px',
  padding: theme.spacing(1),
  marginRight: theme.spacing(2),
  border: `1px dashed ${theme.palette.grey[500_32]}`,
}));

const DropZoneStyle = styled('div')({
  zIndex: 0,
  width: '100%',
  height: '100%',
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '12px',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  '& > *': { width: '100%', height: '100%' },
  '&:hover': {
    cursor: 'pointer',
    '& .placeholder': {
      zIndex: 9,
    },
  },
});

const PlaceholderStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.neutral,
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

UploadPhoto.propTypes = {
  error: PropTypes.bool,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  helperText: PropTypes.node,
  sx: PropTypes.object,
  label: PropTypes.string,
};

export default function UploadPhoto({ label, error, file, helperText, sx, ...other }) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    ...other,
  });

  const fileInputRef = useRef(null);
  const { setValue } = useFormContext();

  const handleClickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDeletePhoto = () => {
    setValue('image', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <>
      <Typography variant="caption" fontWeight={600}>
        {label}
        <span style={{ color: 'red' }}> *</span>
      </Typography>
      <Container>
        <RootStyle
          sx={{
            ...((isDragReject || error) && {
              borderColor: 'error.light',
            }),
            ...sx,
          }}
        >
          <DropZoneStyle
            {...getRootProps()}
            sx={{
              ...(isDragActive && { opacity: 0.72 }),
            }}
          >
            <input {...getInputProps()} ref={fileInputRef} />

            {file && (
              <Image alt="avatar" src={isString(file) ? file : file.preview} sx={{ zIndex: 8 }} />
            )}

            <PlaceholderStyle
              className="placeholder"
              sx={{
                ...(file && {
                  opacity: 0,
                  color: 'common.white',
                  bgcolor: 'grey.900',
                  '&:hover': { opacity: 0.72 },
                }),
                ...((isDragReject || error) && {
                  bgcolor: 'error.lighter',
                }),
              }}
            >
              <Iconify icon={'ic:round-add-a-photo'} sx={{ width: 24, height: 24 }} />
            </PlaceholderStyle>
          </DropZoneStyle>
        </RootStyle>

        <Stack sx={{ width: 'calc(100% - 116px)', display: 'flex', justifyContent: 'center' }}>
          <Box>
            <StyledLoadingButton
              variant="contained"
              color="primary"
              sx={{ mr: 1 }}
              onClick={handleClickUpload}
            >
              Unggah Foto
            </StyledLoadingButton>
            <StyledLoadingButton
              variant="contained"
              color="grey"
              disabled={!file}
              onClick={handleDeletePhoto}
            >
              Hapus Foto
            </StyledLoadingButton>
          </Box>
          {helperText && helperText}
        </Stack>

        {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}
      </Container>
    </>
  );
}
