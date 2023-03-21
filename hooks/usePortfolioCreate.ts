import { useToast } from '@raidguild/design-system';
import { useMutation } from '@tanstack/react-query';
import { PORTFOLIO_INSERT_MUTATION } from '../gql/mutations';
import { client } from '../gql';

type IPortfolioInsert = {
  portfolio: {
    name: string;
    repo_link: string;
    result_link: string;
    image_url: string;
    description: string;
    approach: {
      content: string[];
    };
    challenge: {
      content: string[];
    };
    result: {
      content: string[];
    };
    slug: string;
    category: string;
  };
};

const usePortfolioCreate = (token: string) => {
  // const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, mutateAsync, isLoading, isError, isSuccess } = useMutation(
    async ({ ...props }: IPortfolioInsert) => {
      return client({ token }).request(PORTFOLIO_INSERT_MUTATION, {
        ...props,
      });
    },
    {
      onSuccess: (data) => {
        console.log('success', data);
        setTimeout(() => {
          toast.success({
            title: 'New Portfolio Added',
            duration: 3000,
            isClosable: true,
          });
        }, 1000);
      },
      onError: (error) => {
        console.log('error', error);
      },
    },
  );
  return { mutate, mutateAsync, isLoading, isError, isSuccess };
};

export default usePortfolioCreate;
