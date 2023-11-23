// A page that displays all of the projects in the portfolio
import { Flex, Image, SimpleGrid, Stack, Text } from '@raidguild/design-system';
import _ from 'lodash';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FiEdit } from 'react-icons/fi';
import Link from '../../components/atoms/ChakraNextLink';
import GradientBorderButton from '../../components/atoms/GradientBorderButton';
import PageTitle from '../../components/page-components/PageTitle';
import CMSPageTemplate from '../../components/page-templates/CMSPageTemplate';
import { getPortfolioList } from '../../gql';
import usePortfolioList from '../../hooks/usePortfolioList';
import { checkPermission } from '../../utils';
import { defaultTheme } from '@raidguild/design-system';
interface Props {
  initialData: any;
}

// a component for displaying a portfolio project in a list
function PortfolioContent({ project }: { project: any }) {
  const link = `/portfolio/${project.slug}`;
  return (
    <Link href={link} alignItems='center' justifyContent='center'>
      <Image src={_.get(project, 'imageUrl')} maxH='60px' objectFit='cover' />
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
      <Text textAlign='center' px='5rem'>
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
        spacing='60px'
        alignItems='center'
        justifyContent='center'
        mx={8}
        my={16}
        columns={{ base: 1, md: 2, lg: 3 }}>
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
