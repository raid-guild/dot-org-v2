import { Flex, Heading, HStack, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { theme } from '../theme';

export const Portfolio = () => {
  return (
    <Flex
      height='95vh'
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
        >
          A Decentralized Collective of Mercenaries Ready to Slay Your Web3
          Product Demons.
        </Text>
      </Flex>
    </Flex>
  );
};
