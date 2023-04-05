import _ from 'lodash';
import {
  Heading,
  Stack,
  Image,
  Icon,
  HStack,
  Card,
  CardBody,
  Castle,
  Text,
  Button,
  Flex,
} from '@raidguild/design-system';
import { FaEdit } from 'react-icons/fa';
import { GetServerSidePropsContext } from 'next';
import { NextSeo } from 'next-seo';
import { useSession } from 'next-auth/react';
import Markdown from '../../../components/atoms/Markdown';

import CMSPageTemplate from '../../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../../components/page-components/PageTitle';
import Link from '../../../components/atoms/ChakraNextLink';
import { getPortfolioDetail } from '../../../gql';
import { checkPermission } from '../../../utils';

interface ProjectCardProps {
  name: string;
  logo: string;
  website: string;
}

const ProjectCard = ({ name, logo, website }: ProjectCardProps) => {
  return (
    <Stack
      width={['auto', 'auto', 'auto', '30%', '30%']}
      border='1px solid #FF3864'
      px='12'
      py='8'
      align='center'
      spacing={4}>
      {/* <Box background='linear-gradient(102.93deg, #2B0000 0%, #3D0610 29.17%, #5A1049 61.98%, #461881 100%)' /> */}
      <Image src={logo} width='96px' height='auto' my={4} />
      <Stack align='center' spacing={4}>
        <Heading textAlign='center' size='lg'>
          {name}
        </Heading>
        <Text>{website}</Text>
        {website && (
          <Link href={website} isExternal>
            <Button>Visit Website</Button>
          </Link>
        )}
      </Stack>
    </Stack>
  );
};

interface Props {
  initialData: any;
}

function PortfolioPage({ initialData }: Props) {
  const { data: session } = useSession();

  const canEdit = checkPermission(session);

  return (
    <CMSPageTemplate>
      <PageTitle title={_.get(initialData, 'name')} />
      <NextSeo
        title={_.get(initialData, 'name')}
        description={_.get(initialData, 'description')}
        canonical={_.get(initialData, 'resultLink')}
        openGraph={{
          url: `${_.get(initialData, 'resultLink')}`,
          title: `${_.get(initialData, 'name')}`,
          description: `${_.get(initialData, 'description')}`,
          images: [
            {
              url: `${_.get(initialData, 'imageUrl')}`,
              alt: `${_.get(initialData, 'name')}`,
            },
          ],
        }}
      />
      {canEdit && (
        <Stack alignItems='center' pb={8}>
          <Link href={`/portfolio/${initialData.slug}/edit`}>
            <Button variant='link' leftIcon={<FaEdit />}>
              Edit Portfolio
            </Button>
          </Link>
        </Stack>
      )}
      <Flex minH='250px' justify='center' align='center'>
        <Text maxW='60%' textAlign='center'>
          {_.get(initialData, 'description')}
        </Text>
      </Flex>

      <Card layerStyle='redToPurpleVerticalGradient' border='none'>
        <Stack p='4rem' align='center'>
          <HStack align='center' gap={2}>
            <Icon as={Castle} w='32px' h='32px' />
            <Heading size='lg'>The Challenge</Heading>
          </HStack>
          <CardBody
            textAlign={['justify', 'justify', 'justify', 'center', 'center']}
            width={['auto', 'auto', 'auto', '70%', '70%']}
            lineHeight='taller'>
            <Stack spacing={6}>
              {_.map(_.get(initialData, 'challenge.content'), (content: any) => (
                <Markdown key={content}>{content}</Markdown>
              ))}
            </Stack>
          </CardBody>
        </Stack>
      </Card>
      <Stack
        direction={['column', 'column', 'column', 'row', 'row']}
        align='center'
        spacing={14}
        justify='space-around'
        px={28}
        py={14}>
        <ProjectCard
          name={_.get(initialData, 'name')}
          website={_.get(initialData, 'resultLink')}
          logo={_.get(initialData, 'imageUrl')}
        />
        <Stack p='4rem' spacing={6} align='center'>
          <HStack align='center' gap={2}>
            <Icon as={Castle} w='32px' h='32px' />
            <Heading size='lg'>The Approach</Heading>
          </HStack>
          <Stack spacing={6}>
            {_.map(_.get(initialData, 'approach.content'), (content: any) => (
              <Markdown key={content}>{content}</Markdown>
            ))}
          </Stack>
        </Stack>
      </Stack>
      <Card layerStyle='redToPurpleVerticalGradient' border='none'>
        <Stack p='4rem' align='center'>
          <HStack align='center' gap={2}>
            <Icon as={Castle} w='32px' h='32px' />
            <Heading size='lg'>The Result</Heading>
          </HStack>
          <CardBody
            textAlign={['justify', 'justify', 'justify', 'center', 'center']}
            width={['auto', 'auto', 'auto', '70%', '70%']}
            lineHeight='taller'>
            <Stack spacing={6}>
              {_.map(_.get(initialData, 'result.content'), (content: any) => (
                <Markdown key={content}>{content}</Markdown>
              ))}
            </Stack>
          </CardBody>
        </Stack>
      </Card>
      <Flex minH='200px' justify='center' align='center'>
        <HStack gap={2} justify={['center', 'center', 'center', 'start', 'start']}>
          {_.get(initialData, 'resultLink') && (
            <Link href={_.get(initialData, 'resultLink')} isExternal>
              <Button>View Project</Button>
            </Link>
          )}

          {_.get(initialData, 'repoLink') && (
            <Link href={_.get(initialData, 'repoLink')} isExternal>
              <Button variant='outline'>View Codebase</Button>
            </Link>
          )}
        </HStack>
      </Flex>
    </CMSPageTemplate>
  );
}

// export async function getStaticPaths() {
//   const portfolios = await getPortfolioList();

//   const paths = portfolios.map((portfolio: any) => ({
//     params: { project: portfolio.slug },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// This function gets called at build time
export async function getServerSideProps(context: GetServerSidePropsContext) {
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
      initialData: result,
    },
  };
}

export default PortfolioPage;
