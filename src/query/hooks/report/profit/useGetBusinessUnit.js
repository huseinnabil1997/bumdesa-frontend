import { useQuery } from 'react-query';
import { getBusinessUnits } from 'src/query/request/profit';

const fetchData = async (param) => {
  try {
    const { data } = await getBusinessUnits(param);
    
    return data ?? []
  } catch (err) {
    throw new Error();
  }
};

export const useGetBusinessUnits = (param) => {
  const getQuery = useQuery(['GET_BUSINESS_UNIT'], () => fetchData(param));

  return getQuery;
};
