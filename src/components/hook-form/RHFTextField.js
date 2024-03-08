import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
  name: PropTypes.string,
};

export default function RHFTextField({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
          InputLabelProps={{ shrink: true }}
          sx={{
            '.MuiFormLabel-asterisk': { color: 'red' },
            'input::-webkit-outer-spin-button,input::-webkit-inner-spin-button': {
              '-webkit-appearance': 'none',
              margin: 0,
            },
            ...other.sx,
          }}
        />
      )}
    />
  );
}
