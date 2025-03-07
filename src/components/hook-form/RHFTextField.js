import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, Typography, Stack, CircularProgress } from '@mui/material';
import { NumericFormat } from 'react-number-format';

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
  name: PropTypes.string,
  require: PropTypes.bool,
  isLoading: PropTypes.bool,
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

export default function RHFTextField({ name, require, isLoading, ...other }) {
  const { control } = useFormContext();

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
            }}
          />
        )}
      />
    </Stack>
  );
}
