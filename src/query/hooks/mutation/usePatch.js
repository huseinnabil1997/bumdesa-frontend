import { useMutation } from 'react-query';
import axiosInstance from 'src/utils/axiosCoreService';

const usePatch = () => {
  const mutation = useMutation(
    async ({ endpoint, payload, headers }) => {
      const response = await axiosInstance.patch(endpoint, payload, {
        headers: {
          ...headers,
        },
      });

      return response.data;
    }
  );

  return mutation;
};

export default usePatch;
