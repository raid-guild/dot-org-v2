import React from 'react';
import { Flex, Image } from '@chakra-ui/react';
import Link from 'next/link';

import { StyledSecondaryButton } from '../../themes/styled';

import { StyledSecondaryHeading, StyledBodyText } from '../../themes/styled';

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
