import { useMutation } from 'react-query';
import { getDownloadCashflows } from 'src/query/request/cashflow';

const createData = async (payload) => {
  const { data } = await getDownloadCashflows(payload);

  return data;
};

export const useDownloadCashflow = () => {
  const createMutation = useMutation((payload) => createData(payload));

  return createMutation;
};
