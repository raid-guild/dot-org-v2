import { Box, Card, Flex, Heading, HStack, Image, Link } from '@raidguild/design-system';
import Clouds from '../../assets/illustrations/clouds.webp';
import Valhalla from '../../assets/illustrations/valhalla.svg';
import WallSconce from '../../assets/illustrations/wallSconce.svg';
import Wand from '../../assets/illustrations/wand.svg';
import tokens from '../../utils/extendedTokens';
import GradientBorderButton from '../atoms/GradientBorderButton';
import GradientButton from '../atoms/GradientButton';
import Markdown from '../atoms/Markdown';
import Container from '../page-components/Container';
import SiteLayout from '../page-components/SiteLayout';

type Props = {
  pageTitle: string;
  pageDescription: string;
  salesContent: string;
  roleImage: React.ReactNode;
  children: React.ReactNode;
};

const OurApproach = ({
  content,
  imageUrl,
  bgUrl = '',
  bgColor = 'none',
}: {
  content: string;
  imageUrl: string;
  bgUrl?: string;
  bgColor?: string;
}) => {
  return (
    <Flex direction='column' alignItems='center' w='100vw' py={20} gap={10} bgImage={bgUrl} bgColor={bgColor}>
      <Flex align='center' justify='space-between' maxWidth='1440px' width='80vw' margin='0 auto' gap='3rem'>
        <Flex direction='row' gap={2} width='100%' alignItems='center'>
          <Box width='100%' hideBelow='xl'>
            <Image src={imageUrl} zIndex={1} fit='contain' minW='360px' maxW='600px' />
          </Box>
          <Card
            as={Flex}
            minW='360px'
            maxW='600px'
            h='max-content'
            border='1px solid'
            borderColor=' primary.500'
            flexDirection='column'
            alignItems='center'
            gap='2rem'
            zIndex='2'
            lineHeight='tall'>
            <HStack gap={6}>
              <Image src={Wand.src} height='48px' />
              <Heading variant='shadow' fontSize='2xl'>
                Our Approach
              </Heading>
            </HStack>
            <Markdown>{content}</Markdown>
            <Flex w='100%' mt={{ base: '2rem' }} justifyContent='center' alignItems='center' gap={2}>
              <Link href='/hire/1'>
                <GradientButton>Hire Us</GradientButton>
              </Link>
              <Link href='/join/1'>
                <GradientBorderButton label='JOIN US' width='120px' />
              </Link>
            </Flex>
          </Card>
        </Flex>
      </Flex>
    </Flex>
  );
};

const ServicePageTemplate = ({ pageTitle, pageDescription, salesContent, roleImage, children, ...props }: Props) => {
  return (
    <SiteLayout bg={tokens.purpleToIndigoGradient}>
      <Box background='blackDark' textColor='white'>
        <Container content={pageDescription} imagePosition='row' title={pageTitle} icon={WallSconce.src} />
      </Box>
      <Box background='blackDark' textColor='white'>
        <Container
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
