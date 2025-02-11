import { useMutation } from 'react-query';
import { createLink } from 'src/query/request/link-umkm';

const createData = async () => {
  try {
    const { data } = await createLink();

    return data;
  } catch (err) {
    if (!navigator.onLine) {
      throw new Error('Tidak ada koneksi internet. Silakan periksa koneksi internet Anda.');
    }
    throw new Error(err.message);
  }
};

export const useCreateLink = () => {
  const createMutation = useMutation(() => createData());

  return createMutation;
};
