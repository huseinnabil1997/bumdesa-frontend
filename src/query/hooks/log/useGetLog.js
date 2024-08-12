import { useQuery } from 'react-query';
import { getLogs } from 'src/query/request/log';

const fetchData = async (param) => {
  try {
    const { data } = await getLogs(param);

    return data?.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetLogs = (param) => {
  const getQuery = useQuery(['GET_LOGS', param?.page, param?.limit], () => fetchData(param));

  return getQuery;
};
