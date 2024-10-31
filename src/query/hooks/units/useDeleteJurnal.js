import { useMutation } from 'react-query';
import { deleteUnit } from 'src/query/request/unit';

const deleteData = async (id) => {
  const { data } = await deleteUnit(id);

  return data;
};

export const useDeleteUnit = () => {
  const deleteMutation = useMutation((id) => deleteData(id));

  return deleteMutation;
};
