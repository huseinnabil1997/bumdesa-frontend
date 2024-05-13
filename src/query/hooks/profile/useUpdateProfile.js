import { useMutation } from 'react-query';
import { updateProfile } from 'src/query/request/profile';

const updateData = async (payload) => {
  const { data } = await updateProfile(payload);

  return data;
};

export const useUpdateProfile = () => {
  const updateMutation = useMutation((payload) => updateData(payload));

  return updateMutation;
};
