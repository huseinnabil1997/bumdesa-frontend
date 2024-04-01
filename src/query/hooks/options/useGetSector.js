import { useQuery } from 'react-query';
import { getSector } from '../../request/options';

const fetchData = async (param) => {
  try {
    const { data } = await getSector(param);
    return data?.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetSector = (param) => {
  const getQuery = useQuery(['GET_SECTOR', param?.keyword], () => fetchData(param));

  return getQuery;
};
