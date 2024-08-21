import { useQuery } from 'react-query';
import { getDemographic } from 'src/query/request/dashboard';

const fetchData = async (param) => {
  try {
    const { data } = await getDemographic(param);

    return data.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetDemographics = (param) => {
  const getQuery = useQuery(['GET_DEMOGRAPHICS'], () => fetchData(param));

  return getQuery;
};
