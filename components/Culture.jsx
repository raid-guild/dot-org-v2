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
        padding={{ base: '2rem', lg: '2rem 4rem' }}
        bgImage='url(/assets/layered-waves.svg)'
        bgSize='cover'
      >
        <VStack spacing={5} justifyContent='center' mb='2rem' my='5rem'>
          <Heading variant='uncial' fontSize={{ base: '1.5rem', lg: '2rem' }}>
            Join the Guild
          </Heading>
          <Text
            variant='texturina'
            fontSize={{ base: '1rem', lg: '1.4rem' }}
            maxW='80%'
            textAlign='justify'
            lineHeight='1.8'
          >
            We believe workers should be self-sovereign and able to work when,
            where and how they want, as long as they create high value output.
            We’re looking for top talent that can take things into their own
            hands and bring unique value to the guild.
          </Text>
          <Button variant='spaceMono' fontSize={{ base: '1rem', lg: '1.5rem' }}>
            Join Us
          </Button>
        </VStack>

        <SimpleGrid columns={[1, 2, 3]} gap={5} maxW='80%' my='2rem'>
          {culture.map((item, index) => {
            return (
              <Flex
                maxWidth='400px'
                key={index}
                direction='column'
                alignItems='center'
                justifyContent='space-evenly'
                py='2rem'
                px='1.5rem'
                bg='blackLighter'
                borderTop='2px solid'
                borderColor='purple'
              >
                <Heading
                  variant='texturina'
                  fontSize={{ base: '1.4rem' }}
                  mb={5}
                  textAlign='center'
                >
                  {item.name}
                </Heading>
                <img src={item.img} alt='consultations' />

                <br></br>

                <Text
                  variant='texturinaSmall'
                  fontSize={{ base: '1.2rem' }}
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
