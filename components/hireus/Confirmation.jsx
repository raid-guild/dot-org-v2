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
        Your request has been added to the end of the queue. A member of the
        Guild will be in touch with you once we’ve worked our way down the
        queue. For a faster response, you are welcome to{' '}
        <a className='hiringboard-link' href='/'>
          add a $RAID token bid to your submission
        </a>{' '}
        to move higher up the queue.
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
