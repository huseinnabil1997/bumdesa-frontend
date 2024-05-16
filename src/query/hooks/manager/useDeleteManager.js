import { useMutation } from 'react-query';
import { deleteOrganization } from 'src/query/request/manager';

const deleteData = async (id) => {
  const { data } = await deleteOrganization(id);

  return data;
};

export const useDeleteManager = () => {
  const deleteMutation = useMutation((id) => deleteData(id));

  return deleteMutation;
};
