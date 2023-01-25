import { useMutation } from '@tanstack/react-query';
import { CONSULTATION_CREATE_MUTATION } from '../gql/mutations';
import { client } from '../gql';

interface IPortfolioInsert {
  name: string;
  description: string;
}

interface Props {
  token: string;
}

const usePortfolioCreate = ({ token }: Props) => {
  // const queryClient = useQueryClient();

  const { mutate, mutateAsync, isLoading, isError, isSuccess } = useMutation(
    async ({ ...props }: IPortfolioInsert) => {
      return client({ token }).request(CONSULTATION_CREATE_MUTATION, {
        ...props,
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

export default usePortfolioCreate;
