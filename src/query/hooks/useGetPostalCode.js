import { useQuery } from 'react-query';
import { getPostalCode } from '../request/options';

const fetchData = async (param) => {
  try {
    const { data } = await getPostalCode(param);
    return data?.data[0];
  } catch (err) {
    throw new Error();
  }
};

export const useGetPostalCode = (param) => {
  const getQuery = useQuery(['GET_POSTAL_CODE', param?.subdis_id], () => fetchData(param), {
    enabled: !!param?.subdis_id,
  });

  return getQuery;
};
