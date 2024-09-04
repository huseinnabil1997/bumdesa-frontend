import { useMutation } from 'react-query';
import { downloadLog } from 'src/query/request/log';

export const onDownload = async (param) => {
  const { data } = await downloadLog(param);

  return data;
};

export const useDownloadLog = () => {
  const downloadMutation = useMutation((param) => onDownload(param));

  return downloadMutation;
};
