import { useQuery } from 'react-query';
import { getSupervisor } from 'src/query/request/supervisor';

const fetchData = async (id) => {
  try {
    const { data } = await getSupervisor(id);

    return data?.data ?? null;
  } catch (err) {
    throw new Error();
  }
};

export const useGetSupervisor = (id) => {
  const getQuery = useQuery(['GET_SUPERVISOR', id], () => fetchData(id), {
    enabled: !!id && id !== 'create',
  });

  return getQuery;
};
