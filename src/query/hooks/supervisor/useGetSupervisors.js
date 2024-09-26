import { useQuery } from 'react-query';
import { getSupervisors } from 'src/query/request/supervisor';
import { searchRegex } from 'src/utils/regex';

const fetchData = async (param) => {
  try {
    const { data } = await getSupervisors(param);

    return { supervisors: data?.data ?? [], page: data?.metadata?.paging };
  } catch (err) {
    throw new Error();
  }
};

export const useGetSupervisors = (param) => {
  const getQuery = useQuery(['GET_SUPERVISORS', param.page, param.limit], () => fetchData(param), {
    enabled: searchRegex.test(param.search),
  });

  return getQuery;
};
