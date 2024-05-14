import { useMutation } from 'react-query';
import { sendOtp } from 'src/query/request/setting';

const createData = async (payload) => {
  const { data } = await sendOtp(payload);

  return data;
};

export const useSendOtp = () => {
  const createMutation = useMutation((payload) => createData(payload));

  return createMutation;
};
