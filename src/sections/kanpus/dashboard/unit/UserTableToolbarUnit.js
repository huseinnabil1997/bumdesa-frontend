import PropTypes from 'prop-types';
import { Stack, InputAdornment, TextField } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import { searchRegex } from 'src/utils/regex';

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
        error={!searchRegex.test(filterName) && filterName !== ''}
        helperText={!searchRegex.test(filterName) && filterName !== '' ? 'Pencarian tidak valid' : ''}
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        onKeyDown={(event) =>
          !searchRegex.test(event.target.value) && event.target.value !== ''
            ? null
            : handleInputChange(event)
        }
        placeholder="Cari Unit Usaha"
        sx={{
          width: '100%', // Menggunakan persen agar responsif
          maxWidth: '424px',
          '& .MuiInputBase-root': {
            height: '44px',
          },
          '& .MuiInputBase-input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #fff inset',
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
