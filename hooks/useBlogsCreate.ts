import { useToast } from '@raidguild/design-system';
import { useMutation } from '@tanstack/react-query';
import { BLOG_CREATE_MUTATION } from '../gql/mutations';
import { client } from '../gql';

type IBlogInsert = {
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

const useBlogCreate = (token: string) => {
  const toast = useToast();

  const { mutate, mutateAsync, isLoading, isError, isSuccess } = useMutation(
    async ({ ...props }: IBlogInsert) => {
      return client({ token }).request(BLOG_CREATE_MUTATION, {
        ...props,
      });
    },
    {
      onSuccess: (data) => {
        console.log('success', data);
        setTimeout(() => {
          toast.success({
            title: 'New blog post added',
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

export default useBlogCreate;
