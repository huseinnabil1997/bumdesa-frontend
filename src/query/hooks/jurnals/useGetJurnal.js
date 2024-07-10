import { useQuery } from 'react-query';
import { getJurnal } from 'src/query/request/jurnal';
import { useRouter } from 'next/router';

const fetchData = async (id, router) => {
  try {
    const { data } = await getJurnal(id);

    return data?.data ?? [];
  } catch (err) {
    if (err.code === 404 && id !== 0) {
      router.push('/404');
    }
    throw new Error();
  }
};

export const useGetJurnal = (id, isOpen) => {
  const router = useRouter();
  const getQuery = useQuery(['GET_JURNAL', id, isOpen], () => fetchData(id, router), {
    enabled: !!id && isOpen,
  });

  return getQuery;
};