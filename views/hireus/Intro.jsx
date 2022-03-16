import React, { useContext } from 'react';
import { Flex, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

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
          next screen (New Consultation). The more information you can provide
          about the work you want to hire RaidGuild for, the better. The form
          will have space for information about you / your team, background, and
          description for your project, specs for the work, as well as a few
          questions to give us an initial feel for your needs.
        </StyledBodyText>
        <br />

        <StyledBodyText fontSize={{ base: '1rem', lg: '18px' }}>
          Once you have filled out the form, you will have to pay a 500 $RAID
          application submission fee. After that, you can start making bids in{' '}
          <ChakraLink
            href='https://bids.raidguild.org/'
            isExternal
            textDecoration='underline'
          >
            the consultation queue to climb the top.
          </ChakraLink>{' '}
          You can track your application and bid status by clicking on "View my
          Submissions" below. Once a bid is accepted, you need to pay a one time
          fee of 15,000 $RAID to secure your spot for a consultation.
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
            IMPORTANT
          </StyledMessageText>
          <StyledMessageText fontSize={{ base: '1rem', lg: '16px' }}>
            If you made a bid prior to March 15th, 2022, please use the old
            version of the Consultation Queue:{' '}
            <ChakraLink
              href='https://hireus.raidguild.org'
              isExternal
              textDecoration='underline'
            >
              hireus.raidguild.org
            </ChakraLink>
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

          <Link href='/dashboard' passHref>
            <StyledSecondaryButton
              w='100%'
              fontSize={{ base: '16px', lg: '18px' }}
            >
              View My Submissions
            </StyledSecondaryButton>
          </Link>
        </Flex>
      </Flex>
    </>
  );
};
