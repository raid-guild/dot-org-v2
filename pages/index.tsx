import _ from 'lodash';
import { useSession } from 'next-auth/react';
import { Box, Flex } from '@raidguild/design-system';

// import Meta from '../components/page-components/Meta';
import Hero from '../components/landing/1-Hero';
import Manifesto from '../components/landing/2-Manifesto';
import Services from '../components/landing/3-Services';
import Portfolio from '../components/landing/4-Portfolio';
import Join from '../components/landing/5-Join';
import Supporters from '../components/landing/6-Supporters';
import Footer from '../components/page-components/Footer';
import usePortfolioList from '../hooks/usePortfolioList';
import { getPortfolioList } from '../gql';

// * `<Nav />` is included in `<Hero />` for the landing page

interface Props {
  initialData: any;
}

const Home = ({ initialData }: Props) => {
  const { data: session } = useSession();
  const token = _.get(session, 'token');
  const { data: portfolioList } = usePortfolioList({ initialData, token });

  return (
    <>
      {/* <Meta /> */}
      <Box layerStyle='primaryBackground' height='100vh' width='100vw'>
        <Flex maxW='100rem' mx='auto' overflowX='hidden'>
          <Flex height='100%' width='100%' direction='column'>
            <Hero />
            <Manifesto />
            <Services />
            <Portfolio portfolioList={portfolioList} />
            <Join />
            <Supporters />
            <Footer />
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const result = await getPortfolioList();

  return {
    props: {
      initialData: result,
    },
  };
};
