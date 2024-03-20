import { useQuery } from 'react-query';
import { getSubdistricts } from '../request/options';

const fetchData = async (param) => {
  try {
    const { data } = await getSubdistricts(param);
    return data?.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetSubdistricts = (param) => {
  const getQuery = useQuery(['GET_SUBDISTRICTS', param?.dis_id], () => fetchData(param), {
    enabled: !!param?.dis_id,
  });

  return getQuery;
};
