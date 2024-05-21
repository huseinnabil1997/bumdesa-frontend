import { useMutation } from 'react-query';
import { updateOrganization } from 'src/query/request/manager';

const updateData = async (payload) => {
  const { data } = await updateOrganization(payload);

  return data;
};

export const useUpdateManager = () => {
  const updateMutation = useMutation((payload) => updateData(payload));

  return updateMutation;
};
