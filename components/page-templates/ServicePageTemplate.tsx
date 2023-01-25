import {
  Box,
  Image,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Heading,
  Text,
  HStack,
  Button,
  Flex,
  Card,
} from '@raidguild/design-system';

import Nav from '../page-components/Nav';
import Footer from '../page-components/Footer';
import PageTitle from '../page-components/PageTitle';
import Markdown from '../atoms/Markdown';

import Castle from '../../assets/illustrations/castle.svg';
import Clouds from '../../assets/illustrations/clouds.webp';
import WallSconce from '../../assets/illustrations/wallSconce.svg';
import Valhalla from '../../assets/illustrations/valhalla.svg';
import Wand from '../../assets/illustrations/wand.svg';

type Props = {
  pageTitle: string;
  pageDescription: string;
  salesContent: string;
  roleImage: string;
  children: React.ReactNode;
};

const ServicePageTemplate = ({ pageTitle, pageDescription, salesContent, roleImage, children, ...props }: Props) => {
  return (
    <Box layerStyle='redToPurpleVerticalGradient'>
      <Box minHeight='3rem' />
      <Nav />
      <Box minHeight='6rem' />

      <Flex align='center' justify='space-between' maxWidth='1440px' width='80vw' margin='0 auto' gap='3rem'>
        {/* Breadcrumbs & Main Content */}
        <Flex direction='column' gap={2} width='100%'>
          <Breadcrumb color='primary.500'>
            <BreadcrumbItem>
              <BreadcrumbLink href='/services'>Services</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href='path'>{pageTitle}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Card
            as={Flex}
            width='100%'
            minHeight='20px'
            border='1px solid'
            borderColor=' primary.500'
            flexDirection='column'
            alignItems='center'
            padding='4rem'
            gap='2rem'
            zIndex='2'>
            <HStack>
              <Image src={WallSconce.src} height='50px' />
              <Heading>{pageTitle}</Heading>
            </HStack>
            <Markdown>{pageDescription}</Markdown>
          </Card>
          <Image
            src={roleImage}
            height='48px'
            width='48px'
            position='relative'
            left='50%'
            transform='translateX(-50%) translateY(-80%)'
            zIndex='2'
          />
        </Flex>
        {/* Castle Image */}
        <Box width='100%'>
          <Image
            src={Castle.src}
            width='80vw'
            position='absolute'
            transform='translateY(-35%) translateX(-40%)'
            zIndex={1}
          />
        </Box>
      </Flex>
      <Box minHeight='6rem' />
      {/* Our Approach */}
      <Flex
        overflow='hidden'
        backgroundImage={Clouds.src}
        backgroundColor='#0A0303='
        backgroundPosition='center'
        backgroundSize='cover'
        backgroundRepeat='no-repeat'
        width='100vw'
        position='relative'
        direction='column'
        justify='center'
        zIndex='3'>
        <HStack w='80vw' maxWidth='1140px' margin='4rem auto'>
          <Box w='100%'>
            <Image
              src={Valhalla.src}
              width='50vw'
              position='absolute'
              transform='translateY(-50%) translateX(-50%)'
              zIndex='1'
            />
          </Box>
          <Card
            as={Flex}
            width='100%'
            minHeight='20px'
            border='1px solid'
            borderColor='primary.500'
            flexDirection='column'
            alignItems='center'
            padding='4rem'
            gap='2rem'
            zIndex={2}>
            <HStack>
              <Image src={Wand.src} height='50px' />
              <Heading>Our Approach</Heading>
            </HStack>
            <Markdown>{salesContent}</Markdown>
            <Flex gap='20px'>
              <Button>Hire Us</Button>
              <Button variant='outline'>Join Us</Button>
            </Flex>
          </Card>
        </HStack>
      </Flex>
      <Box minHeight='100vh' width='100vw' position='relative' zIndex='4' backgroundColor='black'>
        <PageTitle title='Shipped Products' />
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default ServicePageTemplate;
