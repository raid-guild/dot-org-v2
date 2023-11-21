import { Box, Heading, Text, VStack } from '@raidguild/design-system';
import Image from 'next/image';

import signalFire from '../../assets/illustrations/signal_fire.webp';

const Confirmation = () => {
  return (
    <VStack py={8}>
      <Box mb='2rem' w='250px'>
        <Image src={signalFire} placeholder='blur' alt='signal fire' />
      </Box>
      <Heading mb='2rem' textAlign='center'>
        The Fires Have Been Lit!
      </Heading>

      <Text fontFamily='spaceMono'>
        Your request has been received. A member of the Guild will be in touch with you soon.
      </Text>
    </VStack>
  );
};

export default Confirmation;
