// A page that displays all of the projects in the portfolio
import _ from 'lodash';
import { useSession } from 'next-auth/react';
import {
  Box,
  Heading,
  Stack,
  Image,
  VStack,
  Text,
  Card,
  Flex,
  Button,
  Grid,
  SimpleGrid,
} from '@raidguild/design-system';
import { FaEdit } from 'react-icons/fa';
import Link from '../../components/atoms/ChakraNextLink';
import CMSPageTemplate from '../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../components/page-components/PageTitle';
import usePortfolioList from '../../hooks/usePortfolioList';
import { getPortfolioList } from '../../gql';
import { checkPermission } from '../../utils';
import wallSconce from '../../assets/illustrations/wallSconce.svg';

interface Props {
  initialData: any;
}

// a component for displaying a portfolio project in a list
function PortfolioContent({ project }: { project: any }) {
  const link = `/portfolio/${project.slug}`;
  return (
    <Link href={link}>
      <Image src={_.get(project, 'imageUrl')} maxH='60px' />
    </Link>
  );
}

function PortfolioPage({ initialData }: Props) {
  const { data: session } = useSession();
  const token = _.get(session, 'token');
  const { data: portfolioList } = usePortfolioList({ initialData, token });

  const canCreate = checkPermission(session);
  return (
    <CMSPageTemplate>
      <PageTitle title='Portfolio' />
      <Text textAlign='center' px='5rem'>
        Our work speaks for itself. Click on one of our clients logos and see the project details page.
      </Text>
      {canCreate && (
        <Stack alignItems='center' pt='6'>
          <Link href='/portfolio/new'>
            <Button variant='link' leftIcon={<FaEdit />}>
              Add new Portfolio
            </Button>
          </Link>
        </Stack>
      )}
      <SimpleGrid
        minChildWidth='120px'
        spacing='60px'
        alignItems='center'
        justifyContent='center'
        mx={8}
        my={16}
        columns={{ base: 1, md: 2 }}>
        {_.map(portfolioList, (project) => (
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
  };
};

export default PortfolioPage;
