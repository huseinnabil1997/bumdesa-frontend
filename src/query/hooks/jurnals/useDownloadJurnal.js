import { useMutation } from 'react-query';
import { downloadJurnal } from 'src/query/request/jurnal';

export const onDownload = async (type) => {
  const { data } = await downloadJurnal(type);

  return data;
};

export const useDownloadJurnal = () => {
  const downloadMutation = useMutation((type) => onDownload(type));

  return downloadMutation;
};
