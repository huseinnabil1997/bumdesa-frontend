import { useQuery } from 'react-query';
import { getPositions } from 'src/query/request/manager';

const fetchData = async (param) => {
  try {
    const { data } = await getPositions(param);

    return data.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetPositions = (param) => {
  const getQuery = useQuery(['GET_POSITIONS'], () => fetchData(param));

  return getQuery;
};
