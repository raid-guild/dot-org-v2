import _ from 'lodash';
import {
  Heading,
  VStack,
  Stack,
  Image,
  Icon,
  HStack,
  Card,
  CardBody,
  Castle,
  Text,
  Button,
  Wizard2,
} from '@raidguild/design-system';
import { GetStaticPropsContext } from 'next';
import { useSession } from 'next-auth/react';

import CMSPageTemplate from '../../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../../components/page-components/PageTitle';
import Link from '../../../components/atoms/ChakraNextLink';
import { getPortfolioDetail, getPortfolioList } from '../../../gql';

import usePortfolioDetail from '../../../hooks/usePortfolioDetail';

interface ProjectCardProps {
  name: string;
  logo: string;
  website: string;
}

const ProjectCard = ({ name, logo, website }: ProjectCardProps) => {
  return (
    <VStack width={['auto', 'auto', 'auto', '30%', '30%']} border='1px solid #FF3864' px='12' py='8' spacing='4'>
      {/* <Box background='linear-gradient(102.93deg, #2B0000 0%, #3D0610 29.17%, #5A1049 61.98%, #461881 100%)' /> */}
      <Image src={logo} width='96px' height='96px' />
      <VStack align='center' spacing='4'>
        <Heading textAlign='center'>{name}</Heading>
        <Text>{website}</Text>
        <Link href={website} isExternal>
          <Button>Visit Website</Button>
        </Link>
      </VStack>
    </VStack>
  );
};

interface ProjectInfoProps {
  approach: string;
  result: string;
  projectUrl: string;
  codebaseUrl: string;
}

const ProjectInfo = ({ approach, result, projectUrl, codebaseUrl }: ProjectInfoProps) => {
  return (
    <Stack spacing={12} width={['auto', 'auto', 'auto', '60%', '60%']}>
      <VStack gap={6} align={['center', 'center', 'center', 'start', 'start']}>
        <HStack gap={2}>
          <Icon as={Castle} w='48px' h='48px' />
          <Heading>The Approach</Heading>
        </HStack>
        <Text textAlign={['justify', 'justify', 'justify', 'start', 'start']} lineHeight='tall'>
          {approach}
        </Text>
      </VStack>
      <VStack gap={6} align={['center', 'center', 'center', 'start', 'start']}>
        <HStack gap={2}>
          <Icon as={Wizard2} w='48px' h='48px' />
          <Heading>The Results</Heading>
        </HStack>
        <Text textAlign={['justify', 'justify', 'justify', 'start', 'start']} lineHeight='tall'>
          {result}
        </Text>
      </VStack>
      <HStack gap={2} justify={['center', 'center', 'center', 'start', 'start']}>
        <Link href={projectUrl} isExternal>
          <Button>View Project</Button>
        </Link>

        <Link href={codebaseUrl} isExternal>
          <Button variant='outline'>View Codebase</Button>
        </Link>
      </HStack>
    </Stack>
  );
};

interface Props {
  project: string;
  initialData: any;
}

function PortfolioPage({ project, initialData }: Props) {
  const { data: session } = useSession();
  const token = _.get(session, 'token');
  const { data: projectData } = usePortfolioDetail({ slug: project, initialData, token });

  return (
    <CMSPageTemplate>
      <PageTitle title={_.get(projectData, 'name', '')} />
      {projectData && (
        <>
          <Card
            background='linear-gradient(102.93deg, #2B0000 0%, #3D0610 29.17%, #5A1049 61.98%, #461881 100%)'
            border='none'>
            <VStack p='4rem'>
              <HStack align='center' gap={2}>
                <Icon as={Castle} w='32px' h='32px' />
                <Heading>The Challenge</Heading>
              </HStack>
              <CardBody
                textAlign={['justify', 'justify', 'justify', 'center', 'center']}
                width={['auto', 'auto', 'auto', '70%', '70%']}
                lineHeight='taller'>
                {projectData.challenge}
              </CardBody>
            </VStack>
          </Card>
          <Stack
            direction={['column', 'column', 'column', 'row', 'row']}
            align={['center', 'center', 'center', 'start', 'start']}
            spacing={14}
            justify='space-between'
            px={28}
            py={14}>
            <ProjectCard
              name={projectData.name}
              website='swdao.org' // to be replaced by actual website url
              logo='https://opensea.io/static/images/logos/opensea.svg' // to be replaced by actual logo path
            />
            <ProjectInfo projectUrl='' codebaseUrl='' approach={projectData.approach} result={projectData.result} />
          </Stack>
        </>
      )}
    </CMSPageTemplate>
  );
}

export async function getStaticPaths() {
  const portfolios = await getPortfolioList();

  const paths = portfolios.map((portfolio: any) => ({
    params: { project: portfolio.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

// This function gets called at build time
export async function getStaticProps(context: GetStaticPropsContext) {
  let projectSlug = _.get(context, 'params.project');
  if (_.isArray(projectSlug)) projectSlug = _.first(projectSlug);
  if (!projectSlug) {
    return {
      props: {},
    };
  }

  const result = await getPortfolioDetail(projectSlug);

  return {
    props: {
      projectSlug,
      initialData: result || null,
    },
  };
}

export default PortfolioPage;
