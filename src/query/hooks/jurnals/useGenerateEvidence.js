import { useQuery } from 'react-query';
import { generateEvidenceNumber } from 'src/query/request/jurnal';

const fetchData = async (param) => {
  try {
    const { data } = await generateEvidenceNumber(param);

    return data?.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGenerateEvidence = (param) => {
  const getQuery = useQuery(
    ['GENERATE_EVIDENCE', param.date, param.is_first_balance],
    () => fetchData(param),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  return getQuery;
};
