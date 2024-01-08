import { Box } from '@raidguild/design-system';
import Clouds from '../../assets/illustrations/clouds.webp';
import Valhalla from '../../assets/illustrations/valhalla.svg';
import WallSconce from '../../assets/illustrations/wallSconce.svg';
import Wand from '../../assets/illustrations/wand.svg';
import tokens from '../../utils/extendedTokens';
import ServiceSectionContainer from '../page-components/ServiceSectionContainer';
import SiteLayout from '../page-components/SiteLayout';

type Props = {
  pageTitle: string;
  pageDescription: string;
  salesContent: string;
  roleImage: React.ReactNode;
  children: React.ReactNode;
};

const ServicePageTemplate = ({ pageTitle, pageDescription, salesContent, roleImage, children, ...props }: Props) => {
  return (
    <SiteLayout bg={tokens.purpleToIndigoGradient}>
      <Box background='blackDark' textColor='white'>
        <ServiceSectionContainer
          content={pageDescription}
          imagePosition='row'
          title={pageTitle}
          icon={WallSconce.src}
        />
      </Box>
      <Box background='blackDark' textColor='white' zIndex={30}>
        <ServiceSectionContainer
          content={salesContent}
          icon={Wand.src}
          bg='black'
          imageUrl={Valhalla.src}
          bgImage={Clouds.src}
          imagePosition='row-reverse'
          title='Our Approach'
          cta
        />
      </Box>
      {children}
    </SiteLayout>
  );
};

export default ServicePageTemplate;
