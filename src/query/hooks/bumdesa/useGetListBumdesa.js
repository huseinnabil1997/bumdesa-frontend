import { useQuery } from 'react-query';
import { getListBumdesa } from 'src/query/request/bumdesa';

const fetchData = async (param) => {
  try {
    const { data } = await getListBumdesa(param);

    return data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetListBumdesa = (param) => {
  const getQuery = useQuery([
    'GET_LIST_BUMDESA',
    param.search,
    param.province,
    param.city,
    param.district,
    param.subdistrict,
    param.report,
  ], () => fetchData(param));

  return getQuery;
};
