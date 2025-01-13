import { useMutation } from 'react-query';
import { submitJurnals } from 'src/query/request/jurnal';

const submitData = async (id) => {
  try {
    const { data } = await submitJurnals(id);

    return data;
  } catch (err) {
    throw new Error();
  }
};

export const useSubmitJurnals = () => {
  const submitMutation = useMutation((id) => submitData(id));

  return submitMutation;
};
