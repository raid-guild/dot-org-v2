import { Flex, Image, SimpleGrid, Stack } from '@raidguild/design-system';
import _ from 'lodash';
import tokens from '../../utils/extendedTokens';
import Link from '../atoms/ChakraNextLink';
import GradientShiftButton from '../atoms/GradientShiftButton';

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
      bg={tokens.backgroundImageOverlay}
      bgColor='gray.900'
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
          <GradientShiftButton width='max-content' px={8}>
            View All Projects
          </GradientShiftButton>
        </Link>
      </Stack>
    </Flex>
  );
};

export default SectionFour;
