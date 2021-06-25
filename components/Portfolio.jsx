import {
  Flex,
  Heading,
  Text,
  Container,
  Image,
  Button
} from '@chakra-ui/react';

import Link from 'next/link';

import styled from '@emotion/styled';

const StyledCard = styled(Flex)`
  min-width: 300px;
  flex-direction: column;
  box-shadow: -1rem 0 3rem #000;
  padding: 1.5rem;
  transition: 0.2s;
  background: black;
  margin-bottom: 1rem;
  @media only screen and (min-width: 600px) {
    :not(:first-of-type) {
      margin-left: -130px;
    }
    :hover {
      transform: translateY(-1rem);
      cursor: pointer;
    }
    :hover ~ div {
      transform: translateX(130px);
    }
  }
`;

export const Portfolio = () => {
  return (
    <Container bgImage='url(/assets/clouds.png)' minW='100%' p='0'>
      <Flex
        w='100%'
        direction='column'
        justifyContent='center'
        alignItems='center'
        // style={{ backdropFilter: 'blur(5px)' }}
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

        <Button variant='primary' fontSize={{ base: '1rem', lg: '18px' }}>
          <Link href='/portfolio'>
            <a>View Projects</a>
          </Link>
        </Button>

        <Flex
          w='100%'
          p={{ base: '1rem 0', lg: '3rem' }}
          justifyContent='center'
          mt='3rem'
          direction={{ base: 'column', lg: 'row' }}
        >
          <StyledCard borderLeft='2px solid' borderColor='red'>
            <Image src='/assets/wrap__eth.png' alt='wrapeth' mb='1rem' />
            <Text variant='textTwo' fontSize='16px' maxW='300px'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </StyledCard>
          <StyledCard borderLeft='2px solid' borderColor='red'>
            <Image
              src='/assets/smart__invoice.png'
              alt='smart invoice'
              mb='1rem'
            />
            <Text variant='textTwo' fontSize='16px' maxW='300px'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </StyledCard>
          <StyledCard borderLeft='2px solid' borderColor='red'>
            <Image src='/assets/wrap__eth.png' alt='wrapeth' mb='1rem' />
            <Text variant='textTwo' fontSize='16px' maxW='300px'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </StyledCard>
        </Flex>
      </Flex>
    </Container>
  );
};
