import React, { useContext } from 'react';
import { Flex, Heading, Button, Text, Image } from '@chakra-ui/react';

import { AppContext } from '../../context/AppContext';

export const Confirmation = () => {
  const context = useContext(AppContext);

  return (
    <Flex
      w='100%'
      direction='column'
      alignItems='center'
      px={{ base: '2rem', lg: '5rem' }}
      py='5rem'
    >
      <Image
        src='/assets/signal_fire.svg'
        w='250px'
        alt='signal fire'
        mb='2rem'
      />

      <Heading
        variant='headingThree'
        fontSize={{ base: '1.5rem', lg: '26px' }}
        mb='2rem'
        textAlign='center'
      >
        The Fires Have Been Lit!
      </Heading>

      <Text fontFamily='spaceMono' color='white' textAlign='center'>
        Your submission has been received. An invitation will be sent to your
        email address prior to the commencement of next season. We wish you
        luck! Stay Curious!
      </Text>

      <Button
        variant='secondary'
        mt='2rem'
        onClick={() => (window.location.href = 'https://discord.gg/rGFpfQf')}
      >
        Join Discord
      </Button>
    </Flex>
  );
};
