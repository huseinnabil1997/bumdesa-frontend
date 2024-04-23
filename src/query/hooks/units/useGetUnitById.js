import { useQuery } from 'react-query';
import { getUnitById } from 'src/query/request/unit';

const fetchData = async (id) => {
  try {
    const { data } = await getUnitById(id);
    return data.data ?? null;
  } catch (error) {
    throw new Error();
  }
};

export const useGetUnitById = (id) => {
  const getQuery = useQuery(['GET_UNIT_BY_ID', id], () => fetchData(id));

  return getQuery;
};
