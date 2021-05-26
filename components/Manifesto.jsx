import { SimpleGrid, Heading, Text, VStack, Image } from '@chakra-ui/react';

export const Manifesto = () => {
  return (
    <SimpleGrid
      columns={[1, 1, 2]}
      padding={{ base: '2rem', lg: '2rem 4rem' }}
      placeItems='center'
    >
      <Image
        src='/assets/raid__fantasy.png'
        alt='raid fantasy'
        width={{ base: '250px', lg: '500px' }}
      />
      <VStack spacing={5} justifyContent='center'>
        <Heading variant='uncial' fontSize={{ base: '1.5rem', lg: '2rem' }}>
          Manifesto
        </Heading>
        <div>
          <Text variant='texturina' fontSize={{ base: '1rem', lg: '1.3rem' }}>
            We believe that DAOs will power the future of work. Through the
            MetaCartel network, we assembled a fellowship of the best builders,
            designers and hustlers in the space in order to make this future a
            reality. By sharing resources, branding and collaboration tools, we
            can create positive-sum value for the Ethereum ecosystem in a way
            that has never been possible before the advent of DAOs.
          </Text>
          <br></br>
          <Text variant='texturina' fontSize={{ base: '1rem', lg: '1.3rem' }}>
            We believe in Web3 and are here to build it, use it, and propogate
            it. The profits from our work will be used to fund development of
            open source tooling and public goods. We will share the learnings
            from our experiments and open source our processes for the community
            to learn and build from.
          </Text>
          <br></br>
          <Text variant='texturina' fontSize={{ base: '1rem', lg: '1.3rem' }}>
            "If you want to go fast, go alone. If you want to go far, go
            together."
          </Text>
        </div>
      </VStack>
    </SimpleGrid>
  );
};
