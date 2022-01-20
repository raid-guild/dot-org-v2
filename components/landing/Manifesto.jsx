import {
  SimpleGrid,
  Heading,
  Text,
  VStack,
  Image,
  Button,
} from '@chakra-ui/react';

import { theme } from '../../themes/theme'  ;

export const Manifesto = () => {
  return (
    <SimpleGrid
      id='manifesto'
      columns={{ base: 1, md: 1, lg: 2 }}
      px={{ base: '2rem', lg: '8rem' }}
      my='4rem'
      mb='0'
      placeItems='center'
    >
      <Image
        src={theme.images.raidFantasy}
        alt='raid fantasy'
        width={{ base: '250px', lg: '400px' }}
      />
      <VStack spacing={5} justifyContent='center' ml={{ md: '1rem' }}>
        <Heading
          variant='headingTwo'
          fontSize={{ base: '1.5rem', lg: '36px' }}
          mb='1rem'
        >
          Manifesto
        </Heading>
        <div>
          <Text
            variant='textOne'
            fontSize={{ base: '1rem', lg: '18px' }}
            textAlign='justify'
          >
            We believe that DAOs will power the future of work. Through the
            MetaCartel network, we assembled a fellowship of the best builders,
            designers and hustlers in the space in order to make this future a
            reality. By sharing resources, branding and collaboration tools, we
            can create positive-sum value for the Ethereum ecosystem in a way
            that has never been possible before the advent of DAOs.
          </Text>
          <br></br>
          <Text
            variant='textOne'
            fontSize={{ base: '1rem', lg: '18px' }}
            textAlign='justify'
          >
            We believe in Web3 and are here to build it, use it, and propagate
            it. The profits from our work will be used to fund development of
            open source tooling and public goods. We will share the learnings
            from our experiments and open source our processes for the community
            to learn and build from.
          </Text>
          <br></br>
          <Text
            variant='textOne'
            fontSize={{ base: '1rem', lg: '18px' }}
            textAlign='justify'
          >
            'If you want to go fast, go alone. If you want to go far, go
            together.'
          </Text>
        </div>
        <br />
        <Button
          variant='primary'
          fontSize={{ base: '16px', lg: '18px' }}
          onClick={() =>
            window.open('https://handbook.raidguild.org', '_blank')
          }
        >
          Handbook
        </Button>
      </VStack>
    </SimpleGrid>
  );
};
