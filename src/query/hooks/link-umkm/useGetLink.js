import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { getLink } from 'src/query/request/link-umkm';

const fetchData = async (router) => {
  try {
    const { data } = await getLink();

    return data?.data ?? [];
  } catch (err) {
    if (err.code === 404) {
      router.push('/404');
    }
    throw new Error();
  }
};

export const useGetLink = () => {
  const router = useRouter();
  const getQuery = useQuery(['GET_LINK_UMKM'], () => fetchData(router));

  return getQuery;
};