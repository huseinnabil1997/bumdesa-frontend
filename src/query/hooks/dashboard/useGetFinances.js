import { useQuery } from 'react-query';
import { getFinances } from 'src/query/request/dashboard';

const fetchData = async (param) => {
  try {
    const { data } = await getFinances(param);

    return data.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetFinances = (param) => {
  const getQuery = useQuery(['GET_FINANCES', param.date, param.unit, param.bumdesa_id], () => fetchData(param));

  return getQuery;
};
