import {
  Grid,
  Flex,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  HStack
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { theme } from '../theme';

const StyledButton = styled.button`
  height: '500px';
  display: block;
  font-family: ${theme.font.rubik};
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: ${theme.colors.blackDark};
  background-color: ${theme.colors.red};
  border: none;
  border-radius: 3px;
  padding: 12px;
  &:hover {
    cursor: pointer;
    background-color: ${theme.colors.blackDark};
    color: ${theme.colors.red};
  }
`;

const services = [
  {
    name: 'Learn New Things',
    img: '/assets/learningnewthings.png',
    text:
      'Stay on top of the latest trends and developments while leveling up your skills.'
  },
  {
    name: 'Cartel Culture',
    img: '/assets/cartelculture.png',
    text:
      "We're serious about our work and its impacts on society, but we also know how to have a good time."
  },
  {
    name: 'Tip of the Spear',
    img: '/assets/tipofthespear.png',
    text:
      'Join the ranks on the front lines and make a direct impact on the world around you.'
  }
];

export const Culture = () => {
  return (
    <Flex
      minHeight='95vh'
      direction='column'
      alignItems='center'
      justifyContent='center'
      padding='4rem 4rem 4rem 4rem'
      mt='1rem'
    >
      <VStack spacing={5} justifyContent='center'>
        <Heading
          color={`${theme.colors.red}`}
          fontFamily={`${theme.font.uncial}`}
          fontSize='2.4rem'
        >
          Join the Guild
        </Heading>
        <Text
          color={`${theme.colors.white}`}
          fontFamily={`${theme.font.jetbrains}`}
          fontSize='1.3rem'
          textAlign='justify'
        >
          We believe workers should be self-sovereign and able to work when,
          where and how they want, as long as they create high value output.
          We’re looking for top talent that can take things into their own hands
          and bring unique value to the guild.
        </Text>
        <StyledButton>Join Us</StyledButton>
      </VStack>
      <HStack padding='2rem' mt='2rem'>
        {services.map((service, index) => {
          return (
            <Flex
              key={index}
              direction='column'
              alignItems='center'
              justifyContent='space-evenly'
              background={`${theme.colors.blackLight}`}
              padding='1em'
            >
              <Heading
                fontFamily={`${theme.font.texturina}`}
                color={`${theme.colors.yellow}`}
                size='lg'
                mb='1rem'
              >
                {service.name}
              </Heading>
              <img src={service.img} alt='consultations' />
              <br></br>
              <Text
                color={`${theme.colors.white}`}
                fontFamily={`${theme.font.jetbrains}`}
                textAlign='center'
              >
                {service.text}
              </Text>
            </Flex>
          );
        })}
      </HStack>
    </Flex>
  );
};
