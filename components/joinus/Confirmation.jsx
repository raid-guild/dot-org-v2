import React from 'react';
import { Flex, Image } from '@chakra-ui/react';

import {
  StyledSecondaryButton,
  StyledSecondaryHeading,
  StyledBodyText
} from '../../themes/styled';

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

      <StyledSecondaryHeading
        fontSize={{ base: '20px', lg: '26px' }}
        mb='2rem'
        textAlign='center'
      >
        The Fires Have Been Lit!
      </StyledSecondaryHeading>

      <StyledBodyText>
        Your submission has been received. An invitation will be sent to your
        email address prior to the commencement of next season. We wish you
        luck! Stay Curious!
      </StyledBodyText>

      <StyledSecondaryButton
        mt='2rem'
        onClick={() => (window.location.href = 'https://discord.gg/rGFpfQf')}
      >
        Join Discord
      </StyledSecondaryButton>
    </Flex>
  );
};
