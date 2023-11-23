import { Box, Flex, Heading } from '@raidguild/design-system';
import Image from 'next/image';
import tokens from '../utils/extendedTokens';
import Link from '../components/atoms/ChakraNextLink';
import Nav from '../components/page-components/Nav';
import raidBanner from '../assets/illustrations/raid__banner.webp';
import GradientBorderButton from '../components/atoms/GradientBorderButton';
import GradientButton from '../components/atoms/GradientButton';

const NotFound = () => (
  <Flex
    minH='100vh'
    w='100%'
    direction='column'
    alignItems='center'
    justifyContent='flex-start'
    bg={tokens.darkBrownRedGradient}>
    <Box px={{ base: '1rem', lg: '4rem' }} m='3rem' w='100%'>
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
        <GradientButton>Hire Us</GradientButton>
      </Link>
      <Link href='/join/1'>
        {/* <Box bgGradient={tokens.purpleToBlueGradient} p={1} borderRadius={2} fill='transparent'> */}
        <GradientBorderButton label='JOIN US'  />
        {/* </Box> */}
      </Link>
    </Flex>
  </Flex>
);

export default NotFound;
