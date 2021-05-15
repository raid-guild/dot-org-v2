import { Flex, Heading, HStack, Text, Button } from '@chakra-ui/react';

import { theme } from '../theme';

export const Portfolio = () => {
  return (
    <Flex
      minHeight='95vh'
      direction='column'
      border={`5px solid ${theme.colors.red}`}
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
        <Heading variant='primary' size='lg'>
          Our Portfolio
        </Heading>
        <Text width='600px' variant='medium' size='md'>
          A Decentralized Collective of Mercenaries Ready to Slay Your Web3
          Product Demons.
        </Text>
        <Button variant='primary'>View Projects</Button>
      </Flex>
    </Flex>
  );
};
