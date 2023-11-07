import { Button, Center, Flex, Image, SimpleGrid, Stack } from '@raidguild/design-system';
import _ from 'lodash';
import GradienButton from '../atoms/GradientButton';
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
    <Center
      id='portfolio'
      bgImage={Clouds.src}
      bg={tokens.backgroundImageOverlay}
      minW='100%'
      py='8rem'
      minH='max'
      flexDir='column'>
      <PageTitle title='Our Portfolio' />
      <Stack gap={4} align='center'>
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
          <GradienButton label='VIEW ALL PROJECTS' width='220px' />
        </Link>
      </Stack>
    </Center>
  );
};

export default SectionFour;
