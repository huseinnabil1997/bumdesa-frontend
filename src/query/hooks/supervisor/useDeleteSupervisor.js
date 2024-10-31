import { useMutation } from 'react-query';
import { deleteSupervisor } from 'src/query/request/supervisor';

const deleteData = async (id) => {
  const { data } = await deleteSupervisor(id);

  return data;
};

export const useDeleteSupervisor = () => {
  const deleteMutation = useMutation((id) => deleteData(id));

  return deleteMutation;
};
