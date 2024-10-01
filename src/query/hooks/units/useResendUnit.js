import { useMutation } from 'react-query';
import { resendUnit } from 'src/query/request/unit';

const createData = async (payload) => {
  const { data } = await resendUnit(payload);

  return data;
};

export const useResendUnit = () => {
  const createMutation = useMutation((payload) => createData(payload));

  return createMutation;
};
