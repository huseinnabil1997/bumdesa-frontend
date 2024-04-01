import { useQuery } from 'react-query';
import { getCities } from '../../request/options';

const fetchData = async (param) => {
  try {
    const { data } = await getCities(param);
    return data?.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetCities = (param) => {
  const getQuery = useQuery(['GET_CITIES', param?.prov_id], () => fetchData(param), {
    enabled: !!param?.prov_id,
  });

  return getQuery;
};
