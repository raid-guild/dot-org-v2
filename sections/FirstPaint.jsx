import { Flex, HStack, Text, Button } from '@chakra-ui/react';

import { Header } from '../shared/Header';

export const FirstPaint = () => {
  return (
    <Flex height='95vh' direction='column' border='5px solid' borderColor='red'>
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
          <Text variant='large' size='lg'>
            A Decentralized Collective of Mercenaries Ready to Slay Your Web3
            Product Demons.
          </Text>
          <HStack width='100%'>
            <Button variant='primary' style={{ width: '60%' }}>
              Hire Us
            </Button>
            <Button variant='primary' style={{ width: '40%' }}>
              Join Us
            </Button>
          </HStack>
        </Flex>
        <img src='/assets/raid__banner.png' alt='raid-banner' width='600px' />
      </Flex>
    </Flex>
  );
};
