import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { StyledLoadingButton } from 'src/theme/custom/Button';
import OtherContentList from './OtherContentList';
import ModalReview from './ModalReview';
import StarIcon from '@mui/icons-material/Star';

const ReviewCard = () => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0); // Added state for hover rating

  const handleClose = () => {
    setOpen(false);
    setRating(0);
  };
  
  return (
    <Box>
      <Card sx={{ minWidth: { xs: '100%', lg: 326 }, padding: '24px' }}>
        <CardContent>
          <Typography component="div" fontWeight={600} fontSize='16px'>
            Bagaimana rating modul ini menurut Anda?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2, flexDirection: 'row' }}>
          {[1, 2, 3, 4, 5].map((value) => (
            <IconButton 
              key={value} 
              onClick={() => {
                setRating(value);
                setOpen(true);
              }}
              sx={{ marginX: '-5px' }}
              onMouseEnter={() => setHoverRating(value)} // Set hover rating
              onMouseLeave={() => setHoverRating(0)} // Reset hover rating
            >
              <StarIcon 
                sx={{ 
                  fontSize: '45px', // Adjust font size based on screen size
                  color: value <= (hoverRating || rating) ? '#EDB812' : 'disabled', // Use hoverRating or rating
                  '&:hover': {
                    color: '#EDB812'
                  }
                }} 
              />
            </IconButton>
          ))}
          </Box>
          <Typography component="div" textAlign="center" fontWeight={600} fontSize='18px'>
            Ayo Berikan Ratingmu 😉
          </Typography>
          <StyledLoadingButton 
            variant="contained" 
            color="primary" 
            sx={{ marginTop: 2, width: '100%' }}
            onClick={() => setOpen(true)}
          >
            Tulis Ulasan
          </StyledLoadingButton>
        </CardContent>
      </Card>
      <OtherContentList />
      <ModalReview open={open} handleClose={handleClose} parentRating={rating} />
    </Box>
  );
};

export default ReviewCard;