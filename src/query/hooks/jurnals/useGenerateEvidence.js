import { useQuery } from 'react-query';
import { generateEvidenceNumber } from 'src/query/request/jurnal';

const fetchData = async () => {
  try {
    const { data } = await generateEvidenceNumber();

    return data?.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGenerateEvidence = () => {
  const getQuery = useQuery(['GENERATE_EVIDENCE'], () => fetchData(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return getQuery;
};
