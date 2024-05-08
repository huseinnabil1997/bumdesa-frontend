import { useMutation } from 'react-query';
import { deleteManager } from 'src/query/request/manager';

const deleteData = async (id) => {
  const { data } = await deleteManager(id);

  return data;
};

export const useDeleteManager = () => {
  const deleteMutation = useMutation((id) => deleteData(id));

  return deleteMutation;
};
