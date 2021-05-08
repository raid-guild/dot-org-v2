import { Flex, Heading, HStack, Text } from '@chakra-ui/react';
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

export const Portfolio = () => {
  return (
    <Flex
      minHeight='95vh'
      direction='column'
      border={`2px solid ${theme.colors.purple}`}
      bgImage='url(/assets/raid__valhalla.png)'
      bgSize='cover'
      mt='2rem'
    >
      <Flex
        maxWidth='45%'
        direction='column'
        justifyContent='center'
        alignItems='start'
        mt='auto'
        mb='auto'
        mr='3rem'
        ml='auto'
        style={{ backdropFilter: 'blur(.5rem)' }}
      >
        <Heading
          fontFamily={`${theme.font.uncial}`}
          color={`${theme.colors.red}`}
          mb='2rem'
        >
          Our Portfolio
        </Heading>
        <Text
          width='600px'
          fontFamily={`${theme.font.jetbrains}`}
          color={`${theme.colors.white}`}
          fontSize='1.3rem'
          textAlign='justify'
          mb='1rem'
        >
          A Decentralized Collective of Mercenaries Ready to Slay Your Web3
          Product Demons.
        </Text>
        <StyledButton>View</StyledButton>
      </Flex>
    </Flex>
  );
};
