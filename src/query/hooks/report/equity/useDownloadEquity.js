import { useMutation } from 'react-query';
import { getDownloadCashflows } from 'src/query/request/cashflow';
import { getDownloadEquities } from 'src/query/request/equity';

const createData = async (payload) => {
  const { data } = await getDownloadEquities(payload);

  return data;
};

export const useDownloadEquity = () => {
  const createMutation = useMutation((payload) => createData(payload));

  return createMutation;
};
