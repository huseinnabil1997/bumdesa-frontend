import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, Stack, Typography, Autocomplete, CircularProgress } from '@mui/material';

// ----------------------------------------------------------------------

RHFAutocomplete.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  require: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default function RHFAutocomplete({
  name,
  label,
  placeholder,
  helperText,
  require,
  isLoading,
  ...other
}) {
  const { control, setValue } = useFormContext();

  return (
    <Stack>
      {label && (
        <Typography variant="caption" sx={{ mb: 0.5 }} fontWeight={600}>
          {label}
          {require && <span style={{ color: 'red' }}>*</span>}
        </Typography>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Autocomplete
            {...field}
            onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
            renderInput={(params) => (
              <TextField
                placeholder={placeholder}
                error={!!error}
                helperText={error ? error?.message : helperText}
                {...params}
                label={''}
                sx={{
                  '.MuiFormHelperText-root': { marginLeft: 0 },
                  ...other.sx,
                }}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      {isLoading && <CircularProgress size={12} color="primary" sx={{ ml: 1 }} />}
                    </>
                  ),
                }}
              />
            )}
            {...other}
          />
        )}
      />
    </Stack>
  );
}
