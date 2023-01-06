import { Container, Link, Grid, Button, Image, Flex } from '@raidguild/design-system';

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
  <Container bgImage={Clouds.src} minW='100%' py='8rem'>
    <PageTitle title='Our Portfolio' />
    <Flex flexDirection='column' alignItems='center' gap={4}>
      <Grid
        gridTemplateColumns={[`1fr`, `1fr 1fr 1fr 1fr 1fr`, `1fr 1fr 1fr 1fr 1fr`]}
        placeItems='center'
        margin='1rem auto'
        rowGap={[`3rem`, `8rem`]}>
        {portfolioImages.map((image) => (
          <Image key={image.src} src={image.src} />
        ))}
      </Grid>
      <Link href='/portfolio'>
        <Button margin='1rem auto 0 auto'>View Projects</Button>
      </Link>
    </Flex>
  </Container>
);

export default SectionFour;
