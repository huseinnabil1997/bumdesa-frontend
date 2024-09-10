import { useQuery } from 'react-query';
import { getSales } from 'src/query/request/dashboard';

const fetchData = async (param) => {
  try {
    const { data } = await getSales(param);

    return data.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetSales = (param) => {
  const getQuery = useQuery(['GET_SALES', param.date, param.bumdesa_id, param.unit], () => fetchData(param));

  return getQuery;
};
