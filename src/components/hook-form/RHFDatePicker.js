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
  required: PropTypes.bool,
  views: PropTypes.array,
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
  ...other
}) {
  const { control } = useFormContext();

  const [openPicker, setOpenPicker] = useState(false); // State to control visibility

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
          {label} {other?.require && <span style={{ color: 'red' }}>*</span>}
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
              label=""
              value={field.value}
              onChange={(date) => {
                field.onChange(date.getFullYear());
                handlePickerClose();
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                  params
                  {...other}
                  sx={{
                    '.MuiFormLabel-asterisk': { color: 'red' },
                    'input::-webkit-outer-spin-button,input::-webkit-inner-spin-button': {
                      '-webkit-appearance': 'none',
                      margin: 0,
                    },
                    '.MuiFormHelperText-root': { marginLeft: 0 },
                    '::-webkit-inner-spin-button,::-webkit-outer-spin-button': {
                      '-webkit-appearance': 'none',
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
              openTo="year"
              orientation="portrait"
            />
          </ThemeProvider>
        )}
      />
    </Stack>
  );
}
