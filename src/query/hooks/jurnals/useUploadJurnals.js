import { useMutation } from 'react-query';
import { uploadJurnals } from 'src/query/request/jurnal';

const uploadData = async (payload) => {
  try {
    const { data } = await uploadJurnals(payload);

    return data;
  } catch (err) {
    throw new Error();
  }
};

export const useUploadJurnals = () => {
  const uploadMutation = useMutation((payload) => uploadData(payload));

  return uploadMutation;
};
