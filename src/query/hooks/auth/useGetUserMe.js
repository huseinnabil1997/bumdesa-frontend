import { useQuery } from 'react-query';
import { getUserMe } from 'src/query/request/auth';

const fetchData = async () => {
  try {
    const { data } = await getUserMe();
    return data?.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetUserMe = (param) => {
  const getQuery = useQuery(['GET_USER_ME'], () => fetchData(), { param });

  return getQuery;
};
