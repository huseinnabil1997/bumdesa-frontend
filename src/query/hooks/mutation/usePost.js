import { useMutation } from 'react-query';
import axiosInstance from 'src/utils/axiosCoreService';

const usePost = () => {
  const mutation = useMutation(
    async ({ endpoint, payload, headers }) => {
      const response = await axiosInstance.post(endpoint, payload, {
        headers: {
          ...headers,
        },
      });

      return response.data;
    }
  );

  return mutation;
};

export default usePost;
