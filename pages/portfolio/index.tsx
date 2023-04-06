// A page that displays all of the projects in the portfolio
import _ from 'lodash';
import { useSession } from 'next-auth/react';
import { Box, Heading, HStack, Stack, Image, VStack, Text, Card, Flex } from '@raidguild/design-system';

import Link from '../../components/atoms/ChakraNextLink';
import CMSPageTemplate from '../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../components/page-components/PageTitle';
import usePortfolioList from '../../hooks/usePortfolioList';
import { getPortfolioList } from '../../gql';

import wallSconce from '../../assets/illustrations/wallSconce.svg';

interface Props {
  initialData: any;
}

// a component for displaying a portfolio project in a list
function PortfolioContent({ project }: { project: any }) {
  const link = `/portfolio/${project.slug}`;
  return (
    <Link href={link}>
      <Card border='1px solid #FF3864' w={['90%', '90%', '90%', '100%', '100%']} mx='auto' p={4}>
        <Flex minH='250px' align='center'>
          <Stack
            spacing='4rem'
            direction={['column', 'column', 'column', 'row', 'row']}
            alignItems={['flex-start', 'flex-start', 'flex-start', 'center', 'center']}>
            <Image src={_.get(project, 'imageUrl', wallSconce.src)} w='200px' marginRight='1rem' />
            <VStack spacing={6} color='white' align='flex-start'>
              <Heading>{_.get(project, 'name')}</Heading>
              <Box maxWidth='50ch'>
                <Text noOfLines={3}>{_.get(project, 'description')}</Text>
              </Box>
            </VStack>
          </Stack>
        </Flex>
      </Card>
    </Link>
  );
}

function PortfolioPage({ initialData }: Props) {
  const { data: session } = useSession();
  const token = _.get(session, 'token');
  const { data: portfolioList } = usePortfolioList({ initialData, token });
  return (
    <Box>
      <CMSPageTemplate>
        <PageTitle title='Portfolio' />
        <VStack mt={16} width='100%' alignItems='center' spacing={20}>
          {_.map(portfolioList, (project) => (
            <PortfolioContent project={project} key={_.get(project, 'name')} />
          ))}
        </VStack>
      </CMSPageTemplate>
    </Box>
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
