import { useQuery } from 'react-query';
import { getUnits } from 'src/query/request/unit';

const fetchData = async (param) => {
  try {
    const { data } = await getUnits(param);

    return data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetUnits = (param) => {
  const getQuery = useQuery(['GET_UNITS'], () => fetchData(param));

  return getQuery;
};
