import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Typography, Stack, CircularProgress, InputAdornment, IconButton, Grid, Box, Popper, Paper, ClickAwayListener } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { StyledButton } from 'src/theme/custom/Button';

// ----------------------------------------------------------------------

RHFCustomDatePicker.propTypes = {
  name: PropTypes.string,
  require: PropTypes.bool,
  isLoading: PropTypes.bool,
  type: PropTypes.oneOf(['year', 'month', 'day']),
};

const CurrencyFormatCustom = ({ inputRef, onChange, ...other }) => (
  <NumericFormat
    {...other}
    getInputRef={inputRef}
    onValueChange={(values) => {
      onChange({
        target: {
          name: other.name,
          value: values.value,
        },
      });
    }}
    thousandSeparator="."
    decimalSeparator=","
    decimalScale={0}
    isNumericString
  />
);

const generateYears = (startYear, count) => {
  const years = [];
  for (let i = 0; i < count; i++) {
    years.push(startYear + i);
  }
  return years;
};

const generateMonths = () => [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const generateDays = (year, month) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

const RHFCustomRangeDatePicker = ({ onSelectDate, selectedDate, onClose, type }) => {
  const [startYear, setStartYear] = useState(new Date().getFullYear());
  const [view, setView] = useState('year'); // 'year', 'month', 'day'
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;

  const handleYearClick = (year) => {
    if (type === 'year') {
      onSelectDate({ year, month: null, day: null });
      onClose();
    } else {
      setView('month');
      onSelectDate({ year, month: null, day: null });
    }
  };

  const handleMonthClick = (month) => {
    if (type === 'month') {
      onSelectDate({ ...selectedDate, month, day: null });
      onClose();
    } else {
      setView('day');
      onSelectDate({ ...selectedDate, month, day: null });
    }
  };

  const handleDayClick = (day) => {
    const newSelectedDate = { ...selectedDate, day };
    onSelectDate(newSelectedDate);
    onClose();
  };

  const handlePrevious = () => {
    if (view === 'year') {
      setStartYear(startYear - 9);
    } else if (view === 'month') {
      setStartYear(startYear - 1);
      onSelectDate({ ...selectedDate, year: startYear - 1 });
    } else if (view === 'day' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNext = () => {
    if (view === 'year') {
      setStartYear(startYear + 9);
    } else if (view === 'month') {
      setStartYear(startYear + 1); 
      onSelectDate({ ...selectedDate, year: startYear + 1 }); 
    } else if (view === 'day' && (currentPage + 1) * itemsPerPage < days.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const years = generateYears(startYear, 9);
  const months = generateMonths();
  const days = selectedDate.year && selectedDate.month ? generateDays(selectedDate.year, months.indexOf(selectedDate.month) + 1) : [];
  const paginatedDays = days.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <Grid container alignItems="center" justifyContent="space-between" spacing={1} sx={{ mb: 2 }}>
        <Grid item>
          <IconButton onClick={handlePrevious} sx={{ color: '#777777' }}>
            <ArrowBackIosNewIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography fontWeight="bold" align="center" gutterBottom>
            {selectedDate.year ? `${selectedDate.day ? selectedDate.day + ' ' : ''}${selectedDate.month ? selectedDate.month + ' ' : ''}${selectedDate.year}` : 'Pilih Tanggal'}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={handleNext} sx={{ color: '#777777' }}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container spacing={1} justifyContent="space-between">
        {type === 'day' && (
          <Grid item xs={4}>
            <StyledButton variant={view === 'day' ? 'contained' : 'outlined'} fullWidth onClick={() => setView('day')}>
              Hari
            </StyledButton>
          </Grid>
        )}
        {(type === 'day' || type === 'month') && (
          <Grid item xs={type === 'month' ? 6 : 4}>
            <StyledButton variant={view === 'month' ? 'contained' : 'outlined'} fullWidth onClick={() => setView('month')}>
              Bulan
            </StyledButton>
          </Grid>
        )}
        <Grid item xs={type === 'year' ? 12 : type === 'month' ? 6 : 4}>
          <StyledButton variant={view === 'year' ? 'contained' : 'outlined'} fullWidth onClick={() => setView('year')}>
            Tahun
          </StyledButton>
        </Grid>
      </Grid>
      <Grid container spacing={1} justifyContent="center" sx={{ mt: 2 }}>
        {view === 'year' && years.map((year, index) => (
          <Grid item xs={4} key={index}>
            <StyledButton
              variant={selectedDate.year === year ? 'contained' : 'text'}
              onClick={() => handleYearClick(year)}
              fullWidth
            >
              {year}
            </StyledButton>
          </Grid>
        ))}
        {view === 'month' && months.map((month, index) => (
          <Grid item xs={4} key={index}>
            <StyledButton
              variant={selectedDate.month === month ? 'contained' : 'text'}
              onClick={() => handleMonthClick(month)}
              fullWidth
            >
              {month}
            </StyledButton>
          </Grid>
        ))}
        {view === 'day' && paginatedDays.map((day, index) => (
          <Grid item xs={4} key={index}>
            <StyledButton
              variant={selectedDate.day === day ? 'contained' : 'text'}
              onClick={() => handleDayClick(day)}
              fullWidth
            >
              {day}
            </StyledButton>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const formatDateForDisplay = (date, type) => {
  if (type === 'year' && date.year) {
    return `${date.year}`;
  }
  if (type === 'month' && date.year && date.month) {
    return `${date.month} ${date.year}`;
  }
  if (type === 'day' && date.year && date.month && date.day) {
    return `${date.day} ${date.month} ${date.year}`;
  }
  return '';
};

const formatDateForValue = (date, type) => {
  if (type === 'year' && date.year) {
    return `${date.year}`;
  }
  if (type === 'month' && date.year && date.month) {
    const monthIndex = generateMonths().indexOf(date.month) + 1;
    return `${date.year}-${String(monthIndex).padStart(2, '0')}`;
  }
  if (type === 'day' && date.year && date.month && date.day) {
    const monthIndex = generateMonths().indexOf(date.month) + 1;
    return `${date.year}-${String(monthIndex).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
  }
  return '';
};

export default function RHFCustomDatePicker({ name, require, isLoading, type = 'day', ...other }) {
  const { control, setValue } = useFormContext();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState({ year: null, month: null, day: null });
  const anchorRef = React.useRef(null);

  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  const handleClickAway = () => {
    setShowDatePicker(false);
  };

  React.useEffect(() => {
    setValue(name, formatDateForValue(selectedDate, type));
  }, [selectedDate, setValue, name, type]);

  return (
    <Stack>
      {other?.label && (
        <Typography variant="caption" sx={{ mb: 0.5 }} fontWeight={600}>
          {other?.label}
          {require && <span style={{ color: 'red', marginLeft: '2px' }}>*</span>}
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
            value={formatDateForDisplay(selectedDate, type)} 
            onChange={() => field.onChange(formatDateForValue(selectedDate, type))}
            ref={anchorRef} 
            onClick={() => setShowDatePicker(!showDatePicker)}
            autoComplete="off"
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
            }}
            label=""
            InputProps={{
              ...other.InputProps,
              inputComponent: other.type === 'currency' ? CurrencyFormatCustom : null,
              startAdornment:
                other.type === 'currency' ? (
                  <Typography fontSize={14} sx={{ color: '#777', mr: 1 }}>
                    Rp{' '}
                  </Typography>
                ) : (
                  <>{isLoading && <CircularProgress size={12} color="primary" sx={{ ml: 1 }} />}</>
                ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <DateRangeIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <Popper open={showDatePicker} anchorEl={anchorRef.current} placement="bottom-start">
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper sx={{ maxWidth: 320, maxHeight: 316 }}>
            <RHFCustomRangeDatePicker
              onSelectDate={handleSelectDate}
              selectedDate={selectedDate}
              onClose={() => setShowDatePicker(false)}
              type={type}
            />
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Stack>
  );
}
