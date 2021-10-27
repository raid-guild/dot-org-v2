import React, { useContext } from 'react';
import { Flex, Heading, Text, Button } from '@chakra-ui/react';

import { AppContext } from '../../context/AppContext';

export const Intro = () => {
  const context = useContext(AppContext);
  return (
    <Flex direction='column' py='5rem'>
      <Heading
        variant='headingTwo'
        fontSize={{ base: '1.5rem', lg: '36px' }}
        mb='1rem'
      >
        Apply to Join RaidGuild
      </Heading>

      <Text variant='textOne' fontSize={{ base: '1rem', lg: '18px' }}>
        Humans wanted for hazardous journey into the ether. Smol wages to start,
        but a lifetime of rewards. Bitter cold winters to build, glorious
        summers to reap. Long months of navigating the dark forest. Constant
        danger lurking in the mempool. Safe return to normalcy doubtful. Great
        honor and recognition in case of success.
      </Text>
      <br />
      <Text variant='textOne' fontSize={{ base: '1rem', lg: '18px' }}>
        Your path is marked by this first command - fill this form to apply to
        RaidGuild firsthand. Pledges are studied by our counsel forth. Last, not
        least, we'll invite you to join a training cohort in due course.
      </Text>
      <br />
      <Button
        variant='primary'
        fontSize={{ base: '16px', lg: '18px' }}
        onClick={() => {
          context.updateStage('next');
        }}
      >
        Start
      </Button>
    </Flex>
  );
};
