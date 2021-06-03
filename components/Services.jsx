import {
  Flex,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Button
} from '@chakra-ui/react';
import { theme } from '../themes/theme';

import { services } from '../utils/constants';

export const Services = () => {
  return (
    <SimpleGrid
      minHeight='95vh'
      columns={[1, 1, 2]}
      padding={{ base: '2rem', lg: '2rem 4rem' }}
      background={`${theme.colors.blackLight}`}
    >
      <VStack spacing={5} justifyContent='center'>
        <Heading variant='uncial' fontSize={{ base: '1.5rem', lg: '2rem' }}>
          Our Services
        </Heading>
        <Text variant='texturina' fontSize={{ base: '1rem', lg: '1.3rem' }}>
          RaidGuild is the premier design and dev agency of the Web3 ecosystem.
          We are deeply entrenched in the bleeding edge of DAOs, DeFi, dApps and
          everything else in between. Hailing from the MetaCartel network, our
          team consists of a diverse group of talent with over 9000 years of
          combined experience.
        </Text>
        <Text variant='texturina' fontSize={{ base: '1rem', lg: '1.3rem' }}>
          We know how to buidl and have the connections, talent and experience
          to turn your ideas into reality. We are lean to the core and deliver
          high quality results with quick turnarounds.
        </Text>
        <Button variant='spaceMono' fontSize={{ base: '1rem', lg: '1.5rem' }}>
          Hire Us
        </Button>
      </VStack>
      <SimpleGrid columns={[1, 2, 2]} gap={5} padding='2rem'>
        {services.map((item, index) => {
          return (
            <Flex
              key={index}
              direction='column'
              alignItems='center'
              justifyContent='space-evenly'
              background={`${theme.colors.blackDark}`}
              boxShadow='4px 9px 18px -7px rgba(0,0,0,0.75);'
              padding='1rem'
            >
              <Heading variant='texturina' fontSize={{ base: '1.2rem' }} mb={3}>
                {item.name}
              </Heading>
              <img src={item.img} alt='consultations' />
              <br></br>
              <Text variant='texturinaSmall' fontSize={{ base: '1rem' }}>
                {item.text}
              </Text>
            </Flex>
          );
        })}
      </SimpleGrid>
    </SimpleGrid>
  );
};
