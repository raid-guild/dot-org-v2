import React, { useContext } from 'react';
import { Flex, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

import { AppContext } from '../../context/AppContext';
import useWarnings from '../../hooks/useWarnings';
import { theme } from '../../themes/theme';

import {
  StyledPrimaryButton,
  StyledPrimaryHeading,
  StyledBodyText,
  StyledMessageText,
  StyledSecondaryButton
} from '../../themes/styled';

export const Intro = () => {
  const context = useContext(AppContext);

  const { triggerToast } = useWarnings();

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
          next screen after connecting your wallet. The more information you can
          provide about the work you want to hire RaidGuild for, the better. The
          form will have space for information about you / your team,
          background, and description for your project, specs for the work, as
          well as a few questions to give us an initial feel for your needs.
        </StyledBodyText>
        <br />

        <StyledBodyText fontSize={{ base: '1rem', lg: '18px' }}>
          You will be prompted to pay a{' '}
          <ChakraLink
            href='https://app.honeyswap.org/#/swap?inputCurrency=0x18e9262e68cc6c6004db93105cc7c001bb103e49&outputCurrency=0x6a023ccd1ff6f2045c3309768ead9e68f978f6e1&chainId=100'
            isExternal
            textDecoration='underline'
            color={theme.colors.red}
          >
            500 $RAID
          </ChakraLink>{' '}
          application submission fee at the end of the form as a spam filter.
          Once paid, you will be taken to a client dashboard where you can track
          the status of all your applications. If you prefer to push your
          application to the top of all other requests we received, you can
          start making bids in{' '}
          <ChakraLink
            href='https://bids.raidguild.org/'
            isExternal
            textDecoration='underline'
            color={theme.colors.red}
          >
            the consultation queue
          </ChakraLink>{' '}
          to climb up the queue. Once a bid is accepted, you need to pay a one
          time fee of{' '}
          <ChakraLink
            href='https://app.honeyswap.org/#/swap?inputCurrency=0x18e9262e68cc6c6004db93105cc7c001bb103e49&outputCurrency=0x6a023ccd1ff6f2045c3309768ead9e68f978f6e1&chainId=100'
            isExternal
            textDecoration='underline'
            color={theme.colors.red}
          >
            15000 $RAID
          </ChakraLink>{' '}
          to secure your spot for a consultation from your dashboard.
        </StyledBodyText>
        <br />

        <StyledBodyText fontSize={{ base: '1rem', lg: '18px' }}>
          For more info about the consultation process, join our {' '}
          <ChakraLink
            href='https://handbook.raidguild.org/'
            isExternal
            textDecoration='underline'
            color={theme.colors.red}
          >
            discord.
          </ChakraLink>
          .
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

        {context.signerAddress && (
          <Flex w='100%' direction={{ base: 'column', md: 'row', lg: 'row' }}>
            <StyledPrimaryButton
              w='100%'
              mr='1rem'
              mb='1rem'
              fontSize={{ base: '16px', lg: '18px' }}
              onClick={() => {
                if (context.chainId !== 100 && context.chainId !== 1) {
                  triggerToast('Please switch to the Gnosis or Mainnet Networks.');
                  return;
                }
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
        )}
      </Flex>
    </>
  );
};
