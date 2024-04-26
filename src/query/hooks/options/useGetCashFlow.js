import { useQuery } from 'react-query';
import { getCashFlowOpt } from '../../request/options';

const fetchData = async (param) => {
  try {
    const { data } = await getCashFlowOpt(param);
    return data?.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetCashFlow = (param) => {
  const getQuery = useQuery(
    ['GET_CASH_FLOW', param?.account_code, param?.balance_type],
    () => fetchData(param),
    { enabled: !!param?.balance_type && !!param?.account_code }
  );

  return getQuery;
};
