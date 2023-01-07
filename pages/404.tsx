import { Flex, Box, Heading, Button } from '@raidguild/design-system';
import Image from 'next/image';
import Link from '../components/atoms/ChakraNextLink';

import raidBanner from '../assets/illustrations/raid__banner.webp';

const NotFound = () => (
  <Flex minH='100vh' w='100%' direction='column' alignItems='center' justifyContent='center'>
    <Box width={{ base: '450px', md: '500px', lg: '550px' }}>
      <Image src={raidBanner} placeholder='blur' alt='raid-banner' />
    </Box>
    <Heading>Page not found</Heading>
    <Flex direction={{ lg: 'row', base: 'column' }} mt={5} gap={3}>
      <Link href='/'>
        <Button mb={{ lg: '0', base: '1rem' }}>Back Home</Button>
      </Link>
      <Link href='/hire'>
        <Button>Hire Us</Button>
      </Link>
    </Flex>
  </Flex>
);

export default NotFound;
