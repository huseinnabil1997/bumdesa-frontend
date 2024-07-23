import { useQuery } from 'react-query';
import { getOrganizationDetail } from 'src/query/request/manager';

const fetchData = async (id) => {
  try {
    const { data } = await getOrganizationDetail(id);
    return data.data ?? null;
  } catch (error) {
    throw new Error();
  }
};

export const useGetManagerById = (id) => {
  console.log('husein', !!id);
  const getQuery = useQuery(['GET_MANAGER_BY_ID', id], () => fetchData(id), {
    enabled: !!id,
  });

  return getQuery;
};
