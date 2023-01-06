import { Flex, SimpleGrid, Box, Button, Heading } from '@raidguild/design-system';
import Link from 'next/link';
import Image from 'next/image';

import Nav from '../page-components/Nav';

import raidBanner from '../../assets/illustrations/raid__banner.webp';

const SectionOne = () => (
  <Box background='linear-gradient(102.93deg, #2B0000 0%, #3D0610 29.17%, #5A1049 61.98%, #461881 100%)'>
    <SimpleGrid
      // rows='1'
      placeItems='center'
      border='2px solid'
      borderColor='red'
      py='2rem'
      px={{ base: '1rem', lg: '4rem' }}
      mx='1rem'
      my='1rem'>
      <Nav />
      <Flex direction={{ base: 'column-reverse', lg: 'row' }} alignItems='center' justifyContent='space-between'>
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
            <Link href='/hire' passHref>
              <Button>Hire Us</Button>
            </Link>
            <Link href='/join' passHref>
              <Button>Join Us</Button>
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
