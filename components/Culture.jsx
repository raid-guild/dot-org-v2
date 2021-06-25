import {
  Flex,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Button,
  Container
} from '@chakra-ui/react';

import { culture } from '../utils/constants';

export const Culture = () => {
  return (
    <Container minW='100%' bg='blackLighter'>
      <Flex
        minHeight='100vh'
        direction='column'
        alignItems='center'
        justifyContent='center'
        px={{ base: '2rem', lg: '8rem' }}
        py='6rem'
        bgImage='url(/assets/layered-waves-red.svg)'
        bgSize='cover'
      >
        <VStack spacing={5} justifyContent='center'>
          <Heading
            variant='headingTwo'
            fontSize={{ base: '1.5rem', lg: '36px' }}
            mb='1rem'
          >
            Join the Guild
          </Heading>
          <Text
            variant='textOne'
            fontSize={{ base: '1rem', lg: '18px' }}
            textAlign='justify'
          >
            We believe workers should be self-sovereign and able to work when,
            where and how they want, as long as they create high value output.
            We’re looking for top talent that can take things into their own
            hands and bring unique value to the guild.
          </Text>
          <br />
          <Button variant='primary' fontSize={{ base: '1rem', lg: '18px' }}>
            Join Us
          </Button>
        </VStack>

        <SimpleGrid columns={[1, 2, 3]} gap={5} mt='6rem'>
          {culture.map((item, index) => {
            return (
              <Flex
                maxWidth='350px'
                key={index}
                direction='column'
                alignItems='center'
                justifyContent='space-evenly'
                py='2rem'
                px='1.5rem'
                bg='black'
                borderTop='2px solid'
                borderColor='red'
              >
                <Heading
                  variant='labels'
                  fontSize={{ base: '16px' }}
                  mb={5}
                  textAlign='center'
                >
                  {item.name}
                </Heading>
                <img src={item.img} alt='consultations' />

                <br></br>

                <Text
                  variant='textTwo'
                  fontSize={{ base: '16px' }}
                  textAlign='justify'
                  px='1rem'
                  mt='auto'
                >
                  {item.text}
                </Text>
              </Flex>
            );
          })}
        </SimpleGrid>
      </Flex>
    </Container>
  );
};
