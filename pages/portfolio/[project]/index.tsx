import _ from 'lodash';
import {
  Box,
  Heading,
  VStack,
  Icon,
  HStack,
  Flex,
  Grid,
  Castle,
  Swords,
  Button,
  Wizard2,
} from '@raidguild/design-system';
import { GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react';

import CMSPageTemplate from '../../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../../components/page-components/PageTitle';
import Link from '../../../components/atoms/ChakraNextLink';
// import Markdown from '../../../components/atoms/Markdown';
import { getPortfolioDetail } from '../../../gql';

import usePortfolioDetail from '../../../hooks/usePortfolioDetail';

interface Props {
  project: string;
  initialData: any;
}

const sections = [
  { heading: 'The Challenge', icon: Castle, body: 'challenge.body' },
  { heading: 'Our Approach', icon: Swords, body: 'approach.body' },
  { heading: 'The Result', icon: Wizard2, body: 'result.body' },
];

function PortfolioPage({ project, initialData }: Props) {
  const { data: session } = useSession();
  const token = _.get(session, 'token');
  const { data: projectData } = usePortfolioDetail({ slug: project, initialData, token });
  console.log(projectData);

  return (
    <CMSPageTemplate>
      <PageTitle title={_.get(projectData, 'name', '')} />
      {projectData && (
        <Box background='blackAlpha.800' px='2rem'>
          <VStack layerStyle='purpleToRedVerticalGradient' margin='2rem 0' px='4rem'>
            {_.map(sections, (section) => (
              <HStack align='center' gap={2}>
                <Icon as={section.icon} w='32px' h='32px' />
                <Heading>{section.heading}</Heading>
              </HStack>
              // <Markdown>{_.get(projectData, `${section.body}`)}</Markdown>
            ))}
          </VStack>
          <Grid padding='4rem' gridTemplateColumns='5fr 7fr'>
            <Flex direction='column'>
              {/* Other Markdown */}
              <VStack maxWidth='72ch' alignSelf='center'>
                <VStack>
                  <Flex align='center' gap='1rem'>
                    <Icon as={Swords} height='32px' width='32px' />
                    <Heading>Our Approach</Heading>
                  </Flex>
                  {/* <Markdown>{_.get(project, 'approach.body', '')}</Markdown> */}
                </VStack>
                <VStack>
                  <Flex align='center' gap='1rem'>
                    <Icon as={Wizard2} height='32px' width='32px' />
                    <Heading>The Result</Heading>
                  </Flex>

                  {/* <Markdown>{_.get(project, 'result.body', '')}</Markdown> */}
                </VStack>
                <Box minHeight='2rem' />
                <HStack align='flex-start'>
                  <Link href={_.get(projectData, 'resultLink', '')} isExternal>
                    <Button>Visit Website</Button>
                  </Link>
                  <Link href={_.get(projectData, 'repoLink', '')} isExternal>
                    <Button variant='outline'>View Code</Button>
                  </Link>
                </HStack>
              </VStack>
            </Flex>
          </Grid>
        </Box>
      )}
    </CMSPageTemplate>
  );
}

// export async function getStaticPaths() {
//   try {
//     const { data } = await supabase.from('PortfolioContent').select('project_name');
//     const paths = data.map((project) => {
//       return { params: { project: project?.project_name } };
//     });
//     return {
//       paths,
//       fallback: true,
//     };
//   } catch (error) {
//     console.log(error);
//   }
// }

// This function gets called at build time
export async function getServerSideProps(context: GetServerSidePropsContext) {
  let project = _.get(context, 'params.project');
  if (_.isArray(project)) project = _.first(project);
  if (!project) {
    return {
      props: {},
    };
  }

  const slugToName = (slug: string) => {
    const words = slug.split('-');
    return words.map((word) => _.capitalize(word)).join(' ');
  };

  const slug = slugToName(project);
  const result = await getPortfolioDetail(slug);
  console.log(result);

  return {
    props: {
      project,
      initialData: _.get(result, 'data[0]', null),
    },
  };
}

export default PortfolioPage;
