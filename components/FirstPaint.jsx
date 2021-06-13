import { Flex, HStack, Text, Button, Image } from '@chakra-ui/react';

import { Header } from '../shared/Header';

export const FirstPaint = () => {
  return (
    <Flex
      minH='95vh'
      justify='space-between'
      align='center'
      direction='column'
      border='5px solid'
      borderColor='red'
      py='2rem'
      px='4rem'
      mx='1rem'
    >
      <Header />
      <Flex
        w='100%'
        direction={{ base: 'column-reverse', lg: 'row' }}
        alignItems='center'
        justifyContent='space-between'
      >
        <Flex
          direction='column'
          justifyContent='center'
          alignItems='start'
          maxW='50%'
        >
          <Text variant='uncial' fontSize={{ base: '1.2rem', lg: '2.5rem' }}>
            A Decentralized Collective of Mercenaries Ready to Slay Your Web3
            Product Demons.
          </Text>
          <HStack w='100%' mt={{ base: '2rem' }}>
            <Button
              variant='spaceMono'
              style={{ width: '60%' }}
              fontSize={{ base: '1rem', lg: '1.5rem' }}
            >
              Hire Us
            </Button>
            <Button
              variant='spaceMono'
              style={{ width: '40%' }}
              fontSize={{ base: '1rem', lg: '1.5rem' }}
            >
              Join Us
            </Button>
          </HStack>

          {/* <Text
            fontFamily='spaceMono'
            color='white'
            fontSize='1rem'
            mt='2rem'
            py='.5rem'
            px='1rem'
            bg='rgba(53, 50, 50, 0.5)'
            textAlign='center'
          >
            A Moloch DAO initiative with 100 unique raiders
          </Text> */}
        </Flex>
        <Image
          src='/assets/3d.png'
          alt='raid-banner'
          width={{ base: '300px', md: '500px', lg: '500px' }}
        />
      </Flex>
    </Flex>
  );
};
