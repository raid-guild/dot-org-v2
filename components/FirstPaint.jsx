import { Flex, HStack, Heading, Button, Image } from '@chakra-ui/react';

import { Header } from '../shared/Header';

export const FirstPaint = ({ windowWidth }) => {
  return (
    <Flex
      minH='95vh'
      justify={{ base: 'space-evenly', lg: 'space-between' }}
      align='center'
      direction='column'
      border='2px solid'
      borderColor='red'
      py={{ lg: '2rem' }}
      px={{ base: '1rem', lg: '4rem' }}
      mx='1rem'
    >
      <Header windowWidth={windowWidth} />
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
          maxW={{ lg: '50%' }}
        >
          <Heading
            variant='headingOne'
            lineHeight='1.5'
            fontSize={{ lg: '36px' }}
            textShadow='0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.20em red'
          >
            A Decentralized Collective of Mercenaries Ready to Slay Your Web3
            Product Demons.
          </Heading>
          <HStack
            w='100%'
            mt={{ base: '2rem' }}
            justifyContent={{ base: 'center', lg: 'flex-start' }}
          >
            <Button variant='primary' fontSize='18px' mr='1rem'>
              Hire Us
            </Button>
            <Button variant='secondary' fontSize='18px'>
              Join Us
            </Button>
          </HStack>
        </Flex>
        <Image
          src='/assets/raid__banner.png'
          alt='raid-banner'
          width={{ base: '300px', md: '500px', lg: '550px' }}
        />
      </Flex>
    </Flex>
  );
};
