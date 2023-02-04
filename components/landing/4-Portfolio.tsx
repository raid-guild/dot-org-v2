import { Container, Button, Image, Stack, SimpleGrid } from '@raidguild/design-system';
import Link from '../atoms/ChakraNextLink';

import PageTitle from '../page-components/PageTitle';

// import wrapeth from '../../public/assets/logos/wrapeth.webp';
// import smartinvoice from '../../public/assets/logos/smartinvoice.webp';

import SmartInvoice from '../../assets/logos/SmartInvoiceLogo.svg';
import BasedGhouls from '../../assets/logos/BasedGhoulsLogo.svg';
import MetaStreet from '../../assets/logos/MetaStreetLogo.svg';
import Aura from '../../assets/logos/AuraLogo.svg';
import CreativeDao from '../../assets/logos/CreativeDaoLogo.svg';
import Headline from '../../assets/logos/HeadlineLogo.svg';
import MadFinance from '../../assets/logos/MadFinanceLogo.svg';
import Yeet from '../../assets/logos/YeetLogo.svg';
import MetaDrip from '../../assets/logos/MetaDripLogo.svg';
import RaidBrood from '../../assets/logos/RaidBroodLogo.svg';
import Clouds from '../../assets/illustrations/clouds.webp';

const portfolioImages = [
  SmartInvoice,
  BasedGhouls,
  MetaStreet,
  Aura,
  CreativeDao,
  Headline,
  MadFinance,
  Yeet,
  MetaDrip,
  RaidBrood,
];

const SectionFour = () => (
  <Container id='portfolio' bgImage={Clouds.src} minW='100%' py='8rem'>
    <PageTitle title='Our Portfolio' />
    <Stack gap={4} align='center'>
      <SimpleGrid columns={{ base: 1, lg: 5 }} placeItems='center' gap={[`3rem`, `4rem`]} maxW='80%'>
        {portfolioImages.map((image) => (
          <Image key={image.src} src={image.src} />
        ))}
      </SimpleGrid>
      <Link href='https://portfolio.raidguild.org/' isExternal>
        <Button margin='1rem auto 0 auto'>View Projects</Button>
      </Link>
    </Stack>
  </Container>
);

export default SectionFour;
