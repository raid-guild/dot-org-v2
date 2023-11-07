import _ from 'lodash';
import { Container, Button, Image, Stack, SimpleGrid, Flex, Center } from '@raidguild/design-system';
import Link from '../atoms/ChakraNextLink';

import PageTitle from '../page-components/PageTitle';
import wallSconce from '../../assets/illustrations/wallSconce.svg';

import Clouds from '../../assets/illustrations/clouds.webp';

interface SectionFourProps {
  portfolioList: object[];
}

const SectionFour = ({ portfolioList }: SectionFourProps) => {
  return (
    <Center id='portfolio' bgImage={Clouds.src} minW='100%' py='8rem' minH='max' flexDir='column'>
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
          <Button margin='1rem auto 0 auto'>View Projects</Button>
        </Link>
      </Stack>
    </Center>
  );
};

export default SectionFour;
