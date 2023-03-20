import _ from 'lodash';
import { Stack, HStack, VStack, Input, Button, Textarea, Text, Link, Select } from '@raidguild/design-system';
import { useForm, FieldValues } from 'react-hook-form';
import { GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react';
import { getPortfolioDetail } from '../../../gql';
import ImageUpload from '../../../components/atoms/ImageUpload';
import CMSPageTemplate from '../../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../../components/page-components/PageTitle';
import useSubmit from '../../../hooks/useSubmit';
import usePortfolioDetail from '../../../hooks/usePortfolioDetail';

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
  initialData: any;
}

const PortfolioPage = ({ slug, initialData }: Props) => {
  const { data: session } = useSession();
  const token = _.get(session, 'token') || '';
  const localForm = useForm();
  const { handleSubmit } = localForm;

  const { submitProjectEditForm } = useSubmit(token);

  const { data: projectData } = usePortfolioDetail({ slug, initialData, token });

  const onSubmit = (data: FieldValues) => {
    submitProjectEditForm(data, slug);
  };

  return (
    <CMSPageTemplate>
      <PageTitle title='Edit Shipped Project' />
      <VStack width='60vw' margin='0 auto' paddingBottom='2rem'>
        <Input label='Project Name' name='projectName' localForm={localForm} defaultValue={projectData.name} />
        <Input label='Project Slug:' name='slug' localForm={localForm} defaultValue={projectData.slug} />
        <Input label='Website URL' name='resultLink' localForm={localForm} defaultValue={projectData.resultLink} />
        <Input label='Github:' name='githubUrl' localForm={localForm} defaultValue={projectData.repoLink} />
        <Input label='Description:' name='description' localForm={localForm} defaultValue={projectData.description} />
        <VStack alignItems='flex-start' width='100%'>
          <ImageUpload localForm={localForm} defaultValue={projectData.imageUrl} />
        </VStack>
        {questions.map((question) => (
          <Stack width='full' key={question.label}>
            <Textarea
              label={question.label}
              name={question.name}
              localForm={localForm}
              defaultValue={
                // eslint-disable-next-line no-nested-ternary
                question.name === 'challenge'
                  ? projectData.challenge.content[0]
                  : question.name === 'approach'
                  ? projectData.approach.content[0]
                  : projectData.result.content[0]
              }
            />
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
  let slug = _.get(context, 'params.project');
  if (_.isArray(slug)) slug = _.first(slug);
  if (!slug) {
    return {
      props: {},
    };
  }
  const result = await getPortfolioDetail(slug);

  return {
    props: {
      slug,
      initialData: result || null,
    },
  };
};

export default PortfolioPage;
