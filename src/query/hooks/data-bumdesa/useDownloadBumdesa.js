import { useMutation } from 'react-query';
import { downloadBumdesa } from 'src/query/request/data-bumdesa';

export const onDownload = async (param) => {
  const { data } = await downloadBumdesa(param);

  return data;
};

export const useDownloadBumdesa = () => {
  const downloadMutation = useMutation((param) => onDownload(param));

  return downloadMutation;
};
