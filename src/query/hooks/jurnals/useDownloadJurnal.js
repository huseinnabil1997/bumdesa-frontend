import { useMutation } from 'react-query';
import { downloadJurnal } from 'src/query/request/jurnal';

export const onDownload = async (param) => {
  const { data } = await downloadJurnal(param);

  return data;
};

export const useDownloadJurnal = () => {
  const downloadMutation = useMutation((param) => onDownload(param));

  return downloadMutation;
};
