import PropTypes from 'prop-types';
// form
import { useFormContext, Controller, TextField } from 'react-hook-form';
// @mui
import { Typography, Stack } from '@mui/material';
import DatePicker from 'react-datepicker';

// ----------------------------------------------------------------------

RHFDatePicker.propTypes = {
  name: PropTypes.string,
  format: PropTypes.string,
};

export default function RHFDatePicker({ name, format, ...other }) {
  const { control } = useFormContext();

  return (
    <Stack>
      {other?.label && (
        <Typography variant="caption" sx={{ mb: 0.5 }}>
          {other?.label} {other?.require && <span style={{ color: 'red' }}>*</span>}
        </Typography>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <DatePicker
            {...field}
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            dateFormat={format}
            InputProps={{
              style: {
                width: '100%',
              },
            }}
          />
        )}
      />
    </Stack>
  );
}
