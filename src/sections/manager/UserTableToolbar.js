import PropTypes from 'prop-types';
import { Stack, InputAdornment, TextField } from '@mui/material';
import Iconify from 'src/components/Iconify';
// components

// ----------------------------------------------------------------------

UserTableToolbarUnit.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.string,
  handleInputChange: PropTypes.func,
};

export default function UserTableToolbarUnit({ filterName, onFilterName, handleInputChange }) {
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5 }}>
      <TextField
        fullWidth
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        onKeyDown={(event) => handleInputChange(event)}
        helperText="Klik enter untuk mencari"
        placeholder="Cari nama pengurus"
        sx={{
          width: '100%', // Menggunakan persen agar responsif
          maxWidth: '305px',
          '& .MuiInputBase-root': {
            height: '48px',
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
}
