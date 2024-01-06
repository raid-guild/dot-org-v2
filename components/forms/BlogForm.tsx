import { Box, Button, Input, Stack, Text, Textarea, VStack } from '@raidguild/design-system';
import { FieldValues, useForm } from 'react-hook-form';

import _ from 'lodash';
import { useSession } from 'next-auth/react';

import useSubmit from '../../hooks/useSubmit';
import Link from '../atoms/ChakraNextLink';
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
  const token = _.get(session, 'token') ?? '';
  const { submitBlogForm, submitBlogEditForm } = useSubmit(token);

  const onSubmit = (data: FieldValues) => {
    if (isEditable && slug) {
      submitBlogEditForm(data, slug, initialData.image);
    } else {
      submitBlogForm(data);
    }
  };

  return (
    <VStack minW='50vw' maxW='1000px' margin='0 auto' p={10} fontFamily='texturina' gap={14}>
      <Input
        label='Blog Title'
        name='title'
        localForm={localForm}
        defaultValue={isEditable && initialData?.title}
        variant='solidOutline'
      />
      <Input
        label='Blog Slug:'
        name='slug'
        localForm={localForm}
        defaultValue={isEditable && initialData?.slug}
        variant='solidOutline'
      />
      <Input
        label='Author:'
        name='author'
        localForm={localForm}
        defaultValue={isEditable && initialData?.author}
        variant='solidOutline'
      />
      <Input
        label='Description:'
        name='description'
        localForm={localForm}
        defaultValue={isEditable && initialData?.description}
        variant='solidOutline'
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
          variant='solidOutline'
          noOfLines={20}
          overflowY='scroll'
        />
        <Text fontSize='0.8rem'>
          This textarea accepts{' '}
          <Link href='https://daringfireball.net/projects/markdown/basics' isExternal>
            markdown
          </Link>
        </Text>
      </Stack>
      <Box pt={8} fontFamily='mono'>
        <Button variant='bright' width='max' onClick={handleSubmit(onSubmit)} fontFamily='monospace' fontWeight={500}>
          {isEditable ? 'Save Changes' : 'Publish Blog'}
        </Button>
      </Box>
    </VStack>
  );
};

export default BlogForm;
