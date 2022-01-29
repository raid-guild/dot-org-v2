import {
  Flex,
  Heading,
  Text,
  Container,
  Image,
  Button,
  Box,
  HStack,
  Link
} from '@chakra-ui/react';

import styled from '@emotion/styled';

import { theme } from '../../themes/theme';

// const StyledCard = styled(Flex)`
//   min-width: 300px;
//   flex-direction: column;
//   box-shadow: -1rem 0 3rem #000;
//   padding: 1.5rem;
//   transition: 0.2s;
//   background: black;
//   margin-bottom: 1rem;
//   @media only screen and (min-width: 600px) {
//     :not(:first-of-type) {
//       margin-left: -130px;
//     }
//     :hover {
//       transform: translateY(-1rem);
//       cursor: pointer;
//     }
//     :hover ~ div {
//       transform: translateX(130px);
//     }
//   }
// `;

const StyledFlex = styled(Flex)`
  background-color: black;
  padding: 24px;
  border-radius: 3px;
  margin-left: 1rem;
  margin-right: 1rem;
  max-width: 450px;
  flex-direction: column;
  justify-content: center;
`;

export const Portfolio = () => {
  return (
    <Container
      id='portfolio'
      // bgImage={`url(${theme.images.clouds})`}
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
        <Heading
          variant='headingTwo'
          fontSize={{ base: '1.5rem', lg: '36px' }}
          mb='1rem'
        >
          Our Portfolio
        </Heading>
        <Text
          variant='textOne'
          fontSize={{ base: '1rem', lg: '18px' }}
          mb='2rem'
        >
          No demon is too large or smol for Raid Guild. We've launched
          everything from DeFi dashboards, dApps, and tokens to new DAOs and
          public good projects. Check out our gallery of trophies from the 50+
          raids we've completed.
        </Text>

        <Button
          variant='primary'
          fontSize={{ base: '16px', lg: '18px' }}
          onClick={() =>
            window.open('https://portfolio.raidguild.org', '_blank')
          }
        >
          <a>View Projects</a>
        </Button>

        <Flex
          w='100%'
          alignItems='center'
          justifyContent='center'
          mt='5rem'
          direction={{ base: 'column', lg: 'row' }}
        >
          <StyledFlex minH='250px'>
            <HStack mb='2rem' justifyContent='space-between'>
              <Image
                src={theme.images.wrapeth}
                alt='wrapeth'
                w='250px'
                maxW='70%'
                onClick={() => window.open('https://wrapeth.com/', '_blank')}
                cursor='pointer'
              />
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
            <Text variant='textTwo' fontSize='16px'>
              Easily wrap ETH or xDAI for trading with any ERC-20 token. No
              fees, no frills.
            </Text>
          </StyledFlex>
          <br />
          <StyledFlex minH='250px'>
            <HStack mb='2rem' justifyContent='space-between'>
              <Image
                src={theme.images.smartinvoice}
                alt='smart invoice'
                w='250px'
                maxW='70%'
                cursor='pointer'
                onClick={() =>
                  window.open('https://smartinvoice.xyz/', '_blank')
                }
              />
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
            <Text variant='textTwo' fontSize='16px'>
              Part of the future of payment, Smart Invoice builds trust between
              payer and payee by creating a secure neutral channel for
              transferring money.
            </Text>
          </StyledFlex>
        </Flex>
      </Flex>
    </Container>
  );
};
