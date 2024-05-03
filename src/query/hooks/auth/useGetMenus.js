import { useQuery } from 'react-query';
import { getMenus } from 'src/query/request/auth';

const fetchData = async () => {
  try {
    const { data } = await getMenus();
    return data?.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetMenus = (param) => {
  // const getQuery = useQuery(['GET_MENUS'], () => fetchData(), { enabled: param.length === 0 });
  const getQuery = useQuery(['GET_MENUS'], () => fetchData(), { param });

  return getQuery;
};
