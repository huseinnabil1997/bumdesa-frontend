import { useMutation } from 'react-query';
import { activateUnit } from 'src/query/request/unit';

const updateData = async (id) => {
  const { data } = await activateUnit(id);

  return data;
};

export const useActivate = () => {
  const updateMutation = useMutation((id) => updateData(id));

  return updateMutation;
};
