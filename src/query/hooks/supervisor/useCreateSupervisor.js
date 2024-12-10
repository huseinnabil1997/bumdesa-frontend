import { useMutation } from 'react-query';
import { createSupervisor } from 'src/query/request/supervisor';

const createData = async (payload) => {
  const { data } = await createSupervisor(payload);

  return data;
};

export const useCreateSupervisor = () => {
  const createMutation = useMutation((payload) => createData(payload));

  return createMutation;
};
