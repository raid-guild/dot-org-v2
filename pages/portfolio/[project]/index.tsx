import {
  Button,
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
} from '@raidguild/design-system';
import _ from 'lodash';
import { GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { FiEdit } from 'react-icons/fi';
import GradientShiftButton from '../../../components/atoms/GradientShiftButton';
import Wand from '../../../assets/illustrations/wand.svg';
import Markdown from '../../../components/atoms/Markdown';
import ProjectCard from '../../../components/page-components/ProjectCard';

import raidFantasy from '../../../assets/illustrations/raid__fantasy.webp';
import Link from '../../../components/atoms/ChakraNextLink';
import PageTitle from '../../../components/page-components/PageTitle';
import CMSPageTemplate from '../../../components/page-templates/CMSPageTemplate';
import { getPortfolioDetail } from '../../../gql';
import { checkPermission } from '../../../utils';

function PortfolioPage(props: any) {
  const { data: session } = useSession();

  const { initialData } = props;
  const canEdit = checkPermission(session);

  const router = useRouter();
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
        <Stack alignItems='center' py='6'>
          <GradientShiftButton width='max-content' onClick={() => router.push(`/portfolio/${initialData.slug}/edit`)}>
            <Flex w='max-content' px={4} gap={2} alignItems='center' justifyContent='center'>
              <FiEdit fontSize='16px' color='white' /> Create new Post
            </Flex>
          </GradientShiftButton>
        </Stack>
      )}

      <VStack
        layerStyle='redToPurpleVerticalGradient'
        border='none'
        w='100vw'
        h='500px'
        justify='center'
        align='center'
        overflow='hidden'
        position='relative'>
        <Image
          src={raidFantasy.src}
          alt='raid fantasy'
          alignSelf='center'
          minW='50vw'
          maxWidth='100%'
          position='absolute'
          opacity={0.15}
        />
        <Stack p='2rem' align='center' zIndex={50}>
          <HStack align='center' gap={6} justify='center'>
            <Icon as={Castle} w='32px' h='32px' />
            <Heading variant='shadow' size='md'>
              What We Did
            </Heading>
          </HStack>
          <Flex textAlign='center'>
            <Text maxW='900px'>{_.get(initialData, 'description')}</Text>
          </Flex>
        </Stack>
      </VStack>

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

        <VStack maxW={900} gap={12} my={10} justify='flex-start' align='flex-start'>
          <Stack spacing={6} align={{ base: 'center', lg: 'flex-start' }} maxW='80vw'>
            <Stack flexDir={{ base: 'column', md: 'row' }} align='center' gap={6}>
              <Icon as={Castle} w='32px' h='32px' />
              <Heading variant='shadow' size='md'>
                The Challenge
              </Heading>
            </Stack>
            <Stack spacing={6}>
              {_.map(_.get(initialData, 'challenge.content'), (content: any) => (
                <Markdown key={content}>{content}</Markdown>
              ))}
            </Stack>
          </Stack>
          <Stack spacing={6} align={{ base: 'center', lg: 'flex-start' }} maxW='80vw'>
            <Stack flexDir={{ base: 'column', md: 'row' }} align='center' gap={6}>
              <Icon as={Swords} w='32px' h='32px' />
              <Heading variant='shadow' size='md'>
                Our Approach
              </Heading>
            </Stack>
            <Stack spacing={6}>
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

            <Stack spacing={6}>
              {_.map(_.get(initialData, 'result.content'), (content: any) => (
                <Markdown key={content}>{content}</Markdown>
              ))}
            </Stack>
          </Stack>
          <Flex
            w='full'
            mt={{ base: '2rem' }}
            direction={{ base: 'column', lg: 'row' }}
            alignItems='center'
            justifyContent={{ base: 'center', lg: 'flex-start' }}
            gap={2}>
            {_.get(initialData, 'resultLink') && (
              <Link href={_.get(initialData, 'resultLink')} isExternal>
                <GradientShiftButton width='180px'>View Project</GradientShiftButton>
              </Link>
            )}

            {_.get(initialData, 'repoLink') && (
              <Link href={_.get(initialData, 'repoLink')} isExternal>
                <Button variant='gradientOutline' width='180px' fontFamily='monospace' fontWeight={500}>
                  View Codebase
                </Button>
              </Link>
            )}
          </Flex>
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
