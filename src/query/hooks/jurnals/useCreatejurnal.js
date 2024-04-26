import { useMutation } from 'react-query';
import { createJurnal } from 'src/query/request/jurnal';

const createData = async (payload) => {
  const { data } = await createJurnal(payload);

  return data;
};

export const useCreateJurnal = () => {
  const createMutation = useMutation((payload) => createData(payload));

  return createMutation;
};
