import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import {
  TextField, Typography, Stack, CircularProgress, InputAdornment, IconButton, Grid, Box, Popper, Paper, ClickAwayListener
} from '@mui/material';
import { NumericFormat } from 'react-number-format';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { StyledButton } from 'src/theme/custom/Button';
import RHFAutocomplete from './RHFAutocomplete';

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

const generateYears = (startYear, count) => Array.from({ length: count }, (_, i) => startYear + i);

const generateListYears = () => {
  const startYear = 2000;
  const endYear = new Date().getFullYear();
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push({ label: year, value: year });
  }
  return years;
};

const generateMonths = () => [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const generateMonthsToText = (month) => {
  if (month?.length < 3) {
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return months[parseInt(month) - 1];
  }
  return month;
};

const generateDays = (year, month) => Array.from({ length: new Date(year, month, 0).getDate() }, (_, i) => i + 1);

const RHFCustomRangeDatePicker = ({ onSelectDate, selectedDate, type }) => {
  const [startYear, setStartYear] = useState(selectedDate[0].year || new Date().getFullYear());
  const [endYear, setEndYear] = useState(selectedDate[1].year || new Date().getFullYear());
  const [view, setView] = useState(type);
  const [currentPage, setCurrentPage] = useState(0);
  const [fromMonthView, setFromMonthView] = useState(false);
  const [startMonth, setStartMonth] = useState(generateMonthsToText(selectedDate[0].month) || null);
  const [endMonth, setEndMonth] = useState(generateMonthsToText(selectedDate[1].month) || null);
  const itemsPerPage = 9;
  const [paginationStartYear, setPaginationStartYear] = useState(Math.floor((selectedDate[0].year || new Date().getFullYear()) / 9) * 9);
  const yearsForMonth = generateListYears();

  useEffect(() => {
    if (startYear) {
      setPaginationStartYear(Math.floor(startYear / 9) * 9);
    }
  }, [startYear]);

  const handleYearClick = (year) => {
    if (fromMonthView) {
      onSelectDate([{ ...selectedDate[0], year }, { ...selectedDate[1], year }]);
      setFromMonthView(true);
      setView('month');
      // onClose();
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
        setStartMonth(month);
        setEndMonth(null);
        onSelectDate([{ ...selectedDate[0], month, year }, selectedDate[1]]);
      } else {
        setEndMonth(month);
        // onClose();
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
      setPaginationStartYear(paginationStartYear - 9);
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
      setPaginationStartYear(paginationStartYear + 9);
    } else if (view === 'month') {
      const newYear = startYear + 1;
      setStartYear(newYear);
      onSelectDate([{ ...selectedDate[0], year: newYear }, { ...selectedDate[1], year: newYear }]);
    } else if (view === 'day' && (currentPage + 1) * itemsPerPage < days.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const years = generateYears(paginationStartYear, 9);
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

  return (
    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <Grid container alignItems="center" justifyContent="space-between" spacing={1} sx={{ mb: 2 }}>
        <Grid item>
          <IconButton onClick={handlePrevious} sx={{ color: '#777777' }}>
            <ArrowBackIosNewIcon />
          </IconButton>
        </Grid>
        <Grid item>
          {view === 'month' ? (
            <Box>
              <RHFAutocomplete
                placeholder="Pilih Tahun"
                require
                name="yearForMonth"
                loading={false}
                size="small"
                options={yearsForMonth?.map((option) => option) ?? []}
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}
                onChange={(event, newValue) => {
                  onSelectDate([{ ...selectedDate[0], year: newValue?.value }, { ...selectedDate[1], year: newValue?.value }]);
                }}
                sx={{ minWidth: 150 }}
                clearOnEscape={false}
                clearIcon={null}
                defaultValue={selectedDate[0].year ? { label: selectedDate[0].year, value: selectedDate[0].year } : { label: new Date().getFullYear(), value: new Date().getFullYear() }}
              />
            </Box>
          ) : (
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
          )}
        </Grid>
        <Grid item>
          <IconButton onClick={handleNext} sx={{ color: '#777777' }}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container spacing={1} justifyContent="space-between">
        <Grid item xs={6}>
          <StyledButton variant={view === 'month' || fromMonthView ? 'contained' : 'outlined'} fullWidth onClick={() => {
            setView('month');
            onSelectDate([{ ...selectedDate[0], month: startMonth }, { ...selectedDate[1], month: endMonth }]);
          }}>
            Bulan
          </StyledButton>
        </Grid>
        <Grid item xs={6}>
          <StyledButton variant={view === 'year' && !fromMonthView ? 'contained' : 'outlined'} fullWidth onClick={() => {
            setView('year');
            setFromMonthView(false);
            onSelectDate([{ ...selectedDate[0], month: null }, { ...selectedDate[1], month: null }]);
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
              sx={
                parseInt(selectedDate[0].year) === year || parseInt(selectedDate[1].year) === year
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

const formatDateForDisplay = (date) => {
  if (date[0].year && date[0].month && date[1].year && date[1].month) {
    return `${generateMonthsToText(date[0].month)} ${date[0].year} - ${generateMonthsToText(date[1].month)} ${date[1].year}`;
  }
  if (date[0].year && date[1].year) {
    return `${date[0].year} - ${date[1].year}`;
  }
  return '';
};

const formatDateForValue = (date) => {
  if (date[0]?.year && date[0]?.month && date[1]?.year && date[1]?.month) {
    const monthIndexStart = generateMonths().indexOf(date[0].month) + 1;
    const monthIndexEnd = generateMonths().indexOf(date[1].month) + 1;
    return [`${date[0].year}-${String(monthIndexStart).padStart(2, '0')}`, `${date[1].year}-${String(monthIndexEnd).padStart(2, '0')}`];
  }
  if (date[0]?.year && date[1]?.year) {
    return [`${date[0].year}`, `${date[1].year}`];
  }
  return '';
};

const formatDefaultDate = (defaultDate) => {
  const startYear = defaultDate[0]?.split('-')[0];
  const endYear = defaultDate[1]?.split('-')[0];
  const startMonth = defaultDate[0]?.split('-')[1];
  const endMonth = defaultDate[1]?.split('-')[1];
  return [{ year: startYear, month: startMonth, day: null }, { year: endYear, month: endMonth, day: null }];
};

const autoGenerateType = (date) => {
  if (date[0]?.year && date[0]?.month && date[1]?.year && date[1]?.month) {
    return 'month';
  }
  return 'year';
}

export default function RHFCustomDatePicker({ name, require, isLoading, type, ...other }) {
  const { control, setValue, getValues } = useFormContext();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const defaultDate = getValues(name);
  const [selectedDate, setSelectedDate] = useState(formatDefaultDate(defaultDate) || [{ year: new Date().getFullYear(), month: null, day: null }, { year: new Date().getFullYear(), month: null, day: null }]);
  const anchorRef = useRef(null);

  const handleSelectDate = (date) => {
    if (date[0].year > date[1].year) {
      setSelectedDate([{ year: date[1].year, month: date[1].month, day: date[1].day }, { year: date[0].year, month: date[0].month, day: date[0].day }]);
      setValue(name, formatDateForValue([{ year: date[1].year, month: date[1].month, day: date[1].day }, { year: date[0].year, month: date[0].month, day: date[0].day }]))
    } else {
      setSelectedDate(date);
      setValue(name, formatDateForValue(date))
    }
  };

  const handleClickAway = () => {
    setShowDatePicker(false);
  };

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
            value={formatDateForDisplay(selectedDate)}
            ref={anchorRef}
            onClick={() => setShowDatePicker(!showDatePicker)}
            autoComplete="off"
            inputProps={{ readOnly: true }}
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
              type={type || autoGenerateType(selectedDate)}
            />
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Stack>
  );
}
