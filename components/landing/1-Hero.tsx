import { Box, Flex, Heading, SimpleGrid, Stack, Link } from '@raidguild/design-system';
import Image from 'next/image';
import tokens from '../../utils/extendedTokens';
import GradientShiftButton from '../atoms/GradientShiftButton';
import Nav from '../page-components/Nav';

import raidBanner from '../../assets/illustrations/raid__banner.webp';

const SectionOne = () => (
  <Box bg={tokens.purpleToIndigoGradient} w='full'>
    <SimpleGrid
      placeItems='flex-start'
      border='2px solid'
      borderColor='primary.500'
      px={{ base: '1rem', lg: '3rem' }}
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
        <Stack maxW={{ lg: '50%' }} alignItems={{ base: 'center', xl: 'flex-start' }} pb={3}>
          <Heading
            maxW='720px'
            fontSize={{ base: 'medium', md: '3xl', xl: '4xl' }}
            textAlign={{ base: 'center', xl: 'left' }}
            variant='shadow'
            color='white'
            whiteSpace='balance'>
            A Decentralized Collective of Mercenaries Ready to Slay Your Web3 Product Demons.
          </Heading>
          <Flex py={8}>
            <Link href='/hire/1'>
              <GradientShiftButton w='200px'>Hire Us</GradientShiftButton>
            </Link>
          </Flex>
        </Stack>
        <Box width={{ md: '500px', lg: '550px' }}>
          <Image src={raidBanner} placeholder='blur' alt='raid-banner' />
        </Box>
      </Flex>
    </SimpleGrid>
  </Box>
);

export default SectionOne;
