import { useQuery } from 'react-query';
import { getDistricts } from '../request/options';

const fetchData = async (param) => {
  try {
    const { data } = await getDistricts(param);
    return data?.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetDistricts = (param) => {
  const getQuery = useQuery(['GET_DISTRICTS', param?.city_id], () => fetchData(param), {
    enabled: !!param?.city_id,
  });

  return getQuery;
};
