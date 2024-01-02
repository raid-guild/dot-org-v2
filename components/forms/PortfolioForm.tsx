import { VStack, Box, Text, Textarea, Input, Select, Button, Stack, defaultTheme } from '@raidguild/design-system';
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
  const localForm = useForm();
  const { handleSubmit } = localForm;
  const { data: session } = useSession();
  const token = _.get(session, 'token') || '';
  const { submitProjectForm, submitProjectEditForm } = useSubmit(token);
  // const clearData = () => {
  //   reset();
  // };

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
        border={`1px solid ${defaultTheme.colors.primary[400]}`}
        _focus={{ border: `1.5px solid ${defaultTheme.colors.purple[400]}` }}
        p={4}
        borderRadius={0}
        variant='unstyled'
      />
      <Input
        label='Project Slug:'
        name='slug'
        localForm={localForm}
        defaultValue={isEditable && initialData?.slug}
        border={`1px solid ${defaultTheme.colors.primary[400]}`}
        _focus={{ border: `1.5px solid ${defaultTheme.colors.purple[400]}` }}
        p={4}
        borderRadius={0}
        variant='unstyled'
      />
      <Input
        label='Github:'
        name='githubUrl'
        localForm={localForm}
        defaultValue={isEditable && initialData?.repoLink}
        border={`1px solid ${defaultTheme.colors.primary[400]}`}
        _focus={{ border: `1.5px solid ${defaultTheme.colors.purple[400]}` }}
        p={4}
        borderRadius={0}
        variant='unstyled'
      />
      <Input
        label='Description:'
        name='description'
        localForm={localForm}
        defaultValue={isEditable && initialData?.description}
        border={`1px solid ${defaultTheme.colors.primary[400]}`}
        _focus={{ border: `1.5px solid ${defaultTheme.colors.purple[400]}` }}
        p={4}
        borderRadius={0}
        variant='unstyled'
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
            border={`1px solid ${defaultTheme.colors.primary[400]}`}
            _focus={{ border: `1.5px solid ${defaultTheme.colors.purple[400]}` }}
            p={4}
            borderRadius={0}
            variant='unstyled'
          />
          <Text fontSize='0.8rem'>
            This textarea accepts{' '}
            <Link href='https://daringfireball.net/projects/markdown/basics' isExternal>
              markdown
            </Link>
          </Text>
        </Stack>
      ))}
      <Select name='categoryOptions' localForm={localForm} options={categoryOptions} variant='outline' />

      <Box pt={8} onClick={handleSubmit(onSubmit)} fontFamily='mono'>
        <Button variant='gradientOutline' width='200px'>
          {isEditable ? 'Save Changes' : 'Ship Project'}
        </Button>
      </Box>
    </VStack>
  );
};

export default PortfolioForm;
