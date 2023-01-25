// A page that displays all of the projects in the portfolio
import _ from 'lodash';
import { useSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import { Box, Heading, HStack, Image, VStack, Text, Button, Card } from '@raidguild/design-system';

import Link from '../../components/atoms/ChakraNextLink';
import CMSPageTemplate from '../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../components/page-components/PageTitle';
import usePortfolioList from '../../hooks/usePortfolioList';
import { getPortfolioList } from '../../gql';
import { nameToSlug } from '../../utils';

import wallSconce from '../../assets/illustrations/wallSconce.svg';

// import Markdown from '../../components/atoms/Markdown';

interface Props {
  initialData: any;
}

// a component for displaying a portfolio project in a list
function PortfolioContent({ project }: { project: any }) {
  const link = `/portfolio/${nameToSlug(_.get(project, 'name'))}`;
  return (
    <Card>
      <HStack gap='4rem'>
        <Image src={_.get(project, 'imageUrl', wallSconce.src)} height='200px' width='200px' marginRight='1rem' />
        <VStack color='white' align='flex-start'>
          <Heading>{_.get(project, 'name')}</Heading>
          <Box maxWidth='50ch'>
            <Text>{_.get(project, 'description')}</Text>
          </Box>
          <Link href={link}>
            <Button variant='outline'>Read More</Button>
          </Link>
        </VStack>
      </HStack>
    </Card>
  );
}

function PortfolioPage({ initialData }: Props) {
  const { data: session } = useSession();
  const token = _.get(session, 'token');
  const { data: portfolioList } = usePortfolioList({ initialData, token });
  console.log(portfolioList);

  return (
    <Box>
      <CMSPageTemplate>
        <PageTitle title='Portfolio' />
        <VStack width='100%' alignItems='center' gap='1rem'>
          {_.map(portfolioList, (project) => (
            <PortfolioContent project={project} key={_.get(project, 'name')} />
          ))}
        </VStack>
      </CMSPageTemplate>
    </Box>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const result = await getPortfolioList();
  console.log(result);

  return {
    props: {
      initialData: _.get(result, 'portfolios', null),
    },
  };
};

export default PortfolioPage;
