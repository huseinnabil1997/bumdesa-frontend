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
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { checkUrlImage } from 'src/utils/helperFunction';

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
  name: PropTypes.string,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  helperText: PropTypes.node,
  sx: PropTypes.object,
  label: PropTypes.string,
  imageFrom: PropTypes.string,
  errorPosition: PropTypes.string,
};

export default function UploadPhoto({
  name,
  label,
  error,
  file,
  helperText,
  sx,
  imageFrom,
  errorPosition,
  ...other
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [isValidImage, setIsValidImage] = useState(false);
  const [fileRejections, setFileRejections] = useState([]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    multiple: false,
    ...other,
    accept: 'image/png, image/jpg, image/jpeg',
    onDropAccepted: () => {
      setFileRejections([]); // Tambahkan ini untuk menghapus fileRejections
    },
    onDropRejected: (rejectedFiles) => {
      setFileRejections(rejectedFiles);
    },
  });

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
    setValue(`${name}`, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  useEffect(() => {
    if (file && typeof file === 'string') {
      const checkImage = async () => {
        const isValid = await checkUrlImage(
          `${process.env.NEXT_PUBLIC_BUMDESA_ASSET}${imageFrom}/${file}`
        );
        setIsValidImage(isValid);
        return isValid;
      };

      checkImage();
    }
  }, [file]);

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
                handleOpenModal(
                  isString(file)
                    ? isValidImage
                      ? `${process.env.NEXT_PUBLIC_BUMDESA_ASSET}${imageFrom}/${file}`
                      : '/image/default_image.png'
                    : file.preview
                );
              } else {
                handleClickUpload();
              }
            }}
          >
            <input {...getInputProps()} ref={fileInputRef} />

            {file && (
              <Image
                alt="image"
                src={
                  isString(file)
                    ? isValidImage
                      ? `${process.env.NEXT_PUBLIC_BUMDESA_ASSET}${imageFrom}/${file}`
                      : '/image/default_image.png'
                    : file.preview
                }
                sx={{ zIndex: 8 }}
              />
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
              {file ? (
                <Iconify icon={'f7:photo-fill'} sx={{ width: 24, height: 24 }} />
              ) : (
                <Iconify icon={'ic:round-add-a-photo'} sx={{ width: 24, height: 24 }} />
              )}
            </PlaceholderStyle>
          </DropZoneStyle>
        </RootStyle>

        <Stack
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
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
            {helperText && <>{helperText}</>}
          </Box>
          {fileRejections.length > 0 && errorPosition === 'right' && (
            <RejectionFiles errorPosition={errorPosition} fileRejections={fileRejections} />
          )}
        </Stack>
      </Container>
      {fileRejections.length > 0 && errorPosition === 'bottom' && (
        <RejectionFiles errorPosition={errorPosition} fileRejections={fileRejections} />
      )}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'auto',
            bgcolor: 'background.paper',
            boxShadow: 24,
          }}
        >
          {modalImage && (
            <Image src={modalImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          )}
        </Box>
      </Modal>
    </>
  );
}
