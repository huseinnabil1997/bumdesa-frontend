import { useQuery } from 'react-query';
import { getBumdesaById } from 'src/query/request/bumdesa';
import { useRouter } from 'next/router';

export const useGetBumdesaById = (id) => {
  const router = useRouter();

  const fetchData = async (id) => {
    try {
      const { data } = await getBumdesaById(id);
      return data.data ?? null;
    } catch (error) {
      if (error.code === 404 && id !== 0) {
        router.push('/404');
      }
      throw new Error();
    }
  };

  const getQuery = useQuery(['GET_BUMDESA_BY_ID', id], () => fetchData(id), { enabled: id != 0 });

  return getQuery;
};
