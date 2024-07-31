import { useMutation } from 'react-query';
import { deactivateUnit } from 'src/query/request/unit';

const updateData = async (id) => {
  const { data } = await deactivateUnit(id);

  return data;
};

export const useDeactivate = () => {
  const updateMutation = useMutation((id) => updateData(id));

  return updateMutation;
};
