import { Flex, HStack, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { theme } from '../theme';

import { Header } from '../shared/Header';

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

export const FirstPaint = () => {
  return (
    <Flex
      height='95vh'
      direction='column'
      border={`5px solid ${theme.colors.red}`}
      // bgImage='url(/assets/raid__cloud__castle.png)'
      bgSize='cover'
    >
      <Header />
      <Flex
        direction='row'
        width='100%'
        alignItems='center'
        justifyContent='space-evenly'
      >
        <Flex
          maxWidth='45%'
          direction='column'
          justifyContent='center'
          alignItems='start'
        >
          <Text
            width='600px'
            fontFamily={`${theme.font.uncial}`}
            color={`${theme.colors.red}`}
            fontSize='2.2rem'
            lineHeight='3rem'
            mb='2rem'
            textAlign='justify'
            // backgroundImage='linear-gradient(41deg, rgba(255,56,100,1) 0%, rgba(130,46,166,1) 100%)'
            // backgroundSize='100%'
            // backgroundClip='text'
          >
            A Decentralized Collective of Mercenaries Ready to Slay Your Web3
            Product Demons.
          </Text>
          <HStack width='100%'>
            <StyledButton style={{ width: '60%' }}>Hire Us</StyledButton>
            <StyledButton style={{ width: '40%' }}>Join Us</StyledButton>
          </HStack>
        </Flex>
        <img src='/assets/raid__banner.png' alt='raid-banner' width='600px' />
      </Flex>
    </Flex>
  );
};
