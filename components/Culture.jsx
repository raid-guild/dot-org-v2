import {
  Flex,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Button
} from '@chakra-ui/react';
import { theme } from '../themes/theme';

import { culture } from '../utils/constants';

export const Culture = () => {
  return (
    <Flex
      minHeight='100vh'
      direction='column'
      alignItems='center'
      justifyContent='center'
      padding={{ base: '2rem', lg: '2rem 4rem' }}
      margin='2rem 0 2rem 0'
      background={`${theme.colors.blackLight}`}
    >
      <VStack spacing={5} justifyContent='center'>
        <Heading variant='uncial' fontSize={{ base: '1.5rem', lg: '2rem' }}>
          Join the Guild
        </Heading>
        <Text variant='texturina' fontSize={{ base: '1rem', lg: '1.3rem' }}>
          We believe workers should be self-sovereign and able to work when,
          where and how they want, as long as they create high value output.
          We’re looking for top talent that can take things into their own hands
          and bring unique value to the guild.
        </Text>
        <Button variant='spaceMono' fontSize={{ base: '1rem', lg: '1.5rem' }}>
          Join Us
        </Button>
        <br></br>
      </VStack>

      <SimpleGrid columns={[1, 2, 3]} gap={5} padding='2rem'>
        {culture.map((item, index) => {
          return (
            <Flex
              key={index}
              direction='column'
              alignItems='center'
              justifyContent='space-evenly'
              background={`${theme.colors.blackDark}`}
              boxShadow='4px 9px 18px -7px rgba(0,0,0,0.75);'
              padding='1rem'
            >
              <Heading
                variant='texturina'
                fontSize={{ base: '1.2rem' }}
                mb={3}
                textAlign='center'
              >
                {item.name}
              </Heading>
              <img src={item.img} alt='consultations' />
              <br></br>
              <Text
                variant='texturinaSmall'
                fontSize={{ base: '1rem' }}
                px='1rem'
              >
                {item.text}
              </Text>
            </Flex>
          );
        })}
      </SimpleGrid>
    </Flex>
  );
};
