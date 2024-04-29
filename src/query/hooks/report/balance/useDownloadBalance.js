import { useMutation } from 'react-query';
import { getDownloadBalances } from 'src/query/request/balance';

const createData = async (payload) => {
  const { data } = await getDownloadBalances(payload);

  return data;
};

export const useDownloadBalance = () => {
  const createMutation = useMutation((payload) => createData(payload));

  return createMutation;
};
