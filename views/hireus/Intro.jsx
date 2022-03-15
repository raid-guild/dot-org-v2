import React, { useContext } from 'react';
import { Flex, Link } from '@chakra-ui/react';

import { AppContext } from '../../context/AppContext';

import {
  StyledPrimaryButton,
  StyledPrimaryHeading,
  StyledBodyText,
  StyledMessageText,
  StyledSecondaryButton
} from '../../themes/styled';

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
        <StyledPrimaryHeading
          fontSize={{ base: '1.5rem', lg: '36px' }}
          mb='1rem'
        >
          Hiring RaidGuild
        </StyledPrimaryHeading>

        <StyledBodyText fontSize={{ base: '1rem', lg: '18px' }}>
          To request a consultation, please fill out the form starting on the
          next screen (click Start). The more information you can provide about
          the work you want to hire Raid Guild for, the better. The form will
          have space for information about you / your team, background and
          description for your project, specs for the work, as well as a few
          questions to give us an initial feel for your needs.
        </StyledBodyText>
        <br />

        <StyledBodyText fontSize={{ base: '1rem', lg: '18px' }}>
          Once you’ve filled out the form, you will also have an opportunity to
          add the 500 DAI fee to be added to the consultation queue. After that,
          you can return to the queue page itself to add a $RAID bid to move up
          in the queue.
        </StyledBodyText>
        <br />

        <StyledBodyText fontSize={{ base: '1rem', lg: '18px' }}>
          For more info about the consultation process, please refer to our
          DOCS.
        </StyledBodyText>
        <br />

        <Flex
          direction='column'
          bgColor='white'
          borderRadius='0.5rem'
          p='0.5rem 1rem'
          maxW='720px'
        >
          <StyledMessageText
            fontSize={{ base: '1rem', lg: '18px' }}
            fontWeight='bold'
            mb='.5rem'
          >
            Status: New Consultation Queue
          </StyledMessageText>
          <StyledMessageText fontSize={{ base: '1rem', lg: '16px' }}>
            If you made a bid on the previous version of the consultation queue,
            check{' '}
            <Link
              href='https://hireus.raidguild.org'
              isExternal
              textDecoration='underline'
            >
              hireus.raidguild.org
            </Link>{' '}
            to view your bid status.
          </StyledMessageText>
        </Flex>
        <br />

        <Flex w='100%' direction={{ base: 'column', md: 'row', lg: 'row' }}>
          <StyledPrimaryButton
            w='100%'
            mr='1rem'
            mb='1rem'
            fontSize={{ base: '16px', lg: '18px' }}
            onClick={() => {
              context.updateStage('next');
            }}
          >
            New Consultation
          </StyledPrimaryButton>

          <StyledSecondaryButton
            w='100%'
            fontSize={{ base: '16px', lg: '18px' }}
            onClick={() => (window.location.href = '/dashboard')}
          >
            View My Submissions
          </StyledSecondaryButton>
        </Flex>
      </Flex>
    </>
  );
};
