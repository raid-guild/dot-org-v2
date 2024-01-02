// A page that displays all of the projects in the portfolio
import { Box, Flex, Image, SimpleGrid, Stack, Text, VStack, defaultTheme } from '@raidguild/design-system';
import _ from 'lodash';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FiEdit } from 'react-icons/fi';
import Link from '../../components/atoms/ChakraNextLink';
import GradientBorderButton from '../../components/atoms/AnimatedButton';
import PageTitle from '../../components/page-components/PageTitle';
import CMSPageTemplate from '../../components/page-templates/CMSPageTemplate';
import { getPortfolioList } from '../../gql';
import usePortfolioList from '../../hooks/usePortfolioList';
import { checkPermission } from '../../utils';
import tokens from '../../utils/extendedTokens';

const labels = [
  'TOKEN',
  'NFT DROP',
  'LAUNCHPAD',
  'DEFI',
  'DAPP',
  'COMMUNITY',
  'NFT MARKET',
  'DEX',
  'PUBLIC GOODS',
  'INFRASTRUCTURE',
];

interface Props {
  initialData: any;
}

const portfolioStats = [
  {
    numbers: '69+',
    label: 'Unique Clients',
  },
  {
    numbers: '120',
    label: 'Raids Completed',
  },
  {
    numbers: '54',
    label: 'Active Raiders',
  },
  {
    numbers: '54',
    label: 'Active Raiders',
  },
];

// a component for displaying a portfolio project in a list
function PortfolioContent({ project }: { project: any }) {
  const link = `/portfolio/${project.slug}`;
  return (
    <Link href={link}>
      <Image src={_.get(project, 'imageUrl')} maxH='40px' objectFit='cover' />
    </Link>
  );
}

function PortfolioPage({ initialData }: Props) {
  const { data: session } = useSession();
  const token = _.get(session, 'token');
  const { data: portfolioList } = usePortfolioList({ initialData, token });

  const canCreate = checkPermission(session);
  const router = useRouter();
  return (
    <CMSPageTemplate>
      <PageTitle title='Portfolio' />
      <Text textAlign='center' px='5rem' fontSize='xl' my={8} mx={4}>
        Our work speaks for itself. Click on one of our clients logos and see the project details page.
      </Text>
      {canCreate && (
        <Stack alignItems='center' pt='6'>
          <GradientBorderButton
            width='max-content'
            label={
              <Flex w='max-content' px={4} gap={2}>
                <FiEdit fontSize='16px' color={defaultTheme.colors.purple[500]} /> Add Portfolio
              </Flex>
            }
            onClick={() => router.push('/portfolio/new')}
          />
        </Stack>
      )}

      <SimpleGrid
        m={12}
        gap={{ base: 12, xl: 36 }}
        columns={{ base: 2, xl: 4 }}
        alignItems='center'
        justifyContent='center'>
        {portfolioStats.map((stat) => (
          <VStack key={stat.label} spacing={1} textAlign='center'>
            <Box bg={tokens.purpleToBlueGradient} bgClip='text'>
              <Text fontSize='5xl' fontWeight='normal' fontFamily='uncial'>
                {stat.numbers}
              </Text>
            </Box>
            <Text fontSize='xl' fontWeight='medium'>
              {stat.label}
            </Text>
          </VStack>
        ))}
      </SimpleGrid>
      <Flex gap={8} alignItems='center' justifyContent='center' m={20} flexWrap='wrap' maxW='1200px'>
        {labels.map((label) => (
          <GradientBorderButton key={label} label={label} width='200px' />
        ))}
      </Flex>
      <PageTitle title='' hideIcon />
      <Flex gap={40} alignItems='center' justifyContent='center' mx={8} my={16} flexWrap='wrap'>
        {_.map(portfolioList, (project) => (
          <PortfolioContent project={project} key={_.get(project, 'name')} />
        ))}
      </Flex>
    </CMSPageTemplate>
  );
}

export const getStaticProps = async () => {
  const result = await getPortfolioList();

  return {
    props: {
      initialData: result,
    },
  };
};

export default PortfolioPage;
