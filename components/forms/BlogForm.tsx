import { VStack, Box, Text, Textarea, Input, Button, Stack } from '@raidguild/design-system';
import { FieldValues, useForm } from 'react-hook-form';

import { useSession } from 'next-auth/react';
import _ from 'lodash';

import Link from '../atoms/ChakraNextLink';
import useSubmit from '../../hooks/useSubmit';
import ImageUpload from '../atoms/ImageUpload';

type PortfolioFormProps = {
  isEditable?: boolean;
  slug?: string;
  initialData?: any;
};

const BlogForm = ({ isEditable, slug, initialData }: PortfolioFormProps) => {
  const localForm = useForm();
  const { handleSubmit } = localForm;
  const { data: session } = useSession();
  const token = _.get(session, 'token') || '';
  const { submitBlogForm, submitBlogEditForm } = useSubmit(token);

  // const clearData = () => {
  //   reset();
  // };

  const onSubmit = (data: FieldValues) => {
    if (isEditable && slug) {
      submitBlogEditForm(data, slug);
    } else {
      submitBlogForm(data);
    }
  };

  return (
    <VStack width='60vw' margin='0 auto' pb='2rem'>
      <Input label='Blog Title' name='title' localForm={localForm} defaultValue={isEditable && initialData?.title} />
      <Input label='Blog Slug:' name='slug' localForm={localForm} defaultValue={isEditable && initialData?.slug} />
      <Input label='Author:' name='author' localForm={localForm} defaultValue={isEditable && initialData?.author} />
      <Input
        label='Description:'
        name='description'
        localForm={localForm}
        defaultValue={isEditable && initialData?.description}
      />

      <VStack alignItems='flex-start' width='100%'>
        <ImageUpload
          localForm={localForm}
          defaultValue={isEditable && initialData?.image}
          name='image'
          label='Blog Thumbnail:'
        />
      </VStack>
      <Stack width='full'>
        <Textarea
          label='content'
          name='content'
          localForm={localForm}
          defaultValue={initialData?.content}
          height='500px'
        />
        <Text fontSize='0.8rem'>
          This textarea accepts{' '}
          <Link href='https://daringfireball.net/projects/markdown/basics' isExternal>
            markdown
          </Link>
        </Text>
      </Stack>
      <Box pt={8}>
        <Button onClick={handleSubmit(onSubmit)}>{isEditable ? 'Save Changes' : 'Publish Blog'}</Button>
      </Box>
    </VStack>
  );
};

export default BlogForm;
