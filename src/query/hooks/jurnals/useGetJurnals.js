import { useQuery } from 'react-query';
import { getJurnals } from 'src/query/request/jurnal';
import { searchRegex } from 'src/utils/regex';

const fetchData = async (param) => {
  try {
    const { data } = await getJurnals(param);

    return data?.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetJurnals = (param) => {
  const getQuery = useQuery(
    ['GET_JURNALS', param.page, param.start_date, param.end_date, param.search],
    () => fetchData(param),
    {
      enabled:
        !!(param?.page && param?.start_date && param?.end_date) && searchRegex.test(param.search),
    }
  );

  return getQuery;
};
