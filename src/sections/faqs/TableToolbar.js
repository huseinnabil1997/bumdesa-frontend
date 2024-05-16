import PropTypes from 'prop-types';
import { Stack, InputAdornment, TextField } from '@mui/material';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

UserTableToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.string,
  handleInputChange: PropTypes.func,
};

export default function UserTableToolbar({ filterName, onFilterName, handleInputChange }) {
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5 }}>
      <TextField
        fullWidth
        helperText="Klik enter untuk mencari"
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        onKeyDown={(event) => handleInputChange(event)}
        placeholder="Cari Pertanyaan"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify
                icon={'eva:search-fill'}
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiInputBase-root': {
            height: '44px',
          },
          '& .MuiInputBase-input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #fff inset',
          }
        }}
      />
    </Stack>
  );
}
