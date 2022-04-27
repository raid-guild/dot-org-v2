import { Flex, Box, Text } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';

import { theme } from '../themes/theme';

import { StyledPrimaryButton, StyledPrimaryHeading } from '../themes/styled';

import raidBanner from '../public/assets/illustrations/raid__banner.webp';

export const Page404 = () => {
  return (
    <Flex
      minH='100vh'
      w='100%'
      direction='column'
      alignItems='center'
      justifyContent='center'
    >
      <Box width={{ base: '450px', md: '500px', lg: '550px' }}>
        <Image src={raidBanner} placeholder='blur' alt='raid-banner' />
      </Box>
      <StyledPrimaryHeading>Page not found</StyledPrimaryHeading>
      <Flex direction={{ lg: 'row', base: 'column' }} mt='2rem'>
        <Link href='/' passHref>
          <StyledPrimaryButton
            mr={{ lg: '1rem', base: '0' }}
            mb={{ lg: '0', base: '1rem' }}
          >
            Back Home
          </StyledPrimaryButton>
        </Link>
        <Link href='/hire' passHref>
          <StyledPrimaryButton>Hire Us</StyledPrimaryButton>
        </Link>
      </Flex>
    </Flex>
  );
};
