import PropTypes from 'prop-types';
// components
import { RHFAutocomplete } from 'src/components/hook-form';
import { useGetCashFlow } from 'src/query/hooks/options/useGetCashFlow';

// ----------------------------------------------------------------------

CreateCashFlow.propTypes = {
  i: PropTypes.number,
  type: PropTypes.string,
  account: PropTypes.string,
  formChecking: PropTypes.func,
  isFirstBalance: PropTypes.bool,
};

export default function CreateCashFlow({
  formChecking,
  i,
  account,
  type,
  isFirstBalance,
  disabled = false,
}) {
  const {
    data: accOpt,
    isLoading: loadingAcc,
    isFetched,
  } = useGetCashFlow({
    account_code: account,
    balance_type: type,
    isFirstBalance,
  });

  return (
    <RHFAutocomplete
      require
      size="small"
      name={`accounts.${i}.cash_flow_code`}
      label={i === 0 ? 'Komponen Laporan Arus Kas' : ''}
      loading={loadingAcc}
      options={accOpt?.map((option) => option) ?? []}
      disabled={(isFetched && accOpt.length === 0) || formChecking(i) || disabled}
      renderOption={(props, option) => (
        <li {...props} key={option.value}>
          {option.label}
        </li>
      )}
      sx={{
        '.Mui-disabled': {
          backgroundColor:
            ((isFetched && accOpt.length === 0) || formChecking(i) || disabled) && '#ddd',
        },
      }}
    />
  );
}
