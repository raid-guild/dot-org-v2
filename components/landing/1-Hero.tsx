import { Flex, SimpleGrid, Box, Button, Heading } from '@raidguild/design-system';
import Image from 'next/image';
import tokens from '../../utils/extendedTokens';

import Link from '../atoms/ChakraNextLink';
import Nav from '../page-components/Nav';

import raidBanner from '../../assets/illustrations/raid__banner.webp';

const SectionOne = () => (
  <Box bg={tokens.purpleToIndigoGradient}>
    <SimpleGrid
      placeItems='flex-start'
      border='2px solid'
      borderColor='primary.500'
      py='2rem'
      px={{ base: '1rem', lg: '4rem' }}
      m='1rem'
      h='90vh'>
      <Nav />
      <Flex
        direction={{ base: 'column-reverse', lg: 'row' }}
        alignItems='center'
        justifyContent='space-between'
        px={{ base: '1rem', lg: '8rem' }}
        width='full'>
        <Flex direction='column' justifyContent='center' alignItems='start' maxW={{ lg: '50%' }}>
          <Heading maxW='720px'>
            A Decentralized Collective of Mercenaries Ready to Slay Your Web3 Product Demons.
          </Heading>
          <Flex
            w='100%'
            mt={{ base: '2rem' }}
            direction='row'
            justifyContent={{ base: 'center', lg: 'flex-start' }}
            gap={2}>
            <Link href='/hire/1'>
              <Button bgGradient={tokens.orangeToPurpleGradient} borderRadius={2}>
                Hire Us
              </Button>
            </Link>
            <Link href='/join/1'>
              <Button bgGradient={tokens.purpleToBlueGradient} bgClip='text' borderRadius={2}>
                Join Us
              </Button>
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
