import PropTypes from 'prop-types';
import { Stack, InputAdornment, TextField } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';

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
        placeholder="Cari Unit Usaha"
        sx={{ width: 424, height: 48 }}
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
