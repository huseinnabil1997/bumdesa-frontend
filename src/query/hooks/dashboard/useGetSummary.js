import { useQuery } from 'react-query';
import { getProvinceSummary } from 'src/query/request/dashboard';

const fetchData = async (param) => {
  try {
    const { data } = await getProvinceSummary(param);

    return data ?? { data: [] };
  } catch (err) {
    throw new Error();
  }
};

export const useGetSummary = (param) => {
  const getQuery = useQuery(['GET_SUMMARY', param?.limit, param?.page, param?.area], () =>
    fetchData(param)
  );

  return getQuery;
};
