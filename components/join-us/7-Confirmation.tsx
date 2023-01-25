import React from 'react';
import { Flex, Box, Heading, Text, Button } from '@raidguild/design-system';
import Image from 'next/image';
import Link from '../atoms/ChakraNextLink';

import signalFire from '../../assets/illustrations/signal_fire.webp';

const Confirmation = () => (
  <Flex w='100%' direction='column' alignItems='center' px={{ base: '2rem', lg: '5rem' }} py='5rem'>
    <Box mb='2rem' w='250px'>
      <Image src={signalFire} placeholder='blur' alt='signal fire' />
    </Box>
    <Heading fontSize={{ base: '20px', lg: '26px' }} mb='2rem' textAlign='center'>
      The Fires Have Been Lit!
    </Heading>

    <Text fontFamily='spaceMono' maxWidth='37rem'>
      Your submission has been received. An invitation will be sent to your email address prior to the commencement of
      next season. We wish you luck! Stay Curious!
    </Text>

    <Link href='https://discord.gg/rGFpfQf' isExternal>
      <Button mt='2rem' fontFamily='spaceMono'>
        Join Discord
      </Button>
    </Link>
  </Flex>
);

export default Confirmation;
