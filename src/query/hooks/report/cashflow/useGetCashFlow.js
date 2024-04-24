import { useQuery } from 'react-query';
import { getCashFlows } from 'src/query/request/cashflow';

const fetchData = async (param) => {
  try {
    const { data } = await getCashFlows(param);
    return data.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetBalance = (param) => {
  const getQuery = useQuery(['GET_CASH_FLOW', param], () => fetchData(param));

  return getQuery;
};
