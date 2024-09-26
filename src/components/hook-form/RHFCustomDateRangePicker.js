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
  const [endYear, setEndYear] = useState(new Date().getFullYear());
  const [view, setView] = useState('year'); // 'year', 'month', 'day'
  const [currentPage, setCurrentPage] = useState(0);
  const [fromMonthView, setFromMonthView] = useState(false);
  const [startMonth, setStartMonth] = useState(selectedDate[0].month);
  const [endMonth, setEndMonth] = useState(selectedDate[1].month);
  const itemsPerPage = 9;

  const handleYearClick = (year) => {
    if (fromMonthView) {
      onSelectDate([{ ...selectedDate[0], year }, { ...selectedDate[1], year }]);
      setFromMonthView(false);
      onClose();
      return;
    }
  
    if (startYear === null) {
      setStartYear(year);
      onSelectDate([{ ...selectedDate[0], year }, selectedDate[1]]);
    } else if (endYear === null) {
      if (year < startYear) {
        setStartYear(year);
        setEndYear(null);
        onSelectDate([{ ...selectedDate[0], year }, selectedDate[1]]);
      } else {
        setEndYear(year);
        onSelectDate([{ ...selectedDate[0], year: startYear }, { ...selectedDate[1], year }]);
      }
    } else {
      setStartYear(year);
      setEndYear(null);
      onSelectDate([{ ...selectedDate[0], year }, selectedDate[1]]);
    }
  };

  const handleMonthClick = (month) => {
    const currentYear = new Date().getFullYear();
    const year = selectedDate[0].year || currentYear;

    if (startMonth === null) {
      setStartMonth(month);
      onSelectDate([{ ...selectedDate[0], month, year }, selectedDate[1]]);
    } else if (endMonth === null) {
      if (months.indexOf(month) < months.indexOf(startMonth)) {
        // If end month is before start month, reset start month
        setStartMonth(month);
        setEndMonth(null);
        onSelectDate([{ ...selectedDate[0], month, year }, selectedDate[1]]);
      } else {
        setEndMonth(month);
        onClose();
        onSelectDate([{ ...selectedDate[0], month: startMonth, year }, { ...selectedDate[1], month, year }]);
      }
    } else {
      setStartMonth(month);
      setEndMonth(null);
      onSelectDate([{ ...selectedDate[0], month, year }, selectedDate[1]]);
    }
  };

  const handleDayClick = (day) => {
    const newSelectedDate = [{ ...selectedDate[0], day }, selectedDate[1]];
    onSelectDate(newSelectedDate);
  };

  const handlePrevious = () => {
    if (view === 'year') {
      setStartYear(startYear - 9);
    } else if (view === 'month') {
      const newYear = startYear - 1;
      setStartYear(newYear);
      onSelectDate([{ ...selectedDate[0], year: newYear }, { ...selectedDate[1], year: newYear }]);
    } else if (view === 'day' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (view === 'year') {
      setStartYear(startYear + 9);
    } else if (view === 'month') {
      const newYear = startYear + 1;
      setStartYear(newYear);
      onSelectDate([{ ...selectedDate[0], year: newYear }, { ...selectedDate[1], year: newYear }]);
    } else if (view === 'day' && (currentPage + 1) * itemsPerPage < days.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const years = generateYears(startYear, 9);
  const months = generateMonths();
  const days = selectedDate[0].year && selectedDate[0].month ? generateDays(selectedDate[0].year, months.indexOf(selectedDate[0].month) + 1) : [];
  const paginatedDays = days.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const isMonthInRange = (month) => {
    if (startMonth && endMonth) {
      const startIndex = months.indexOf(startMonth);
      const endIndex = months.indexOf(endMonth);
      const monthIndex = months.indexOf(month);
      return startIndex <= monthIndex && monthIndex <= endIndex;
    }
    return false;
  };

  const isMonthDisabled = (month) => {
    if (startMonth && !endMonth) {
      return months.indexOf(month) < months.indexOf(startMonth);
    }
    if (endMonth && !startMonth) {
      return months.indexOf(month) > months.indexOf(endMonth);
    }
    return false;
  };

  const isYearDisabled = (year) => {
    if (startYear && !endYear) {
      return year < startYear;
    }
    if (endYear && !startYear) {
      return year > endYear;
    }
    return false;
  };

  return (
    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <Grid container alignItems="center" justifyContent="space-between" spacing={1} sx={{ mb: 2 }}>
        <Grid item>
          <IconButton onClick={handlePrevious} sx={{ color: '#777777' }}>
            <ArrowBackIosNewIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography
            fontWeight="bold"
            align="center"
            gutterBottom
            onClick={() => {
              if (view === 'month') {
                setView('year');
                setFromMonthView(true);
              }
            }}
            sx={{ cursor: view === 'month' ? 'pointer' : 'default' }}
          >
            {view === 'year' ? 'Pilih Tahun' : view === 'month' ? selectedDate[0].year : view === 'day' ? `${selectedDate[0].month} ${selectedDate[0].year}` : ''}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={handleNext} sx={{ color: '#777777' }}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container spacing={1} justifyContent="space-between">
        <Grid item xs={4}>
          <StyledButton variant={view === 'day' ? 'contained' : 'outlined'} fullWidth onClick={() => setView('day')}>
            Hari
          </StyledButton>
        </Grid>
        <Grid item xs={4}>
          <StyledButton variant={view === 'month' || fromMonthView ? 'contained' : 'outlined'} fullWidth onClick={() => {
            setView('month');
            type('month');
          }}>
            Bulan
          </StyledButton>
        </Grid>
        <Grid item xs={4}>
          <StyledButton variant={view === 'year' && !fromMonthView ? 'contained' : 'outlined'} fullWidth onClick={() => {
            setView('year');
            setFromMonthView(false);
            type('year');
          }}>
            Tahun
          </StyledButton>
        </Grid>
      </Grid>
      <Grid container spacing={1} justifyContent="center" sx={{ mt: 2 }}>
        {view === 'year' && years.map((year, index) => (
          <Grid item xs={4} key={index}>
            <StyledButton
              variant={selectedDate[0].year === year || selectedDate[1].year === year ? 'contained' : 'text'}
              onClick={() => handleYearClick(year)}
              fullWidth
              disabled={isYearDisabled(year)}
              sx={
                selectedDate[0].year === year || selectedDate[1].year === year
                  ? { backgroundColor: '#1078CA', color: 'white' }
                  : selectedDate[0].year && selectedDate[1].year && year >= selectedDate[0].year && year <= selectedDate[1].year
                    ? { backgroundColor: '#DDEFFC', color: '#1078CA' }
                    : {}
              }
            >
              {year}
            </StyledButton>
          </Grid>
        ))}
        {view === 'month' && months.map((month, index) => (
          <Grid item xs={4} key={index}>
            <StyledButton
              variant={selectedDate[0].month === month || startMonth === month || endMonth === month ? 'contained' : 'text'}
              onClick={() => handleMonthClick(month)}
              fullWidth
              disabled={isMonthDisabled(month)}
              sx={
                startMonth === month || endMonth === month
                  ? { backgroundColor: '#1078CA', color: 'white' }
                  : isMonthInRange(month)
                    ? { backgroundColor: '#DDEFFC', color: '#1078CA' }
                    : {}
              }
            >
              {month}
            </StyledButton>
          </Grid>
        ))}
        {view === 'day' && paginatedDays.map((day, index) => (
          <Grid item xs={4} key={index}>
            <StyledButton
              variant={selectedDate[0].day === day ? 'contained' : 'text'}
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
  if (type === 'month') {
    return `${date[0].month} ${date[0].year} - ${date[1].month} ${date[1].year}`;
  }
  if (type === 'year') {
    return `${date[0].year} - ${date[1].year}`;
  }
  return '';
};

const formatDateForValue = (date, type) => {
  if (type === 'month' && date[0].year && date[0].month && date[1].year && date[1].month) {
    const monthIndexStart = generateMonths().indexOf(date[0].month) + 1;
    const monthIndexEnd = generateMonths().indexOf(date[1].month) + 1;
    return [`${date[0].year}-${String(monthIndexStart).padStart(2, '0')}`, `${date[1].year}-${String(monthIndexEnd).padStart(2, '0')}`];
  }
  if (type === 'year' && date[0].year && date[1].year) {
    return [`${date[0].year}`, `${date[1].year}`];
  }
  // if (date[0].year && date[0].month) {
  //   const monthIndex = generateMonths().indexOf(date[0].month) + 1;
  //   return `${date[0].year}-${String(monthIndex).padStart(2, '0')}`;
  // }
  // if (date[0].year) {
  //   return `${date[0].year}`;
  // }
  return '';
};

export default function RHFCustomDatePicker({ name, require, isLoading, ...other }) {
  const { control, setValue } = useFormContext();
  const [type, setType] = useState('month');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState([{ year: new Date().getFullYear(), month: null, day: null }, { year: new Date().getFullYear(), month: null, day: null }]);
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
              type={(type) => setType(type)}
            />
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Stack>
  );
}
