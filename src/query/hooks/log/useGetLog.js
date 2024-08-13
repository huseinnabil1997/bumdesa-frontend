import { useQuery } from 'react-query';
import { getLogs } from 'src/query/request/log';

const fetchData = async (param) => {
  try {
    if (param.module === '0') param.module = '';
    if (param.action === '0') param.action = '';
    if (param.unit < 0) param.unit = '';

    const { data } = await getLogs(param);

    return data?.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetLogs = (param) => {
  const getQuery = useQuery(
    ['GET_LOGS', param?.page, param?.limit, param?.module, param?.action, param?.unit],
    () => fetchData(param)
  );

  return getQuery;
};
