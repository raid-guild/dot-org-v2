import { Box, Flex, Heading, SimpleGrid } from '@raidguild/design-system';
import Image from 'next/image';
import tokens from '../../utils/extendedTokens';
import GradientBorderButton from '../atoms/GradientBorderButton';
import GradientButton from '../atoms/GradientButton';

import Link from '../atoms/ChakraNextLink';
import Nav from '../page-components/Nav';

import raidBanner from '../../assets/illustrations/raid__banner.webp';

const SectionOne = () => (
  <Box bg={tokens.purpleToIndigoGradient} w='full'>
    <SimpleGrid
      placeItems='flex-start'
      border='2px solid'
      borderColor='primary.500'
      py='2rem'
      px={{ base: '1rem', lg: '4rem' }}
      m='1rem'
      minH='90vh'
      maxH='max-content'>
      <Nav />
      <Flex
        direction={{ base: 'column-reverse', xl: 'row' }}
        alignItems='center'
        justifyContent='space-between'
        px={{ base: '1rem', xl: '8rem' }}
        width='full'>
        <Flex direction='column' justifyContent='center' alignItems='start' maxW={{ lg: '50%' }}>
          <Heading
            maxW='720px'
            fontSize={{ base: 'medium', md: '3xl', xl: '4xl' }}
            textAlign={{ base: 'center', xl: 'left' }}
            variant='shadow'
            color='white'>
            A Decentralized Collective of Mercenaries Ready to Slay Your Web3 Product Demons.
          </Heading>
          <Flex
            w='100%'
            mt={{ base: '2rem' }}
            direction={{ base: 'column', lg: 'row' }}
            justifyContent={{ base: 'center', xl: 'flex-start' }}
            alignItems={{ base: 'center', xl: 'flex-start' }}
            gap={2}>
            <Link href='/hire/1'>
              <GradientButton>Hire Us</GradientButton>
            </Link>
            <Link href='/join/1'>
              {/* <Box bgGradient={tokens.purpleToBlueGradient} p={1} borderRadius={2} fill='transparent'> */}
              <GradientBorderButton label='JOIN US' width='120px' />
              {/* </Box> */}
            </Link>
          </Flex>
        </Flex>
        <Box width={{ md: '500px', lg: '550px' }}>
          <Image src={raidBanner} placeholder='blur' alt='raid-banner' />
        </Box>
      </Flex>
    </SimpleGrid>
  </Box>
);

export default SectionOne;
