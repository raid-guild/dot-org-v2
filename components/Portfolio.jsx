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

import { theme } from '../themes/theme';

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

const StyledBox = styled(Box)`
  background-color: black;
  padding: 24px;
  border-radius: 3px;
`;

export const Portfolio = () => {
  return (
    <Container bgImage='url(/assets/clouds.png)' minW='100%' p='0'>
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>

        <Button variant='primary' fontSize={{ base: '16px', lg: '18px' }}>
          <Link href='/portfolio'>
            <a>View Projects</a>
          </Link>
        </Button>

        <Flex
          w='100%'
          alignItems='center'
          justifyContent='space-between'
          mt='5rem'
          direction={{ base: 'column', lg: 'row' }}
        >
          <StyledBox mx='1rem'>
            <HStack mb='2rem' justifyContent='space-between'>
              <Image
                src='/assets/wrap__eth.png'
                alt='wrapeth'
                w='250px'
                maxW='70%'
              />
              <Link color='red' fontSize='26px'>
                <i className='fas fa-binoculars'></i>
              </Link>
            </HStack>
            <Text variant='textTwo' fontSize='16px'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </StyledBox>
          <br />
          <StyledBox mx='1rem'>
            <HStack mb='2rem' justifyContent='space-between'>
              <Image
                src='/assets/smart__invoice.png'
                alt='smart invoice'
                w='250px'
                maxW='70%'
              />
              <Link color='red' fontSize='26px'>
                <i className='fas fa-binoculars'></i>
              </Link>
            </HStack>
            <Text variant='textTwo' fontSize='16px'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </StyledBox>
        </Flex>
      </Flex>
    </Container>
  );
};
