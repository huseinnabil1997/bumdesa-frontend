import { useMutation } from 'react-query';
import { downloadJurnalPreview } from 'src/query/request/jurnal';

export const onDownload = async (param) => {
  const { data } = await downloadJurnalPreview(param);

  return data;
};

export const useDownloadJurnalPreview = () => {
  const downloadMutation = useMutation((param) => onDownload(param));

  return downloadMutation;
};
