import { useMutation } from '@tanstack/react-query';
import { CONSULTATION_CREATE_MUTATION } from '../gql/mutations';
import { client } from '../gql';

const useBlogCreate = () => {
  // const queryClient = useQueryClient();

  const { mutate, mutateAsync, isLoading, isError, isSuccess } = useMutation(
    async (data: any) => {
      return client({}).request(CONSULTATION_CREATE_MUTATION, {
        name: data.name || 'Namey McNameface',
      });
    },
    {
      onSuccess: (data) => {
        console.log('success', data);
      },
      onError: (error) => {
        console.log('error', error);
      },
    },
  );
  return { mutate, mutateAsync, isLoading, isError, isSuccess };
};

export default useBlogCreate;
