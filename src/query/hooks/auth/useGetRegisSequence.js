import { useQuery } from 'react-query';
import { getRegistrationSequence } from 'src/query/request/auth';

const fetchData = async (param) => {
  try {
    const { data } = await getRegistrationSequence(param);
    return data?.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetRegisSequence = (sequence) => {
  const getQuery = useQuery(['GET_REGISTRATION_SEQUENCE', sequence], () => fetchData(sequence), {
    enabled: !!sequence,
  });

  return getQuery;
};
