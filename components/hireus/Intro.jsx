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
          Hiring RaidGuild
        </Heading>

        <Text variant='textOne' fontSize={{ base: '1rem', lg: '18px' }}>
          To request a consultation, please fill out the form starting on the
          next screen (click Start). The more information you can provide about
          the work you want to hire Raid Guild for, the better. The form will
          have space for information about you / your team, background and
          description for your project, specs for the work, as well as a few
          questions to give us an initial feel for your needs.
        </Text>
        <br />

        <Text variant='textOne' fontSize={{ base: '1rem', lg: '18px' }}>
          Once you’ve filled out the form, you will also have an opportunity to
          add the 500 DAI fee to be added to the consultation queue. After that,
          you can return to the queue page itself to add a $RAID bid to move up
          in the queue.
        </Text>
        <br />

        <Text variant='textOne' fontSize={{ base: '1rem', lg: '18px' }}>
          For more info about the consultation process, please refer to our
          DOCS.
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
            Status: PAUSED FOR THE HOLIDAYS
          </Text>
          <Text
            variant='textOne'
            fontSize={{ base: '1rem', lg: '16px' }}
            color='black'
            fontFamily='jetbrains'
            lineHeight='1.4'
          >
            Hello prospective clients! Thank you for your interest in working
            with the Guild, as we approach the holiday season, we want you to
            know that we will pause additional consultations for the remainder
            of the year. Please feel free to submit your projects and use the
            $RAID bidding queue to signal how strongly you wish to align with
            the Guild in 2022 - but please respect our Raiders as we take time
            off this season to reflect upon this wild year and spend time with
            our friends and loved ones. We look forward to working with you and
            learning more about your project in the New Year! ⚔️
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
          New Consultation
        </Button>
      </Flex>
    </>
  );
};
