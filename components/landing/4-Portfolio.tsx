import _ from 'lodash';
import { Container, Button, Image, Stack, SimpleGrid } from '@raidguild/design-system';
import Link from '../atoms/ChakraNextLink';

import PageTitle from '../page-components/PageTitle';
import wallSconce from '../../assets/illustrations/wallSconce.svg';

import Clouds from '../../assets/illustrations/clouds.webp';

interface SectionFourProps {
  portfolioList: object[];
}

const SectionFour = ({ portfolioList }: SectionFourProps) => {
  return (
    <Container id='portfolio' bgImage={Clouds.src} minW='100%' py='8rem'>
      <PageTitle title='Our Portfolio' />
      <Stack gap={4} align='center'>
        <SimpleGrid columns={{ base: 1, lg: 3 }} placeItems='center' gap={[`3rem`, `4rem`]} maxW='80%'>
          {_.map(portfolioList, (project) => (
            <Link key={_.get(project, 'imageUrl')} href={`/portfolio/${_.get(project, 'slug')}`}>
              <Image src={_.get(project, 'imageUrl', wallSconce.src)} height='auto' width='200px' />
            </Link>
          ))}
        </SimpleGrid>
        <Link href='/portfolio'>
          <Button margin='1rem auto 0 auto'>View Projects</Button>
        </Link>
      </Stack>
    </Container>
  );
};

export default SectionFour;
