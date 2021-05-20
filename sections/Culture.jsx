import {
  Grid,
  Flex,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  HStack,
  Button
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { theme } from '../themes/theme';

const services = [
  {
    name: 'Learn New Things',
    img: '/assets/learningnewthings.png',
    text: 'Stay on top of the latest trends and developments while leveling up your skills.'
  },
  {
    name: 'Cartel Culture',
    img: '/assets/cartelculture.png',
    text: "We're serious about our work and its impacts on society, but we also know how to have a good time."
  },
  {
    name: 'Tip of the Spear',
    img: '/assets/tipofthespear.png',
    text: 'Join the ranks on the front lines and make a direct impact on the world around you.'
  }
];

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
        <Heading variant='primary' fontSize={{ base: '1.5rem', lg: '2rem' }}>
          Join the Guild
        </Heading>
        <Text variant='medium' fontSize={{ base: '1rem', lg: '1.5rem' }}>
          We believe workers should be self-sovereign and able to work when,
          where and how they want, as long as they create high value output.
          We’re looking for top talent that can take things into their own hands
          and bring unique value to the guild.
        </Text>
        <Button variant='primary' fontSize={{ base: '1rem', lg: '1.5rem' }}>
          Join Us
        </Button>
        <br></br>
      </VStack>

      <SimpleGrid columns={[1, 2, 3]} gap={5} padding='2rem'>
        {services.map((service, index) => {
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
                variant='secondary'
                fontSize={{ base: '1.2rem' }}
                mb={3}
                textAlign='center'
              >
                {service.name}
              </Heading>
              <img src={service.img} alt='consultations' />
              <br></br>
              <Text variant='small' fontSize={{ base: '1rem' }}>
                {service.text}
              </Text>
            </Flex>
          );
        })}
      </SimpleGrid>
    </Flex>
  );
};
