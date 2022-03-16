import { Flex, VStack, SimpleGrid, Image } from '@chakra-ui/react';
import Link from 'next/link';

import {
  StyledPrimaryButton,
  StyledPrimaryHeading,
  StyledHeadingLabels,
  StyledBodyText,
  StyledCardText
} from '../../themes/styled';

import { culture } from '../../utils/constants';

export const Culture = () => {
  return (
    <Flex
      id='culture'
      minHeight='100vh'
      direction='column'
      alignItems='center'
      justifyContent='center'
      bg='linear-gradient(157.1deg, #22002b 0%, #390418 29.17%, #48093A 61.98%, #1F0442 100%)'
      px={{ base: '2rem', lg: '8rem' }}
      py='6rem'
    >
      <VStack spacing={5} justifyContent='center'>
        <StyledPrimaryHeading
          fontSize={{ base: '1.5rem', lg: '36px' }}
          mb='1rem'
        >
          Join the Guild
        </StyledPrimaryHeading>
        <StyledBodyText fontSize={{ base: '1rem', lg: '18px' }}>
          We believe workers should be self-sovereign and able to work when,
          where and how they want, as long as they create high value output.
          We’re looking for top talent that can take things into their own hands
          and bring unique value to the guild.
        </StyledBodyText>
        <br />
        <Link href='/join' passHref>
          <StyledPrimaryButton fontSize={{ base: '16px', lg: '18px' }}>
            Join Us
          </StyledPrimaryButton>
        </Link>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} gap={5} mt='6rem'>
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
              <StyledHeadingLabels fontSize={{ base: '16px' }} mb={3}>
                {item.name}
              </StyledHeadingLabels>
              <Image src={item.img} alt='culture' my='.5rem' />

              <StyledCardText fontSize={{ base: '16px' }}>
                {item.text}
              </StyledCardText>
            </Flex>
          );
        })}
      </SimpleGrid>
    </Flex>
  );
};
