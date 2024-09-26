import { useQuery } from 'react-query';
import { getListUnit } from 'src/query/request/data-unit';

const fetchData = async (param) => {
  try {
    const { data } = await getListUnit(param);

    return data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetListUnit = (param) => {
  const getQuery = useQuery([
    'GET_LIST_UNIT',
    param.page,
    param.limit,
    param.unit,
    param.area_code,
    param.status_report,
  ], () => fetchData(param));

  return getQuery;
};
