import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Card,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
} from '@raidguild/design-system';

import tokens from '../../utils/extendedTokens';
import GradientButton from '../atoms/GradientButton';
import Markdown from '../atoms/Markdown';
import Footer from '../page-components/Footer';
import Nav from '../page-components/Nav';
import PageTitle from '../page-components/PageTitle';

import Castle from '../../assets/illustrations/castle.svg';
import Clouds from '../../assets/illustrations/clouds.webp';
import Valhalla from '../../assets/illustrations/valhalla.svg';
import WallSconce from '../../assets/illustrations/wallSconce.svg';
import Wand from '../../assets/illustrations/wand.svg';
import GradientBorderButton from '../atoms/GradientBorderButton';

type Props = {
  pageTitle: string;
  pageDescription: string;
  salesContent: string;
  roleImage: React.ReactNode;
  children: React.ReactNode;
};

const OurApproach = ({ salesContent }: { salesContent: string }) => {
  return (
    <Flex direction='column' alignItems='center' w='100%' py={20} gap={10} bgImage={Clouds.src} bgColor='black'>
      <Flex align='center' justify='center' maxWidth='1440px' width='80vw' margin='0 auto' gap='3rem'>
        <Flex direction='row' gap={2} width='100%' alignItems='center'>
          <Box width='100%' hideBelow='xl'>
            <Image src={Valhalla.src} zIndex={1} fit='contain' minW='360px' maxW='600px' />
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
            zIndex='2'>
            <HStack>
              <Image src={WallSconce.src} height='50px' />
              <Heading variant='shadow' fontSize='2xl'>
                Our Approach
              </Heading>
            </HStack>
            <Markdown>{salesContent}</Markdown>
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
    <Flex
      w='100%'
      mx='auto'
      overflowX='hidden'
      flexDirection='column'
      id='Site Layout'
      bg={tokens.purpleToIndigoGradient}>
      <Box py='3rem' px={{ base: '1rem', lg: '5rem' }}>
        <Nav />
      </Box>
      <Flex direction='column' alignItems='center' w='100%' py={10} bgColor='black' bg={tokens.purpleToIndigoGradient}>
        <Flex align='center' justify='center' maxWidth='1440px' width='80vw' margin='0 auto' gap='3rem'>
          <Flex direction='column' gap={2} width='100%'>
            <Breadcrumb color='primary.500' fontFamily='monospace' fontSize='md'>
              <BreadcrumbItem>
                <BreadcrumbLink href='/services'>Services</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href='path'>{pageTitle}</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <Card
              as={Flex}
              minW='360px'
              maxW='600px'
              border='1px solid'
              borderColor=' primary.500'
              flexDirection='column'
              alignItems='center'
              padding='1rem'
              gap='2rem'
              zIndex='2'>
              <HStack>
                <Image src={WallSconce.src} height='50px' />
                <Heading variant='shadow' fontSize='2xl'>
                  {pageTitle}
                </Heading>
              </HStack>
              <Markdown>{pageDescription}</Markdown>
            </Card>
            <Image
              src={roleImage as string}
              style={{
                height: '48px',
                width: '48px',
                position: 'relative',
                left: '50%',
                transform: 'translateX(-50%) translateY(-50%)',
                zIndex: '2',
              }}
            />
          </Flex>
          <Box width='100%'>
            <Image
              src={Castle.src}
              width='full'
              maxH='1000px'
              top={0}
              right={0}
              position='absolute'
              zIndex={1}
              hideBelow='md'
            />
          </Box>
          <Box minHeight='6rem' />
        </Flex>

        {/* Our Approach */}
        <OurApproach salesContent={salesContent} />
        <Box minHeight='100vh' width='100vw' position='relative' backgroundColor='black'>
          <PageTitle title='Shipped Products' />
          {children}
        </Box>
        <Footer />
      </Flex>
    </Flex>
  );
};

export default ServicePageTemplate;
