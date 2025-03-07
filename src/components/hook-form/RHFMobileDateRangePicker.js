import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Typography, Stack, CircularProgress, ThemeProvider, createTheme } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import idLocale from 'date-fns/locale/id';
import { MobileDateRangePicker } from '@mui/lab';

RHFMobileDateRangePicker.propTypes = {
  name: PropTypes.string.isRequired,
  require: PropTypes.bool,
  isLoading: PropTypes.bool,
  value: PropTypes.array,
  onChange: PropTypes.func,
};

const theme = createTheme({
  components: {
    MuiPickersDay: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#1078CA',
            color: '#fff',
          },
        },
      },
    },
  },
});

export default function RHFMobileDateRangePicker({ name, require, isLoading, value, onChange, ...other }) {
  const { control } = useFormContext();

  const handleDateChange = (dates, onChange) => {
    let [startDate, endDate] = dates;
    if (startDate > endDate) {
      endDate = startDate;
    }
    onChange([startDate, endDate]);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={idLocale}>
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
          render={({ fieldState: { error } }) => (
            <ThemeProvider theme={theme}>
              <MobileDateRangePicker
                startText="Tanggal Mulai"
                endText="Tanggal Akhir"
                inputFormat='yyyy-MM-dd'
                toolbarFormat='d MMMM yyyy'
                disableFuture
                toolbarTitle="Pilih Rentang Tanggal"
                value={value}
                onChange={(newValue) => {
                  handleDateChange(newValue, onChange);
                }}
                mask='____-__-__'
                calendars={1}
                autoOk={true}
                showToolbar={false}
                renderInput={(startProps, endProps) => (
                  <Stack display="flex" direction="row" spacing={1} justifyContent="center" alignItems="center">
                    <TextField
                      {...startProps}
                      size="small"
                      error={!!error}
                      helperText={error?.message}
                      {...other}
                      inputProps={{ ...startProps.inputProps, readOnly: false }}
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
                        '& .MuiInputBase-input:-webkit-autofill': {
                          WebkitBoxShadow: '0 0 0 100px #fff inset',
                        },
                        minWidth: 75,
                        ...other.sx,
                      }}
                      label=""
                      InputProps={{
                        ...other.InputProps,
                        startAdornment: (
                          <>{isLoading && <CircularProgress size={12} color="primary" sx={{ ml: 1 }} />}</>
                        ),
                      }}
                    />
                    <Typography>-</Typography>
                    <TextField
                      {...endProps}
                      size="small"
                      error={!!error}
                      helperText={error?.message}
                      {...other}
                      inputProps={{ ...endProps.inputProps, readOnly: false }}
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
                        '& .MuiInputBase-input:-webkit-autofill': {
                          WebkitBoxShadow: '0 0 0 100px #fff inset',
                        },
                        ...other.sx,
                        minWidth: 75,
                      }}
                      label=""
                      InputProps={{
                        ...other.InputProps,
                        startAdornment: (
                          <>{isLoading && <CircularProgress size={12} color="primary" sx={{ ml: 1 }} />}</>
                        ),
                      }}
                    />
                  </Stack>
                )}
                {...other}
              />
            </ThemeProvider>
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
}
