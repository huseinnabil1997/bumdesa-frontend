import { useQuery } from 'react-query';
import { getProfiles } from 'src/query/request/profile';

const fetchData = async (param) => {
  try {
    const { data } = await getProfiles(param);

    return data.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetProfile = (param) => {
  const getQuery = useQuery(['GET_PROFILES'], () => fetchData(param));

  return getQuery;
};
