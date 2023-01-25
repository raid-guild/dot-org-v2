import { useMutation } from '@tanstack/react-query';
import { CONSULTATION_CREATE_MUTATION } from '../gql/mutations';
import { client } from '../gql';

const useCreateConsult = (token: string) => {
  const { mutate, mutateAsync, isLoading, isError, isSuccess } = useMutation(
    async (data: any) => {
      return client({ token }).request(CONSULTATION_CREATE_MUTATION, {
        consultation: {
          ...data,
        },
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

export default useCreateConsult;
