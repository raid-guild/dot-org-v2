import _ from 'lodash';
import { Box, Heading, VStack, Image, Button, HStack, Flex, Grid } from '@raidguild/design-system';
import { GetServerSidePropsContext } from 'next';

import CMSPageTemplate from '../../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../../components/page-components/PageTitle';
import ProjectCard from '../../../components/page-components/ProjectCard';
import Link from '../../../components/atoms/ChakraNextLink';
import Markdown from '../../../components/atoms/Markdown';

import Swords from '../../../assets/illustrations/swords.svg';

interface Props {
  project: any;
}

// TODO put gradients in ds theme

function PortfolioPage({ project }: Props) {
  const thisProject = project?.data[0];
  return (
    <CMSPageTemplate>
      <PageTitle title={_.get(project, 'projectName')} />
      <Box background='blackAlpha.800' px='2rem'>
        <VStack layerStyle='purpleToRedVerticalGradient' margin='2rem 0' px='4rem'>
          <Flex align='center' gap='1rem'>
            <Image src='/assets/illustrations/smallCastle.svg' height='32px' width='32px' />
            <Heading>The Challenge</Heading>
          </Flex>
          <Markdown>{_.get(project, 'challenge.body')}</Markdown>
        </VStack>
        <Grid padding='4rem' gridTemplateColumns='5fr 7fr'>
          <Box>
            <ProjectCard project={thisProject} />
          </Box>
          <Flex direction='column'>
            {/* Other Markdown */}
            <VStack maxWidth='72ch' alignSelf='center'>
              <VStack>
                <Flex align='center' gap='1rem'>
                  <Image src={Swords.src} height='32px' width='32px' />
                  <Heading>Our Approach</Heading>
                </Flex>
                <Markdown>{_.get(project, 'approach.body')}</Markdown>
              </VStack>
              <VStack>
                <Flex align='center' gap='1rem'>
                  <Image src='/assets/illustrations/wand.svg' height='32px' width='32px' />
                  <Heading>The Result</Heading>
                </Flex>

                <Markdown>{_.get(project, 'result.body')}</Markdown>
              </VStack>
              <Box minHeight='2rem' />
              <HStack align='flex-start'>
                <Link href={_.get(project, 'websiteUrl')} isExternal>
                  <Button
                    bgGradient='linear-gradient(94.89deg, #FF5A00 0%, #D62789 70.2%, #AD17AD 100%)'
                    _hover={{
                      background: `linear-gradient(-90deg, #FF5A00 0%, #D62789 70.2%, #AD17AD 100%)`,
                    }}>
                    Visit Website
                  </Button>
                </Link>
                <Link href={_.get(project, 'githubUrl')} isExternal>
                  <Button variant='blackRedBorder'>View Code</Button>
                </Link>
              </HStack>
            </VStack>
          </Flex>
        </Grid>
      </Box>
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
export async function getStaticProps(context: GetServerSidePropsContext) {
  // const project = params.params.project;
  // // Call an external API endpoint to get posts
  // const res = await supabase.from('PortfolioContent').select('*').eq('project_name', project);

  return {
    props: {
      project: null,
    },
  };
}

export default PortfolioPage;
