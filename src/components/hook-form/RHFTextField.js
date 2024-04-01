import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, Typography, Stack } from '@mui/material';

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
  name: PropTypes.string,
  require: PropTypes.bool,
};

export default function RHFTextField({ name, require, ...other }) {
  const { control } = useFormContext();

  return (
    <Stack>
      {other?.label && (
        <Typography variant="caption" sx={{ mb: 0.5 }} fontWeight={600}>
          {other?.label} {require && <span style={{ color: 'red' }}>*</span>}
        </Typography>
      )}
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
            sx={{
              '.MuiFormLabel-asterisk': { color: 'red' },
              'input::-webkit-outer-spin-button,input::-webkit-inner-spin-button': {
                WebkitAppearance: 'none',
                margin: 0,
              },
              '.MuiFormHelperText-root': { marginLeft: 0 },
              '::-webkit-inner-spin-button,::-webkit-outer-spin-button': {
                WebkitAppearance: 'none',
              },
              ...other.sx,
            }}
            label=""
          />
        )}
      />
    </Stack>
  );
}
