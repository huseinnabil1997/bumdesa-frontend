import { useMutation } from 'react-query';
import { updateSupervisor } from 'src/query/request/supervisor';

const updateData = async (payload) => {
  const { data } = await updateSupervisor({ id: payload.id, payload });

  return data;
};

export const useUpdateSupervisor = () => {
  const updateMutation = useMutation((payload) => updateData(payload));

  return updateMutation;
};
