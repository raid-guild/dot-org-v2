import {
  Flex,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Button,
  Image
} from '@chakra-ui/react';

import { services } from '../utils/constants';

export const Services = () => {
  return (
    <SimpleGrid
      minHeight='95vh'
      columns={[1, 1]}
      px='8rem'
      py='2rem'
      my='4rem'
      bg='blackLighter'
    >
      <VStack spacing={5} justifyContent='center' lineHeight='1.8' my='5rem'>
        <Heading variant='uncial' fontSize={{ base: '1.5rem', lg: '2rem' }}>
          Our Services
        </Heading>
        <Text
          variant='texturina'
          fontSize={{ base: '1rem', lg: '1.4rem' }}
          textAlign='justify'
        >
          RaidGuild is the premier design and dev agency of the Web3 ecosystem.
          We are deeply entrenched in the bleeding edge of DAOs, DeFi, dApps and
          everything else in between. Hailing from the MetaCartel network, our
          team consists of a diverse group of talent with over 9000 years of
          combined experience.
        </Text>
        <Text
          variant='texturina'
          fontSize={{ base: '1rem', lg: '1.4rem' }}
          textAlign='justify'
        >
          We know how to buidl and have the connections, talent and experience
          to turn your ideas into reality. We are lean to the core and deliver
          high quality results with quick turnarounds.
        </Text>
        <br />
        <Button variant='spaceMono' fontSize={{ base: '1rem', lg: '1.5rem' }}>
          Hire Us
        </Button>
      </VStack>
      <SimpleGrid columns={[1, 4]} gap={5} my='2rem'>
        {services.map((item, index) => {
          return (
            <Flex
              key={index}
              direction='column'
              alignItems='center'
              justifyContent='space-evenly'
              py='2rem'
              px='1.5rem'
              bg='blackLighter'
              borderTop='2px solid'
              borderColor='purple'
            >
              <Heading
                variant='texturina'
                fontSize={{ base: '1.4rem' }}
                mb={3}
                textAlign='center'
              >
                {item.name}
              </Heading>

              <Image src={item.img} alt='consultations' my='.5rem' />

              <Text
                variant='texturinaSmall'
                fontSize={{ base: '1.2rem' }}
                textAlign='justify'
                minH='120px'
              >
                {item.text}
              </Text>
            </Flex>
          );
        })}
      </SimpleGrid>
    </SimpleGrid>
  );
};
