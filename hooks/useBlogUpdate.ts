import { useToast } from '@raidguild/design-system';
import { useMutation } from '@tanstack/react-query';
import { BLOG_UPDATE_MUTATION } from '../gql/mutations';
import { client } from '../gql';

type IBlogUpdate = {
  where: {
    slug: {
      _eq: string;
    };
  };
  blog: {
    author: string;
    content: any;
    description: string;
    image: string;
    slug: string;
    title: string;
    tags?: string[];
  };
};

const useBlogUpdate = (token: string) => {
  const toast = useToast();
  const { mutate, mutateAsync, isLoading, isError, isSuccess } = useMutation(
    async ({ ...props }: IBlogUpdate) => {
      return client({ token }).request(BLOG_UPDATE_MUTATION, {
        ...props,
      });
    },
    {
      onSuccess: (data) => {
        console.log('success', data);
        setTimeout(() => {
          toast.success({
            title: 'Blog Edited Successfully',
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

export default useBlogUpdate;
