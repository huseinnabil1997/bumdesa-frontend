import { useMutation } from 'react-query';
import { createUnit } from 'src/query/request/unit';

const createData = async (payload) => {
  const { data } = await createUnit(payload);

  return data;
};

export const useCreateUnit = () => {
  const createMutation = useMutation((payload) => createData(payload));

  return createMutation;
};
