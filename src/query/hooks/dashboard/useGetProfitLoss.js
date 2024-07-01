import { useQuery } from 'react-query';
import { getProfileLoss } from 'src/query/request/dashboard';

const fetchData = async (param) => {
  try {
    const { data } = await getProfileLoss(param);

    return data.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetProfileLoss = (param) => {
  const getQuery = useQuery(['GET_PROFIT_LOSS', param.unit, param.start_date, param.end_date], () =>
    fetchData(param)
  );

  return getQuery;
};
