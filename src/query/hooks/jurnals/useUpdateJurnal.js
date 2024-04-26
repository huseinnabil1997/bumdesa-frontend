import { useMutation } from 'react-query';
import { updateJurnal } from 'src/query/request/jurnal';

const updateData = async (payload) => {
  const { data } = await updateJurnal(payload);

  return data;
};

export const useUpdateJurnal = () => {
  const updateMutation = useMutation((payload) => updateData(payload));

  return updateMutation;
};
