import { useMutation } from '@tanstack/react-query';
import { CONSULTATIONS_CREATE_MUTATION } from '../gql/mutations';
import { client } from '../gql';

const useCreateConsults = (token: string) => {
  const { mutate, mutateAsync, isLoading, isError, isSuccess } = useMutation(
    async (data: any) => {
      return client({ token }).request(CONSULTATIONS_CREATE_MUTATION, {
        consultations: { ...data },
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

export default useCreateConsults;
