import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import Image from 'next/image';

import {
  StyledSecondaryButton,
  StyledSecondaryHeading,
  StyledBodyText
} from '../../themes/styled';

import signalFire from '../../public/assets/illustrations/signal_fire.webp';

export const Confirmation = () => {
  return (
    <Flex
      w='100%'
      direction='column'
      alignItems='center'
      px={{ base: '2rem', lg: '5rem' }}
      py='5rem'
    >
      <Box mb='2rem' w='250px'>
        <Image src={signalFire} placeholder='blur' alt='signal fire' />
      </Box>
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
