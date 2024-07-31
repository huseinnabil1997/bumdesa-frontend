import { useMutation } from 'react-query';
import { downloadUnit } from 'src/query/request/data-unit';

export const onDownload = async (param) => {
  const { data } = await downloadUnit(param);

  return data;
};

export const useDownloadUnit = () => {
  const downloadMutation = useMutation((param) => onDownload(param));

  return downloadMutation;
};
