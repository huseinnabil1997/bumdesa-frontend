import { useQuery } from 'react-query';
import { getDetailSummary } from 'src/query/request/dashboard';

const fetchData = async (param) => {
  try {
    const { data } = await getDetailSummary(param);

    return data ?? { data: [] };
  } catch (err) {
    throw new Error();
  }
};

export const useGetSummaryBumdesa = (param) => {
  const getQuery = useQuery(['GET_SUMMARY_DETAIL', param?.limit, param?.page, param?.area], () =>
    fetchData(param)
  );

  return getQuery;
};
