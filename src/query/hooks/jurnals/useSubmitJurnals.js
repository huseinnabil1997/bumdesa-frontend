import { useMutation } from 'react-query';
import { submitJurnals } from 'src/query/request/jurnal';

const submitData = async (id) => {
  try {
    const { data } = await submitJurnals(id);

    return data;
  } catch (err) {
    if (!navigator.onLine) {
      throw new Error('Tidak ada koneksi internet. Silakan periksa koneksi internet Anda.');
    }
    throw new Error(err);
  }
};

export const useSubmitJurnals = () => {
  const submitMutation = useMutation((id) => submitData(id));

  return submitMutation;
};
