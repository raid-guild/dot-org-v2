import { SimpleGrid, VStack, Box, Heading, Text, Button, Image } from '@raidguild/design-system';
import tokens from '../../utils/extendedTokens';
import Link from '../atoms/ChakraNextLink';

import raidFantasy from '../../assets/illustrations/raid__fantasy.webp';

const SectionTwo = () => {
  return (
    <SimpleGrid
      bg={tokens.background}
      id='manifesto'
      columns={{ base: 1, md: 1, lg: 2 }}
      px={{ base: '2rem', lg: '8rem' }}
      py='4rem'
      minH={{ base: 'max-contnt', md: '120vh' }}
      maxH='max-content'
      placeItems='center'>
      <Box width={{ base: '250px', lg: '400px' }}>
        <Image src={raidFantasy.src} alt='raid fantasy' placeholder='blur' />
      </Box>
      <VStack spacing={5} justifyContent='center' ml={{ md: '1rem' }} maxW='500'>
        <Heading>Manifesto</Heading>
        <div>
          <Text>
            We believe that DAOs will power the future of work. Through the MetaCartel network, we assembled a
            fellowship of the best builders, designers and hustlers in the space in order to make this future a reality.
            By sharing resources, branding and collaboration tools, we can create positive-sum value for the Ethereum
            ecosystem in a way that has never been possible before the advent of DAOs.
          </Text>
          <br />
          <Text>
            We believe in Web3 and are here to build it, use it, and propogate it. The profits from our work will be
            used to fund development of open source tooling and public goods. We will share the learnings from our
            experiments and open source our processes for the community to learn and build from.
          </Text>
          <br />
          <Text>&apos;If you want to go fast, go alone. If you want to go far, go together.&apos;</Text>
        </div>
        <br />
        <Link href='https://handbook.raidguild.org' isExternal>
          <Button bgGradient={tokens.orangeToPurpleGradient} borderRadius={2}>
            Handbook
          </Button>
        </Link>
      </VStack>
    </SimpleGrid>
  );
};

export default SectionTwo;
