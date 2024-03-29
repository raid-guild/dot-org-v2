import { Box, Link } from '@raidguild/design-system';
import GradientShiftButton from '../atoms/GradientShiftButton';
import Clouds from '../../assets/illustrations/clouds.webp';
import Valhalla from '../../assets/illustrations/valhalla.svg';
import WallSconce from '../../assets/illustrations/wallSconce.svg';
import Wand from '../../assets/illustrations/wand.svg';
import layerStyles from '../../utils/extendedTokens';
import CTABtnGroup from '../atoms/CTABtnGroup';
import ServiceSectionContainer from '../page-components/ServiceSectionContainer';
import SiteLayout from '../page-components/SiteLayout';

type Props = {
  pageTitle: string;
  pageDescription: string;
  salesContent: string;
  roleImage: React.ReactNode;
  children: React.ReactNode;
};

const ServicePageTemplate = ({ pageTitle, pageDescription, salesContent, children, roleImage }: Props) => {
  return (
    <SiteLayout bg={layerStyles.purpleToIndigoGradient}>
      <Box background='blackDark' textColor='white'>
        <ServiceSectionContainer
          content={pageDescription}
          imagePosition='row'
          title={pageTitle}
          icon={WallSconce.src}
          cta={
            // <Link href='#Projects'>
            <Link href='/portfolio'>
              <GradientShiftButton>View Projects</GradientShiftButton>
            </Link>
          }
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
          cta={<CTABtnGroup />}
        />
      </Box>
      {children}
    </SiteLayout>
  );
};

export default ServicePageTemplate;
