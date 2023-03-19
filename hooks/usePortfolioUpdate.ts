import { useMutation } from '@tanstack/react-query';
import { PORTFOLIO_UPDATE_MUTATION } from '../gql/mutations';
import { client } from '../gql';

type IPortfolioUpdate = {
  where: {
    slug: {
      _eq: string;
    };
  };
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

const usePortfolioUpdate = (token: string) => {
  const { mutate, mutateAsync, isLoading, isError, isSuccess } = useMutation(
    async ({ ...props }: IPortfolioUpdate) => {
      return client({ token }).request(PORTFOLIO_UPDATE_MUTATION, {
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

export default usePortfolioUpdate;
