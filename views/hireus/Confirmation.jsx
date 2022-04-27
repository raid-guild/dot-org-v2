import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';

import { StyledSecondaryButton } from '../../themes/styled';

import { StyledSecondaryHeading, StyledBodyText } from '../../themes/styled';

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
        Your request has been added to the end of the queue. A member of the
        Guild will be in touch with you once we’ve worked our way down the
        queue. For a faster response, you are welcome to{' '}
        <a className='hiringboard-link' href='/'>
          add a $RAID token bid to your submission
        </a>{' '}
        to move higher up the queue.
      </StyledBodyText>

      <Flex
        w='100%'
        justifyContent='center'
        direction={{ base: 'column', md: 'row', lg: 'row' }}
        mt='2rem'
      >
        <Link href='/dashboard' passHref>
          <StyledSecondaryButton mr='1rem' mb='1rem'>
            View My Submissions
          </StyledSecondaryButton>
        </Link>
        <StyledSecondaryButton
          onClick={() => (window.location.href = 'https://bids.raidguild.org/')}
        >
          Start Bidding
        </StyledSecondaryButton>
      </Flex>
    </Flex>
  );
};
