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
    'GET_LIST_BUMDESA',
    param.search,
    param.province,
    param.city,
    param.district,
    param.subdistrict,
    param.report,
    param.page,
    param.limit,
    param.area_code,
  ], () => fetchData(param));

  return getQuery;
};
