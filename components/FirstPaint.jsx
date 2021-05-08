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
      border={`2px solid ${theme.colors.red}`}
      bgImage='url(/assets/raid__cloud__castle.png)'
      bgSize='cover'
    >
      <Header />
      <Flex
        maxWidth='45%'
        direction='column'
        justifyContent='center'
        alignItems='start'
        mt='auto'
        mb='auto'
        mr='auto'
        ml='3rem'
        style={{ backdropFilter: 'blur(.5rem)' }}
      >
        <Text
          width='600px'
          fontFamily={`${theme.font.uncial}`}
          color={`${theme.colors.white}`}
          fontSize='2.2rem'
          lineHeight='3rem'
          mb='2rem'
          textAlign='justify'
        >
          A Decentralized Collective of Mercenaries Ready to Slay Your Web3
          Product Demons.
        </Text>
        <HStack width='100%'>
          <StyledButton style={{ width: '60%' }}>Hire Us</StyledButton>
          <StyledButton style={{ width: '40%' }}>Join Us</StyledButton>
        </HStack>
      </Flex>
    </Flex>
  );
};
