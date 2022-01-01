import React from 'react';
import { Flex, Text, Image } from '@chakra-ui/react';

import { StyledSecondaryButton } from '../../themes/styled';

import { StyledHeadingTwo } from '../../themes/styled';

export const Confirmation = () => {
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

      <StyledHeadingTwo
        fontSize={{ base: '1.5rem', lg: '26px' }}
        mb='2rem'
        textAlign='center'
      >
        The Fires Have Been Lit!
      </StyledHeadingTwo>

      <Text fontFamily='spaceMono' color='white' textAlign='center'>
        Your request has been added to the end of the queue. A member of the
        Guild will be in touch with you once we’ve worked our way down the
        queue. For a faster response, you are welcome to{' '}
        <a className='hiringboard-link' href='/'>
          add a $RAID token bid to your submission
        </a>{' '}
        to move higher up the queue.
      </Text>

      <StyledSecondaryButton
        mt='2rem'
        onClick={() => (window.location.href = 'https://discord.gg/rGFpfQf')}
      >
        Join Discord
      </StyledSecondaryButton>
    </Flex>
  );
};
