import { useMutation } from 'react-query';
import { downloadLedger } from 'src/query/request/ledger';

export const onDownload = async (param) => {
  const { data } = await downloadLedger(param);

  return data;
};

export const useDownloadLedger = () => {
  const downloadMutation = useMutation((param) => onDownload(param));

  return downloadMutation;
};
