import { useQuery } from 'react-query';
import { getJurnal } from 'src/query/request/jurnal';

const fetchData = async (id) => {
  try {
    const { data } = await getJurnal(id);

    return data?.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetJurnal = (id, isOpen) => {
  const getQuery = useQuery(['GET_JURNAL', id, isOpen], () => fetchData(id), {
    enabled: !!id && isOpen,
  });

  return getQuery;
};
