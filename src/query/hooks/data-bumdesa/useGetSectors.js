import { useQuery } from 'react-query';
import { getSectors } from 'src/query/request/unit';

const fetchData = async (param) => {
  try {
    const { data } = await getSectors(param);

    return data.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetSectors = (param) => {
  const getQuery = useQuery(['GET_SECTORS'], () => fetchData(param));

  return getQuery;
};
