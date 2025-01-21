import { useMutation } from 'react-query';
import { uploadJurnals } from 'src/query/request/jurnal';

const uploadData = async (payload) => {
  const { data } = await uploadJurnals(payload);

  return data;
};

export const useUploadJurnals = () => {
  const uploadMutation = useMutation((payload) => uploadData(payload));

  return uploadMutation;
};
