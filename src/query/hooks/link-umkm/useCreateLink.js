import { useMutation } from 'react-query';
import { createLink } from 'src/query/request/link-umkm';

const createData = async () => {
  try {
    const { data } = await createLink();

    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const useCreateLink = () => {
  const createMutation = useMutation(() => createData());

  return createMutation;
};
