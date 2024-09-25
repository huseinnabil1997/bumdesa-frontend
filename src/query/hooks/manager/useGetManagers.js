import { useQuery } from 'react-query';
import { getOrganizations } from 'src/query/request/manager';

const fetchData = async (param) => {
  try {
    const { data } = await getOrganizations(param);

    return data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetManagers = (param) => {
  const getQuery = useQuery(['GET_MANAGERS', param.bumdesa_id, param.page, param.limit, param.search], () => fetchData(param));

  return getQuery;
};
