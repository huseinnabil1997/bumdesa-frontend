import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, Typography, Stack } from '@mui/material';

// ----------------------------------------------------------------------

RHFTextAreaField.propTypes = {
  name: PropTypes.string,
  require: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default function RHFTextAreaField({ name, require, ...other }) {
  const { control } = useFormContext();

  return (
    <Stack>
      {other?.label && (
        <Typography variant="caption" sx={{ mb: 0.5 }} fontWeight={600}>
          {other?.label}
          {require && <span style={{ color: 'red' }}>*</span>}
        </Typography>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            fullWidth
            placeholder="Contoh: Hilangkan kerumitan pencatatan keuangan manual dan buat laporan keuangan BUMDesa/BUMDesa Bersama lebih cepat dan mudah"
            variant="outlined"
            multiline
            rows={4}
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
    </Stack>
  );
}
