import { useQuery } from 'react-query';
import { getStatistics } from 'src/query/request/dashboard';

const fetchData = async (param) => {
  try {
    const { data } = await getStatistics(param);

    return data.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetStatistics = (param) => {
  const getQuery = useQuery(['GET_STATISTICS', param.date], () => fetchData(param));

  return getQuery;
};
