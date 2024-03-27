import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, Typography, Stack } from '@mui/material';

// ----------------------------------------------------------------------

RHFSelect.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
};

export default function RHFSelect({ name, children, ...other }) {
  const { control } = useFormContext();

  return (
    <Stack>
      {other?.label && (
        <Typography variant="caption" sx={{ mb: 0.5 }} fontWeight={600}>
          {other?.label} {other?.require && <span style={{ color: 'red' }}>*</span>}
        </Typography>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            select
            fullWidth
            SelectProps={{ native: true }}
            error={!!error}
            helperText={error?.message}
            {...other}
            sx={{
              '.MuiFormLabel-asterisk': { color: 'red' },
              '.MuiFormHelperText-root': { marginLeft: 0 },
              ...other.sx,
            }}
            label=""
          >
            {children}
          </TextField>
        )}
      />
    </Stack>
  );
}
