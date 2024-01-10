// A page that displays all of the projects in the portfolio
import { Box, Button, Image, SimpleGrid, Stack, Text, VStack } from '@raidguild/design-system';
import * as Fathom from 'fathom-client';
import _ from 'lodash';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FiPlusCircle } from 'react-icons/fi';
import Link from '../../components/atoms/ChakraNextLink';
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
];

// a component for displaying a portfolio project in a list
function PortfolioContent({ project }: { project: any }) {
  const link = `/portfolio/${project.slug}`;
  return (
    <Link href={link} onClick={() => Fathom.trackEvent(`Portfolio ${project.slug} Clicked`)}>
      <Image src={_.get(project, 'imageUrl')} boxSize={32} objectFit='contain' />
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
          <Button variant='bright' width='max-content' onClick={() => router.push('/portfolio/new')} gap={2}>
            {/* <Flex w='max-content' px={4} gap={2}> */}
            <FiPlusCircle fontSize='16px' color='white' /> Add Portfolio
            {/* </Flex> */}
          </Button>
        </Stack>
      )}

      <SimpleGrid
        m={12}
        gap={{ base: 12, xl: 36 }}
        columns={{ base: 1, md: 3 }}
        alignItems='center'
        justifyContent='center'>
        {portfolioStats.map((stat) => (
          <VStack key={stat.label} spacing={1} textAlign='center'>
            <Box bg={tokens.purpleToBlueGradient} bgClip='text'>
              <Text fontSize='5xl' fontWeight='medium' fontFamily='uncial'>
                {stat.numbers}
              </Text>
            </Box>
            <Text fontSize='xl' fontWeight='medium'>
              {stat.label}
            </Text>
          </VStack>
        ))}
      </SimpleGrid>
      <SimpleGrid gap={{ base: 12, xl: 10 }} columns={{ base: 2, xl: 5 }} py={20} justifyItems='center'>
        {labels.map((label) => (
          <Button variant='gradientOutline' key={label} minW='max-content' w='200px'>
            {label}
          </Button>
        ))}
      </SimpleGrid>
      <PageTitle title='' hideIcon />
      <SimpleGrid gap={{ base: 6, xl: 10 }} columns={{ base: 2, xl: 5 }} py={20} justifyItems='center'>
        {_.map(portfolioList, (project: any) => (
          <PortfolioContent project={project} key={_.get(project, 'name')} />
        ))}
      </SimpleGrid>
    </CMSPageTemplate>
  );
}

export const getStaticProps = async () => {
  const result = await getPortfolioList();

  return {
    props: {
      initialData: result,
    },
    revalidate: 10,
  };
};

export default PortfolioPage;
