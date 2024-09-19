import PropTypes from 'prop-types';
import { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {
  Typography,
  Stack,
  TextField,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment';
import { PickersDay } from '@mui/lab';
import { useEffect } from 'react';

RHFRangeDatePicker.propTypes = {
  name: PropTypes.shape({
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
  }).isRequired,
  format: PropTypes.string,
  label: PropTypes.string,
  openTo: PropTypes.string,
  views: PropTypes.array,
  require: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.shape({
    start: PropTypes.any,
    end: PropTypes.any,
  }),
  disableFuture: PropTypes.bool,
  disabled: PropTypes.bool,
  minDate: PropTypes.string,
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

export default function RHFRangeDatePicker({
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
  // minDate,
  ...other
}) {
  const { control } = useFormContext();

  const [openPicker, setOpenPicker] = useState({ start: false, end: false });
  const [currentView, setCurrentView] = useState(null);

  useEffect(() => {
    console.log('Current view:', currentView);
  }, [currentView]);

  const handlePickerOpen = (picker) => {
    setOpenPicker((prev) => ({ ...prev, [picker]: true }));
  };

  const handlePickerClose = (picker) => {
    setOpenPicker((prev) => ({ ...prev, [picker]: false }));
  };

  const renderDay = (date, selectedDates, pickersDayProps) => {
    const startDate = moment(value?.start);
    const endDate = moment(value?.end);
    const currentDate = moment(date);

    const isInRange = currentDate.isBetween(startDate, endDate, 'day', '[]');
    const isStart = currentDate.isSame(startDate, 'day');
    const isEnd = currentDate.isSame(endDate, 'day');

    return (
      <PickersDay
        {...pickersDayProps}
        sx={{
          ...(isInRange && {
            backgroundColor: '#D3E4FF',
            color: '#000',
            '&:hover, &:focus': {
              backgroundColor: '#A6C8FF',
            },
          }),
          ...(isStart && {
            backgroundColor: '#1976d2',
            color: '#FFF',
            '&:hover, &:focus': {
              backgroundColor: '#000066',
            },
          }),
          ...(isEnd && {
            backgroundColor: '#1976d2',
            color: '#FFF',
            '&:hover, &:focus': {
              backgroundColor: '#000066',
            },
          }),
        }}
      />
    );
  };

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      {label && (
        <Typography variant="caption" sx={{ mb: 0.5 }}>
          {label}
          {require && <span style={{ color: 'red' }}>*</span>}
        </Typography>
      )}
      <Controller
        name={name.start}
        control={control}
        defaultValue={null}
        render={({ field: startField, fieldState: { error: startError } }) => (
          <ThemeProvider theme={theme}>
            <DatePicker
              {...startField}
              open={openPicker.start}
              disabled={disabled}
              label=""
              value={value?.start || startField.value}
              onChange={(date) => {
                if (onChange) {
                  onChange({ ...value, start: moment(date).format('YYYY-MM-DD') });
                } else {
                  startField.onChange(date ?? startField.value);
                }
                if (currentView === 'day') {
                  handlePickerClose('start');
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...startField}
                  {...params}
                  fullWidth
                  error={!!startError}
                  helperText={startError?.message}
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
                  onClick={disabled ? null : () => handlePickerOpen('start')}
                />
              )}
              inputFormat={format}
              views={views}
              openTo={openTo}
              orientation="portrait"
              maxDate={new Date(value?.end)}
              disableFuture={disableFuture}
              renderDay={renderDay}
              onViewChange={(view) => setCurrentView(view)}
              allowSameDateSelection={true}
            />
          </ThemeProvider>
        )}
      />
      <Typography variant="body1">
        -
      </Typography>
      <Controller
        name={name.end}
        control={control}
        defaultValue={null}
        render={({ field: endField, fieldState: { error: endError } }) => (
          <ThemeProvider theme={theme}>
            <DatePicker
              {...endField}
              open={openPicker.end}
              disabled={disabled}
              label=""
              value={value?.end || endField.value}
              onChange={(date) => {
                if (onChange) {
                  onChange({ ...value, end: moment(date).format('YYYY-MM-DD') });
                } else {
                  endField.onChange(date ?? endField.value);
                }
                if (currentView === 'day') {
                  handlePickerClose('end');
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...endField}
                  {...params}
                  fullWidth
                  error={!!endError}
                  helperText={endError?.message}
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
                  onClick={disabled ? null : () => handlePickerOpen('end')}
                />
              )}
              inputFormat={format}
              views={views}
              openTo={openTo}
              orientation="portrait"
              disableFuture={disableFuture}
              renderDay={renderDay}
              minDate={new Date(value?.start)}
              onViewChange={(view) => setCurrentView(view)}
              allowSameDateSelection={true}
            />
          </ThemeProvider>
        )}
      />
    </Stack>
  );
}
