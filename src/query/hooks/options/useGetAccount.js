import { useQuery } from 'react-query';
import { getAccountOpt } from '../../request/options';

const fetchData = async (param) => {
  try {
    const { data } = await getAccountOpt(param);
    return data?.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetAccount = (param) => {
  const getQuery = useQuery(['GET_ACCOUNTS', param?.dis_id], () => fetchData(param));

  return getQuery;
};
