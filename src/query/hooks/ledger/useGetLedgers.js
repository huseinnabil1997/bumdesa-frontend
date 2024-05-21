import { useQuery } from 'react-query';
import { getLedgers } from 'src/query/request/ledger';

const fetchData = async (param) => {
  try {
    const { data } = await getLedgers(param);

    return data?.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetLedgers = (param) => {
  const getQuery = useQuery(
    [
      'GET_LEDGERS',
      param.page,
      param.date,
      param?.account_code,
      param?.start_date,
      param?.end_date,
    ],
    () => fetchData(param),
    {
      enabled: !!(param?.account_code && param?.start_date && param?.end_date),
    }
  );

  return getQuery;
};
