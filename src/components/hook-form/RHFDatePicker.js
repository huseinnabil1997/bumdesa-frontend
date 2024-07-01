import PropTypes from 'prop-types';
import { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {
  Typography,
  Stack,
  TextField,
  ThemeProvider,
  createTheme,
  IconButton,
} from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';

RHFDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  format: PropTypes.string,
  label: PropTypes.string,
  openTo: PropTypes.string,
  views: PropTypes.array,
  require: PropTypes.bool,
  onChange: PropTypes.func, // Added propType for onChange
  value: PropTypes.any, // Added propType for value
  disableFuture: PropTypes.bool,
  disabled: PropTypes.bool,
};

const theme = createTheme({
  components: {
    MuiPickersDay: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#1078CA',
          },
        },
      },
    },
  },
});

export default function RHFDatePicker({
  name,
  format = 'MM/dd/yyyy',
  label,
  views = ['year', 'month', 'day'],
  openTo,
  require,
  onChange,
  value,
  disabled,
  disableFuture = false,
  ...other
}) {
  const { control } = useFormContext();

  const [openPicker, setOpenPicker] = useState(false);
  // const [dateValue, setDateValue] = useState(new Date());

  const currentYear = new Date().getFullYear();

  const handlePickerOpen = () => {
    setOpenPicker(true);
  };

  const handlePickerClose = () => {
    setOpenPicker(false);
  };

  return (
    <Stack>
      {label && (
        <Typography variant="caption" sx={{ mb: 0.5 }}>
          {label}
          {require && <span style={{ color: 'red' }}>*</span>}
        </Typography>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({ field, fieldState: { error } }) => (
          <ThemeProvider theme={theme}>
            <DatePicker
              {...field}
              open={openPicker}
              disabled={disabled}
              label=""
              value={value || field.value} // Use value from props if provided
              onChange={(date) => {
                if (onChange) {
                  onChange(date); // Call onChange from props if provided
                } else {
                  field.onChange(date ?? field.value);
                }
                handlePickerClose();
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
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
                  onClick={handlePickerOpen} // Open DatePicker on TextField click
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={handlePickerOpen}>
                        <CalendarTodayRoundedIcon sx={{ fontSize: '16.25px' }} />
                      </IconButton>
                    ),
                  }}
                />
              )}
              inputFormat={format}
              views={views}
              openTo={openTo}
              orientation="portrait"
              maxDate={new Date(currentYear, 11, 31)}
              disableFuture={disableFuture}
            />
          </ThemeProvider>
        )}
      />
    </Stack>
  );
}
