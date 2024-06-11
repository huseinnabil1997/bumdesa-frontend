import { useQuery } from 'react-query';
import { getProfiles } from 'src/query/request/profile';
import { setLogo } from 'src/utils/helperFunction';

const fetchData = async (param) => {
  try {
    const { data } = await getProfiles(param);
    setLogo(data.data.photo_logo);
    return data.data ?? null;
  } catch (err) {
    throw new Error();
  }
};

export const useGetProfile = (param) => {
  const getQuery = useQuery(['GET_PROFILES'], () => fetchData(param));

  return getQuery;
};
