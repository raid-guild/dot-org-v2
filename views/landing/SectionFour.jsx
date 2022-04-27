import { Flex, Container, HStack, Link, Box } from '@chakra-ui/react';
import Image from 'next/image';

import {
  StyledPrimaryButton,
  StyledPrimaryHeading,
  StyledBodyText,
  StyledCardText,
  StyledFlex
} from '../../themes/styled';

import wrapeth from '../../public/assets/logos/wrapeth.webp';
import smartinvoice from '../../public/assets/logos/smartinvoice.webp';

export const SectionFour = () => {
  return (
    <Container
      id='portfolio'
      bgImage='url(/assets/illustrations/clouds.webp)'
      minW='100%'
      p='0'
    >
      <Flex
        w='100%'
        direction='column'
        justifyContent='center'
        alignItems='center'
        px={{ base: '2rem', lg: '8rem' }}
        pt='4rem'
        pb='6rem'
      >
        <StyledPrimaryHeading
          fontSize={{ base: '1.5rem', lg: '36px' }}
          mb='1rem'
        >
          Our Portfolio
        </StyledPrimaryHeading>
        <StyledBodyText fontSize={{ base: '1rem', lg: '18px' }}>
          No demon is too large or smol for Raid Guild. We've launched
          everything from DeFi dashboards, dApps, and tokens to new DAOs and
          public good projects. Check out our gallery of trophies from the 50+
          raids we've completed.
        </StyledBodyText>

        <StyledPrimaryButton
          fontSize={{ base: '16px', lg: '18px' }}
          mt='2rem'
          onClick={() =>
            window.open('https://portfolio.raidguild.org', '_blank')
          }
        >
          <a>View Projects</a>
        </StyledPrimaryButton>

        <Flex
          w='100%'
          alignItems='center'
          justifyContent='center'
          mt='5rem'
          direction={{ base: 'column', lg: 'row' }}
        >
          <StyledFlex minH='250px'>
            <HStack mb='2rem' justifyContent='space-between'>
              <Box
                w='250px'
                maxW='70%'
                onClick={() => window.open('https://wrapeth.com/', '_blank')}
                cursor='pointer'
              >
                <Image src={wrapeth} alt='wrapeth' placeholder='blur' />
              </Box>
              <Link
                color='red'
                fontSize='26px'
                href='https://wrapeth.com/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fas fa-binoculars'></i>
              </Link>
            </HStack>
            <StyledBodyText fontSize='16px'>
              Easily wrap ETH or xDAI for trading with any ERC-20 token. No
              fees, no frills.
            </StyledBodyText>
          </StyledFlex>
          <br />
          <StyledFlex minH='250px'>
            <HStack mb='2rem' justifyContent='space-between'>
              <Box
                w='250px'
                maxW='70%'
                cursor='pointer'
                onClick={() =>
                  window.open('https://smartinvoice.xyz/', '_blank')
                }
              >
                <Image
                  src={smartinvoice}
                  alt='smart invoice'
                  placeholder='blur'
                />
              </Box>
              <Link
                color='red'
                fontSize='26px'
                href='https://smartinvoice.xyz/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fas fa-binoculars'></i>
              </Link>
            </HStack>
            <StyledCardText fontSize='16px'>
              Part of the future of payment, Smart Invoice builds trust between
              payer and payee by creating a secure neutral channel for
              transferring money.
            </StyledCardText>
          </StyledFlex>
        </Flex>
      </Flex>
    </Container>
  );
};
