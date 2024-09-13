import { useMutation } from 'react-query';
import { downloadAreaSummary } from 'src/query/request/dashboard';

export const onDownload = async (param) => {
  const { data } = await downloadAreaSummary(param);

  return data;
};

export const useDownloadSummary = () => {
  const downloadMutation = useMutation((param) => onDownload(param));

  return downloadMutation;
};
