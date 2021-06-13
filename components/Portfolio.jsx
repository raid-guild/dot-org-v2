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
  :not(:first-child) {
    margin-left: -130px;
  }
  :hover {
    transform: translateY(-1rem);
    cursor: pointer;
  }
  :hover ~ div {
    transform: translateX(130px);
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
        style={{ backdropFilter: 'blur(5px)' }}
        px='8rem'
        pt='4rem'
        pb='6rem'
      >
        <Heading
          variant='uncial'
          fontSize={{ base: '1.5rem', lg: '2rem' }}
          color='blackDark'
          mb='1rem'
        >
          Our Portfolio
        </Heading>
        <Text
          variant='texturina'
          fontSize={{ base: '1rem', lg: '1.4rem' }}
          mb='2rem'
          color='blackLighter'
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>

        <Button
          variant='spaceMono'
          fontFamily='spaceMono'
          bgColor='black'
          color='purpleLight'
          fontSize={{ base: '1rem', lg: '1.5rem' }}
          _hover={{ backgroundColor: 'blackLight' }}
        >
          <Link href='/portfolio'>
            <a>View Projects</a>
          </Link>
        </Button>

        <Flex w='100%' p='3rem' justifyContent='center' mt='3rem'>
          <StyledCard bgColor='blackLighter'>
            <Image src='/assets/wrap__eth.png' alt='wrapeth' mb='1rem' />
            <Text
              variant='jetbrains'
              color='greyLight'
              fontSize='1rem'
              maxW='300px'
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </StyledCard>
          <StyledCard bgColor='blackLighter'>
            <Image
              src='/assets/smart__invoice.png'
              alt='smart invoice'
              mb='1rem'
            />
            <Text
              variant='jetbrains'
              color='greyLight'
              fontSize='1rem'
              maxW='300px'
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </StyledCard>
          <StyledCard bgColor='blackLighter'>
            <Image src='/assets/wrap__eth.png' alt='wrapeth' mb='1rem' />
            <Text
              variant='jetbrains'
              color='greyLight'
              fontSize='1rem'
              maxW='300px'
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </StyledCard>
        </Flex>
      </Flex>
    </Container>
  );
};
