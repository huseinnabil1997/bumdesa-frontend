import { useMutation } from 'react-query';
import { deleteJurnal } from 'src/query/request/jurnal';

const deleteData = async (id) => {
  const { data } = await deleteJurnal(id);

  return data;
};

export const useDeleteJurnal = () => {
  const deleteMutation = useMutation((id) => deleteData(id));

  return deleteMutation;
};
