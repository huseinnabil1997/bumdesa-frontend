import { useQuery } from 'react-query';
import { getListBumdesa } from 'src/query/request/bumdesa';
import { searchRegex } from 'src/utils/regex';

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
  ], () => fetchData(param), {
    enabled:
      !!searchRegex.test(param.search) ||
      !!param.province ||
      !!param.city ||
      !!param.district ||
      !!param.subdistrict,
  });

  return getQuery;
};
