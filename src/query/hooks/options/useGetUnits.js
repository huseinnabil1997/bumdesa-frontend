import { useQuery } from 'react-query';
import { getUnitOpt } from '../../request/options';

const fetchData = async () => {
  try {
    const { data } = await getUnitOpt();
    return data?.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetUnits = () => {
  const getQuery = useQuery(['GET_UNITS_OPT'], () => fetchData());

  return getQuery;
};
