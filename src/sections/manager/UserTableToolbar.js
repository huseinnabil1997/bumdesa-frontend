import PropTypes from 'prop-types';
import { Stack, InputAdornment, TextField } from '@mui/material';
import Iconify from 'src/components/Iconify';
import { searchRegex } from 'src/utils/regex';
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
        onKeyDown={(event) =>
          !searchRegex.test(event.target.value) && event.target.value !== ''
            ? null
            : handleInputChange(event)
        }
        error={!searchRegex.test(filterName) && filterName !== ''}
        helperText={!searchRegex.test(filterName) && filterName !== '' ? 'Pencarian tidak valid' : ''}
        placeholder="Cari nama pengurus"
        sx={{
          width: '100%', // Menggunakan persen agar responsif
          maxWidth: '305px',
          '& .MuiInputBase-root': {
            height: '48px',
          },
          '& .MuiInputBase-input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #fff inset',
          }
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
