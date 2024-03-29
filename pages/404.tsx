import { Box, Button, Flex, Heading } from '@raidguild/design-system';
import Image from 'next/image';
import raidBanner from '../assets/illustrations/raid__banner.webp';
import Link from '../components/atoms/ChakraNextLink';
import Nav from '../components/page-components/Nav';
import layerStyles from '../utils/extendedTokens';
import GradientShiftButton from '../components/atoms/GradientShiftButton';

const NotFound = () => (
  <Flex
    minH='100vh'
    w='100%'
    direction='column'
    alignItems='center'
    justifyContent='flex-start'
    bg={layerStyles.darkBrownRedGradient}>
    <Box px={{ base: '1rem', xl: '4rem' }} m='3rem' w='100%'>
      <Nav />
    </Box>
    <Box width={{ base: '450px', md: '500px', lg: '550px' }}>
      <Image src={raidBanner} placeholder='blur' alt='raid-banner' />
    </Box>
    <Heading color='white' variant='shadow'>
      Page not found
    </Heading>
    <Flex
      w='100%'
      mt={{ base: '2rem' }}
      direction={{ base: 'column', lg: 'row' }}
      justifyContent='center'
      alignItems='center'
      gap={2}>
      <Link href='/hire/1'>
        <Button variant='gradientOutline'>Hire Us</Button>
      </Link>
      <Link href='/join/1'>
        <GradientShiftButton>JOIN US</GradientShiftButton>
      </Link>
    </Flex>
  </Flex>
);

export default NotFound;
