import React from 'react';
import { Flex, Text, Image } from '@chakra-ui/react';

import { StyledSecondaryButton, StyledHeadingTwo } from '../../themes/styled';

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
        Your submission has been received. An invitation will be sent to your
        email address prior to the commencement of next season. We wish you
        luck! Stay Curious!
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
