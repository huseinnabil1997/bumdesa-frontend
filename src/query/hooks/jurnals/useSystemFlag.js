import { useQuery } from 'react-query';
import { getSystemFlag } from 'src/query/request/jurnal';

export const fetchData = async () => {
  const { data } = await getSystemFlag();

  return data;
};

export const useSystemFlag = () => {
  const getQuery = useQuery(['GET_SYSTEM_FLAG'], () => fetchData());

  return getQuery;
};

