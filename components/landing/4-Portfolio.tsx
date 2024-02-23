import { Flex, Image, SimpleGrid, Stack } from '@raidguild/design-system';
import _ from 'lodash';
import AnimatedButton from '../atoms/AnimatedButton';
import Link from '../atoms/ChakraNextLink';

import wallSconce from '../../assets/illustrations/wallSconce.svg';
import PageTitle from '../page-components/PageTitle';

import Clouds from '../../assets/illustrations/clouds.webp';

interface SectionFourProps {
  portfolioList: object[];
}

const SectionFour = ({ portfolioList }: SectionFourProps) => {
  return (
    <Flex
      id='portfolio'
      bgImage={Clouds.src}
      bgColor='black'
      minW='100%'
      py='8rem'
      minH='max'
      flexDir='column'
      gap={20}>
      <PageTitle title='Our Portfolio' />
      <Stack gap={20} align='center'>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} alignItems='center' gap={{ base: 16, md: 20 }} maxW='80%'>
          {_.map(portfolioList, (project) => (
            <Link key={_.get(project, 'imageUrl')} href={`/portfolio/${_.get(project, 'slug')}`}>
              <Flex width='200px' justify='center' align='center'>
                <Image src={_.get(project, 'imageUrl', wallSconce.src)} width='80%' />
              </Flex>
            </Link>
          ))}
        </SimpleGrid>
        <Link href='/portfolio'>
          <AnimatedButton width='max-content' start='bottom'>
            View All Projects
          </AnimatedButton>
        </Link>
      </Stack>
    </Flex>
  );
};

export default SectionFour;
