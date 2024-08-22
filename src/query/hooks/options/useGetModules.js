import { useQuery } from 'react-query';
import { getModuls } from '../../request/options';

const fetchData = async () => {
  try {
    const { data } = await getModuls();
    return data?.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetModules = () => {
  const getQuery = useQuery(['GET_MODULES_OPT'], () => fetchData());

  return getQuery;
};
