import React, { useContext } from 'react';
import { Flex, Heading, Text, Button } from '@chakra-ui/react';

import { AppContext } from '../../context/AppContext';

export const Intro = () => {
  const context = useContext(AppContext);
  return (
    <>
      <Flex
        direction='column'
        py='2rem'
        px={{ base: '1rem', lg: '4rem' }}
        mx='1rem'
      >
        <Heading
          variant='headingTwo'
          fontSize={{ base: '1.5rem', lg: '36px' }}
          mb='1rem'
        >
          Apply to Join RaidGuild
        </Heading>

        <Text variant='textOne' fontSize={{ base: '1rem', lg: '18px' }}>
          Humans wanted for hazardous journey into the ether. Smol wages to
          start, but a lifetime of rewards. Bitter cold winters to build,
          glorious summers to reap. Long months of navigating the dark forest.
          Constant danger lurking in the mempool. Safe return to normalcy
          doubtful. Great honor and recognition in case of success.
        </Text>
        <br />

        <Text variant='textOne' fontSize={{ base: '1rem', lg: '18px' }}>
          Your path is marked by this first command - fill this form to apply to
          RaidGuild firsthand. Pledges are studied by our counsel forth. Last,
          not least, we'll invite you to join a training cohort in due course.
        </Text>

        <br />
        <Flex
          direction='column'
          bgColor='white'
          borderRadius='0.5rem'
          p='0.5rem 1rem'
        >
          <Text
            variant='textOne'
            fontSize={{ base: '1rem', lg: '18px' }}
            color='black'
            fontFamily='jetbrains'
            fontWeight='bold'
            mb='.5rem'
          >
            Status: Season 3
          </Text>
          <Text
            variant='textOne'
            fontSize={{ base: '1rem', lg: '16px' }}
            color='black'
            fontFamily='jetbrains'
            lineHeight='1.4'
          >
            Cohorts are being trained & building cool stuff. Applications are
            closed for season 3 but open for next season. Selected applicants
            will be notified via email when it's time.
          </Text>
        </Flex>
        <br />

        <Button
          variant='primary'
          fontSize={{ base: '16px', lg: '18px' }}
          onClick={() => {
            context.updateStage('next');
          }}
        >
          Start Application
        </Button>
      </Flex>
    </>
  );
};
