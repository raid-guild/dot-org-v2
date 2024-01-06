import { Button, Flex, Image, SimpleGrid, Stack } from '@raidguild/design-system';
import _ from 'lodash';
import tokens from '../../utils/extendedTokens';
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
      bg={tokens.backgroundImageOverlay}
      bgColor='gray.900'
      minW='100%'
      py='8rem'
      minH='max'
      flexDir='column'>
      <PageTitle title='Our Portfolio' />
      <Stack gap={10} align='center'>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} alignItems='center' gap={[`8rem`, `8rem`]} maxW='80%'>
          {_.map(portfolioList, (project) => (
            <Link key={_.get(project, 'imageUrl')} href={`/portfolio/${_.get(project, 'slug')}`}>
              <Flex height='200px' width='200px' justify='center' align='center'>
                <Image src={_.get(project, 'imageUrl', wallSconce.src)} width='100%' />
              </Flex>
            </Link>
          ))}
        </SimpleGrid>
        <Link href='/portfolio'>
          <Button variant='bright' width='max-content' fontWeight={500} fontFamily='spaceMono'>
            View All Projects
          </Button>
        </Link>
      </Stack>
    </Flex>
  );
};

export default SectionFour;
