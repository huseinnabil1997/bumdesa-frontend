import { useQuery } from 'react-query';
import { getProvincies } from '../request/options';

const fetchData = async () => {
  try {
    const { data } = await getProvincies();
    return data?.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetProvincies = () => {
  const getQuery = useQuery('GET_PROVINCIES', fetchData);

  return getQuery;
};
