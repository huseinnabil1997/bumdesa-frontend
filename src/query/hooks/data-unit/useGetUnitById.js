import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { getUnitById } from 'src/query/request/data-unit';

export const useGetUnitById = (id) => {
  const router = useRouter();

  const fetchData = async (id) => {
    try {
      const { data } = await getUnitById(id);
      return data.data ?? null;
    } catch (error) {
      if (error.code === 404 && id !== 0) {
        router.push('/404');
      }
      throw new Error();
    }
  };

  const getQuery = useQuery(['GET_UNIT_BY_ID', id], () => fetchData(id), { enabled: id != 0 });

  return getQuery;
};
