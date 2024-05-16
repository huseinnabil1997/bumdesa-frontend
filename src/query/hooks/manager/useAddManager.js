import { useMutation } from 'react-query';
import { addOrganization } from 'src/query/request/manager';

const createData = async (payload) => {
  const { data } = await addOrganization(payload);

  return data;
};

export const useAddManager = () => {
  const createMutation = useMutation((payload) => createData(payload));

  return createMutation;
};
