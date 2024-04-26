import { useQuery } from 'react-query';
import { getProfits } from 'src/query/request/profit';

const fetchData = async (param) => {
  try {
    const { data } = await getProfits(param);
    return data.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetProfit = (param) => {
  const getQuery = useQuery(['GET_PROFIT', param], () => fetchData(param));

  return getQuery;
};
