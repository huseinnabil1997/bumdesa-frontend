import { useMutation } from 'react-query';
import { getDownloadProfits } from 'src/query/request/profit';

const createData = async (payload) => {
  const { data } = await getDownloadProfits(payload);

  return data;
};

export const useDownloadProfit = () => {
  const createMutation = useMutation((payload) => createData(payload));

  return createMutation;
};
