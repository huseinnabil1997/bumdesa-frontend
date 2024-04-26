import PropTypes from 'prop-types';
import isString from 'lodash/isString';
import { useDropzone } from 'react-dropzone';
// @mui
import { Box, Modal, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
//
import Image from '../Image';
import Iconify from '../Iconify';
import RejectionFiles from './RejectionFiles';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import { useRef, useState } from 'react';
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
  // padding: theme.spacing(1),
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
  imageFrom: PropTypes.string,
};

export default function UploadPhoto({ label, error, file, helperText, sx, imageFrom, ...other }) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    ...other,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const handleOpenModal = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalImage(null);
    setIsModalOpen(false);
  };

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
        <span style={{ color: 'red' }}>*</span>
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
            onClick={() => {
              if (file) {
                handleOpenModal(isString(file) ? `${process.env.NEXT_PUBLIC_BUMDESA_ASSET}/${imageFrom}/${file}` : file.preview);
              } else {
                handleClickUpload();
              }
            }}
          >
            <input {...getInputProps()} ref={fileInputRef} />

            {file && (
              <Image alt="image" src={isString(file) ? `${process.env.NEXT_PUBLIC_BUMDESA_ASSET}/${imageFrom}/${file}` : file.preview} sx={{ zIndex: 8 }} />
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

        <Stack sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
          <Box mr={2}>
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
            {helperText && helperText}
          </Box>
          {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}
        </Stack>
      </Container>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'auto', bgcolor: 'background.paper', boxShadow: 24 }}>
          {modalImage && <Image src={modalImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />}
        </Box>
      </Modal>
    </>
  );
}
