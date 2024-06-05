import { useQuery } from 'react-query';
import { getJurnals } from 'src/query/request/jurnal';

const fetchData = async (param) => {
  try {
    const { data } = await getJurnals(param);

    return data?.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetJurnals = (param) => {
  const getQuery = useQuery(['GET_JURNALS', param.page, param.start_date, param.end_date], () => fetchData(param), {
    enabled: !!(param?.page && param?.start_date && param?.end_date),
  });

  return getQuery;
};
