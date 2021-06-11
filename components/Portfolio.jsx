import { Flex, Heading, Text, Button, Container } from '@chakra-ui/react';
import Link from 'next/link';

export const Portfolio = () => {
  return (
    <Container bgImage='url(/assets/clouds.png)' minW='100%'>
      <Flex
        minHeight='95vh'
        direction='column'
        justifyContent='center'
        alignItems='center'
        bg='rgba(0,0,0, 0.5)'
      >
        <Heading
          variant='uncial'
          fontSize={{ base: '1.5rem', lg: '2rem' }}
          mb='1rem'
        >
          Our Portfolio
        </Heading>
        <Text
          variant='texturina'
          fontSize={{ base: '1rem', lg: '1.3rem' }}
          mb='1rem'
        >
          Checkout some of our products built for the community
        </Text>
        <Button variant='spaceMono' fontSize={{ base: '1rem', lg: '1.5rem' }}>
          <Link href='/portfolio'>
            <a>View Projects</a>
          </Link>
        </Button>
      </Flex>
    </Container>
  );
};
