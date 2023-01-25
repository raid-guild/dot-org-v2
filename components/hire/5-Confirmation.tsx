import React from 'react';
import { Flex, Box, Heading, Button, Text } from '@raidguild/design-system';
import Image from 'next/image';
import Link from '../atoms/ChakraNextLink';

import signalFire from '../../assets/illustrations/signal_fire.webp';

const Confirmation = () => {
  return (
    <Flex w='100%' direction='column' alignItems='center' px={{ base: '2rem', lg: '5rem' }} py='5rem'>
      <Box mb='2rem' w='250px'>
        <Image src={signalFire} placeholder='blur' alt='signal fire' />
      </Box>
      <Heading mb='2rem' textAlign='center'>
        The Fires Have Been Lit!
      </Heading>

      <Text fontFamily='spaceMono'>
        Your request has been added to the end of the queue. A member of the Guild will be in touch with you once we’ve
        worked our way down the queue. For a faster response, you are welcome to{' '}
        <a className='hiringboard-link' href='/'>
          add a $RAID token bid to your submission
        </a>{' '}
        to move higher up the queue.
      </Text>

      <Flex w='100%' justifyContent='center' direction={{ base: 'column', md: 'row', lg: 'row' }} mt='2rem'>
        <Link href='/dashboard'>
          <Button mr='1rem' mb='1rem'>
            View My Submissions
          </Button>
        </Link>
        <Link href='https://bids.raidguild.org/' isExternal>
          <Button>Start Bidding</Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Confirmation;
