import _ from 'lodash';
import { Stack, HStack, VStack, Input, Button, Textarea, Text, Link, Select } from '@raidguild/design-system';
import { useForm, FieldValues } from 'react-hook-form';
import { GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react';

// import Link from '../../../components/atoms/ChakraNextLink';
import ImageUpload from '../../../components/atoms/ImageUpload';
import CMSPageTemplate from '../../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../../components/page-components/PageTitle';
import useSubmit from '../../../hooks/useSubmit';

// import RaiderRoleSelect from '../../../components/page-components/RaiderRoleSelect';

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

interface Props {
  slug: string;
}

const PortfolioPage = ({ slug }: Props) => {
  const { data: session } = useSession();
  const token = _.get(session, 'token') || '';
  const localForm = useForm();
  const { handleSubmit } = localForm;

  const { submitProjectEditForm } = useSubmit(token);

  const onSubmit = (data: FieldValues) => {
    console.log('form data:', data);
    submitProjectEditForm(data, slug);
  };

  return (
    <CMSPageTemplate>
      <PageTitle title='Edit Shipped Project' />
      <VStack width='60vw' margin='0 auto' paddingBottom='2rem'>
        <Input label='Project Name' name='projectName' localForm={localForm} />
        <Input label='Project Slug:' name='slug' localForm={localForm} />
        <Input label='Website URL' name='resultLink' localForm={localForm} />
        <Input label='Github:' name='githubUrl' localForm={localForm} />
        <Input label='Description:' name='description' localForm={localForm} />
        <ImageUpload localForm={localForm} />
        {questions.map((question) => (
          <Stack width='full' key={question.label}>
            <Textarea label={question.label} name={question.name} localForm={localForm} />
            <Text fontSize='0.8rem'>
              This textarea accepts{' '}
              <Link href='https://daringfireball.net/projects/markdown/basics' isExternal>
                markdown
              </Link>
            </Text>
          </Stack>
        ))}
        <Select name='categoryOptions' localForm={localForm} options={categoryOptions} />
        <HStack pt={8} spacing={6}>
          <Button onClick={handleSubmit(onSubmit)} variant='outline'>
            Save Changes
          </Button>
          <Button>Delete Content</Button>
        </HStack>
      </VStack>
    </CMSPageTemplate>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const slug = _.get(context, 'params.project');

  return { props: { slug } };
};

export default PortfolioPage;
