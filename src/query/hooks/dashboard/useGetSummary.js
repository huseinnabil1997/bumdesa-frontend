import { useQuery } from 'react-query';
import { getAreaSummary } from 'src/query/request/dashboard';

const fetchData = async (param) => {
  try {
    const { data } = await getAreaSummary(param);

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
