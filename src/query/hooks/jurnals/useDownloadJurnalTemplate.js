import { useMutation } from 'react-query';
import { downloadJurnalTemplate } from 'src/query/request/jurnal';

export const onDownload = async (param) => {
  const { data } = await downloadJurnalTemplate(param);

  return data;
};

export const useDownloadJurnalTemplate = () => {
  const downloadMutation = useMutation((param) => onDownload(param));

  return downloadMutation;
};

