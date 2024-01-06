import { Box, Button, Input, Select, Stack, Text, Textarea, VStack } from '@raidguild/design-system';
import _ from 'lodash';
import { useSession } from 'next-auth/react';
import { FieldValues, useForm } from 'react-hook-form';

import useSubmit from '../../hooks/useSubmit';
import Link from '../atoms/ChakraNextLink';
import ImageUpload from '../atoms/ImageUpload';

type PortfolioFormProps = {
  isEditable?: boolean;
  slug?: string;
  initialData?: any;
};

const questions = [
  {
    label: 'The Challenge',
    name: 'challenge',
  },
  {
    label: 'The Approach',
    name: 'approach',
  },
  {
    label: 'The Results',
    name: 'result',
  },
];

const categoryOptions = [
  {
    label: 'Design Sprint',
    value: 'DESIGN_SPRINT',
  },
  {
    label: 'Backend',
    value: 'BACKEND',
  },
  {
    label: 'Frontend',
    value: 'FRONTEND',
  },
  {
    label: 'Full Stack',
    value: 'FULL_STACK',
  },
  {
    label: 'Marketing',
    value: 'MARKETING',
  },
  {
    label: 'Smart Cpntracts',
    value: 'SMART_CONTRACTS',
  },
];

const PortfolioForm = ({ isEditable, slug, initialData }: PortfolioFormProps) => {
  const localForm = useForm({
    mode: 'all',
  });
  const { handleSubmit } = localForm;
  const { data: session } = useSession();
  const token = _.get(session, 'token') || '';
  const { submitProjectForm, submitProjectEditForm } = useSubmit(token);

  const onSubmit = (data: FieldValues) => {
    if (isEditable && slug) {
      submitProjectEditForm(data, slug, initialData.imageUrl);
    } else {
      submitProjectForm(data);
    }
  };

  return (
    <VStack width='60vw' margin='0 auto' pb='2rem' gap={14} fontFamily='texturina'>
      <Input
        label='Project Name'
        name='projectName'
        localForm={localForm}
        defaultValue={isEditable && initialData?.name}
        variant='solidOutline'
      />
      <Input
        label='Project Slug:'
        name='slug'
        localForm={localForm}
        defaultValue={isEditable && initialData?.slug}
        variant='solidOutline'
      />
      <Input
        label='Github:'
        name='githubUrl'
        localForm={localForm}
        defaultValue={isEditable && initialData?.repoLink}
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
          name='imageUrl'
          label='Project Logo:'
          localForm={localForm}
          defaultValue={isEditable && initialData?.imageUrl}
        />
      </VStack>
      {questions.map((question) => (
        <Stack width='full' key={question.label}>
          <Textarea
            label={question.label}
            name={question.name}
            localForm={localForm}
            fontFamily='texturina'
            defaultValue={
              // eslint-disable-next-line no-nested-ternary
              question.name === 'challenge'
                ? initialData?.challenge.content[0]
                : question.name === 'approach'
                ? initialData?.approach.content[0]
                : initialData?.result.content[0]
            }
            variant='solidOutline'
          />
          <Text fontSize='0.8rem'>
            This textarea accepts{' '}
            <Link href='https://daringfireball.net/projects/markdown/basics' isExternal>
              markdown
            </Link>
          </Text>
        </Stack>
      ))}
      <Select
        name='categoryOptions'
        label='Project Category'
        defaultValue={_.find(categoryOptions, {
          value: initialData?.category,
        })}
        options={categoryOptions}
        localForm={localForm}
      />

      <Box pt={8} onClick={handleSubmit(onSubmit)}>
        <Button variant='bright' width='200px' fontFamily='monospace' fontWeight={500}>
          {isEditable ? 'Save Changes' : 'Publish Project'}
        </Button>
      </Box>
    </VStack>
  );
};

export default PortfolioForm;
