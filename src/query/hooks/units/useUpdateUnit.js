import { useMutation } from 'react-query';
import { updateUnit } from 'src/query/request/unit';

const updateData = async (payload) => {
  const { data } = await updateUnit(payload);

  return data;
};

export const useUpdateUnit = () => {
  const updateMutation = useMutation((payload) => updateData(payload));

  return updateMutation;
};
