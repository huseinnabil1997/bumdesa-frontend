import { useQuery } from 'react-query';
import { getBalances } from 'src/query/request/balance';

const fetchData = async (param) => {
  try {
    const { data } = await getBalances(param);
    return data.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetBalance = (param) => {
  const getQuery = useQuery(['GET_BALANCE', param], () => fetchData(param), {
    enabled: !!param,
  });

  return getQuery;
};
