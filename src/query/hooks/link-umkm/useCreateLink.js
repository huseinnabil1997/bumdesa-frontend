import { useMutation } from 'react-query';
import { createLink } from 'src/query/request/link-umkm';

const createData = async (payload) => {
  const { data } = await createLink(payload);

  return data;
};

export const useCreateLink = () => {
  const createMutation = useMutation((payload) => createData(payload));

  return createMutation;
};
