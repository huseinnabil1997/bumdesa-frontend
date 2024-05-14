import { useMutation } from 'react-query';
import { changeUserEmail } from 'src/query/request/setting';

const updateData = async (payload) => {
  const { data } = await changeUserEmail(payload);

  return data;
};

export const useChangeUserEmail = () => {
  const updateMutation = useMutation((payload) => updateData(payload));

  return updateMutation;
};
