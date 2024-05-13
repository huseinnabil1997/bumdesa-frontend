import { useQuery } from 'react-query';
import { getFaqs } from 'src/query/request/faqs';

const fetchData = async (param) => {
  try {
    const { data } = await getFaqs(param);

    return data.data ?? [];
  } catch (err) {
    throw new Error();
  }
};

export const useGetFaqs = (param) => {
  const getQuery = useQuery(['GET_FAQS'], () => fetchData(param));

  return getQuery;
};
