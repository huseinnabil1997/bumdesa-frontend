import { useQuery } from 'react-query';
import { getEquities } from 'src/query/request/equity';

const fetchData = async (param) => {
  try {
    const { data } = await getEquities(param);
    return data.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetEquity = (param) => {
  const getQuery = useQuery(['GET_CASH_FLOW', param], () => fetchData(param), {
    enabled: !!param,
  });

  return getQuery;
};
