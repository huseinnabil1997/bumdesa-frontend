import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RHFTextAreaField from 'src/components/hook-form/RHFTextAreaField';

const ModalReviewSchema = Yup.object().shape({
  message: Yup.string().required('Kesanmu untuk modul ini wajib diisi'),
  details: Yup.string().required('Ceritakan lebih detail wajib diisi'),
  rating: Yup.number().min(1, 'Rating wajib diisi').required('Rating wajib diisi'),
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%', // Ubah width menjadi persentase
  maxWidth: 400, // Tambahkan maxWidth
  bgcolor: 'background.paper',
  boxShadow: 24,
  px: 2,
  py: 3,
  borderRadius: 2,
};

const ModalReview = ({ open, handleClose, parentRating }) => {
  const [rating, setRating] = useState(parentRating);
  const [hoverRating, setHoverRating] = useState(0);

  const defaultValues = {
    message: '',
    details: '',
    rating: parentRating,
  };

  const methods = useForm({
    resolver: yupResolver(ModalReviewSchema),
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
    reset, // Tambahkan reset
  } = methods;

  useEffect(() => {
    setValue('rating', parentRating);
    setRating(parentRating);
  }, [parentRating]);

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleModalClose = () => {
    handleClose();
    reset(defaultValues); // Reset nilai ke defaultValues
    setRating(0); // Reset rating
    setHoverRating(0); // Reset hover rating
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose} // Ganti handleClose dengan handleModalClose
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            fontWeight={700}
            fontSize={{ xs: '20px', sm: '24px' }}
            id="modal-title"
            variant="h6"
            component="h2"
          >
            Tulis Ulasan
          </Typography>
          <IconButton onClick={handleModalClose}>
            {' '}
            {/* Ganti handleClose dengan handleModalClose */}
            <CloseIcon />
          </IconButton>
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          {[1, 2, 3, 4, 5].map((value) => (
            <IconButton
              key={value}
              onClick={() => {
                setRating(value);
                setValue('rating', value);
                clearErrors('rating');
              }}
              onMouseEnter={() => setHoverRating(value)} // Set hover rating
              onMouseLeave={() => setHoverRating(0)} // Reset hover rating
            >
              <StarIcon
                sx={{
                  fontSize: { xs: '36px', sm: '48px' }, // Ubah ukuran font menjadi responsif
                  color: value <= (hoverRating || rating) ? '#EDB812' : 'disabled', // Use hoverRating or rating
                  '&:hover': {
                    color: '#EDB812',
                  },
                }}
              />
            </IconButton>
          ))}
        </Box>
        {errors?.rating && (
          <Typography variant="body2" color="error" align="center" mt={1}>
            {errors?.rating?.message}
          </Typography>
        )}
        <Typography
          variant="body1"
          align="center"
          m={2}
          fontSize={{ xs: '16px', sm: '18px' }}
          fontWeight={600}
        >
          {rating === 5
            ? 'Sempurna! 🤩'
            : rating === 4
            ? 'Bagus! 😊'
            : rating === 3
            ? 'Cukup Baik! 🙂'
            : rating === 2
            ? 'Kurang Memuaskan 😕'
            : rating === 1
            ? 'Sangat Buruk 😞'
            : 'Ayo Berikan Ratingmu 😉'}
        </Typography>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <RHFTextField
              fullWidth
              label="Kesanmu untuk modul ini"
              placeholder="Contoh: Modul ini bagus untuk pemula"
              variant="outlined"
              name="message"
              require
            />
            <RHFTextAreaField
              fullWidth
              label="Ceritakan lebih detail"
              placeholder="Contoh: Hilangkan kerumitan pencatatan keuangan manual dan buat laporan keuangan BUMDesa/BUMDesa Bersama lebih cepat dan mudah"
              name="details"
              require
            />
          </Stack>
          <StyledLoadingButton
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Kirim
          </StyledLoadingButton>
        </FormProvider>
      </Box>
    </Modal>
  );
};

export default ModalReview;
