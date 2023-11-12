import {
  Box,
  Button,
  Card,
  CardBody,
  Castle,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Stack,
  Swords,
  Text,
  VStack,
  defaultTheme,
} from '@raidguild/design-system';
import _ from 'lodash';
import { GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import { FaEdit } from 'react-icons/fa';
import Wand from '../../../assets/illustrations/wand.svg';
import GradientButton from '../../../components/atoms/GradientButton';
import Markdown from '../../../components/atoms/Markdown';

import raidFantasy from '../../../assets/illustrations/raid__fantasy.webp';
import Link from '../../../components/atoms/ChakraNextLink';
import GradientBorderButton from '../../../components/atoms/GradientBorderButton';
import PageTitle from '../../../components/page-components/PageTitle';
import CMSPageTemplate from '../../../components/page-templates/CMSPageTemplate';
import { getPortfolioDetail } from '../../../gql';
import { checkPermission } from '../../../utils';

interface ProjectCardProps {
  name: string;
  logo: string;
  website: string;
}

const ProjectCard = ({ name, logo, website }: ProjectCardProps) => {
  return (
    <Stack maxW='600px' border={`1px solid ${defaultTheme.colors.red[500]}`} align='center' spacing={4} pb={6}>
      <Box layerStyle='redToPurpleVerticalGradient' w='full' height='90px' position='relative'>
        <Box
          bg='black'
          w='100px'
          h='100px'
          position='absolute'
          top='50%'
          left='50%'
          transform='translate(-50%, -5%)'
          border={`1px solid ${defaultTheme.colors.red[500]}`}>
          <Image
            src={logo}
            width='60px'
            height='auto'
            position='absolute'
            top='50%'
            left='50%'
            transform='translate(-50%, -50%)'
          />
        </Box>
      </Box>
      <Stack align='center' spacing={4} px={10} mt={16}>
        <Heading textAlign='center' size='lg' variant='shadow'>
          {name}
        </Heading>
        <Text p={4}>{website}</Text>
        {website && (
          <Link href={website} isExternal>
            <GradientButton width='max'>Visit Website</GradientButton>
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
      <Flex minH='30vh' maxH='max-content' justify='center' align='center'>
        <Text maxW='900px' p='2rem' textAlign='center' lineHeight='taller' mb={8}>
          {_.get(initialData, 'description')}
        </Text>
      </Flex>

      <Card layerStyle='redToPurpleVerticalGradient' border='none' w='100vw'>
        <Image
          src={raidFantasy.src}
          alt='raid fantasy'
          alignSelf='center'
          height='full'
          position='absolute'
          opacity={0.15}
          overflow='clip'
        />
        <Stack p='2rem' align='center'>
          <HStack align='center' gap={6}>
            <Icon as={Castle} w='32px' h='32px' />
            <Heading variant='shadow' size='md'>
              The Challenge
            </Heading>
          </HStack>
          <CardBody textAlign='center' lineHeight='taller'>
            <Text lineHeight='taller' maxW='900px'>
              {_.map(_.get(initialData, 'challenge.content'), (content: any) => (
                <Markdown key={content}>{content}</Markdown>
              ))}
            </Text>
          </CardBody>
        </Stack>
      </Card>
      <Stack
        direction={{ base: 'column', xl: 'row' }}
        align={{ base: 'center', xl: 'flex-start' }}
        spacing={14}
        mt={12}
        justify='space-around'
        p={6}>
        <ProjectCard
          name={_.get(initialData, 'name')}
          website={_.get(initialData, 'resultLink')}
          logo={_.get(initialData, 'imageUrl')}
        />

        <VStack maxW={900} gap={12}>
          <Stack spacing={6} align={{ base: 'center', lg: 'flex-start' }} maxW='80vw'>
            <Stack flexDir={{ base: 'column', md: 'row' }} align='center' gap={6}>
              <Icon as={Swords} w='32px' h='32px' />
              <Heading variant='shadow' size='md'>
                Our Approach
              </Heading>
            </Stack>
            <Stack spacing={6} lineHeight='taller'>
              {_.map(_.get(initialData, 'approach.content'), (content: any) => (
                <Markdown key={content}>{content}</Markdown>
              ))}
            </Stack>
          </Stack>
          <Stack spacing={6} align={{ base: 'center', lg: 'flex-start' }} maxW='80vw'>
            <Stack flexDir={{ base: 'column', md: 'row' }} align='center' gap={6}>
              <Image src={Wand.src} w='32px' h='32px' />
              <Heading variant='shadow' size='md'>
                The Result
              </Heading>
            </Stack>

            <Stack spacing={6} lineHeight='taller'>
              {_.map(_.get(initialData, 'result.content'), (content: any) => (
                <Markdown key={content}>{content}</Markdown>
              ))}
            </Stack>
          </Stack>
          <Stack
            gap={2}
            flexDir={{ base: 'column', lg: 'row' }}
            alignItems={{ base: 'center', lg: 'flex-start' }}
            w='full'>
            {_.get(initialData, 'resultLink') && (
              <Link href={_.get(initialData, 'resultLink')} isExternal>
                <GradientButton width='180px'>View Project</GradientButton>
              </Link>
            )}

            {_.get(initialData, 'repoLink') && (
              <Link href={_.get(initialData, 'repoLink')} isExternal>
                <GradientBorderButton width='180px' label='View Codebase' />
              </Link>
            )}
          </Stack>
        </VStack>
      </Stack>
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
