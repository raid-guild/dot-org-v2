import {
  Flex,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Button
} from '@chakra-ui/react';
import { theme } from '../themes/theme';

const services = [
  {
    name: 'Consultations',
    img: '/assets/consultations.png',
    text: 'Validate your ideas and get expert advice on how to build, ship and grow your product.'
  },
  {
    name: 'Design Sprints',
    img: '/assets/designsprints.png',
    text: 'Fine tune your product market fit and nail your UX before writing a single line of code.'
  },
  {
    name: 'Full Stack Dev',
    img: '/assets/fullstackdev.png',
    text: 'Make your dApp ideas a reality. From contracts to front ends, our Raiders are the best in the biz.'
  },
  {
    name: 'Marketing',
    img: '/assets/marketing.png',
    text: 'Level up your meme game and build a compelling narrative for your brand / product.'
  }
];

export const Services = () => {
  return (
    <SimpleGrid
      minHeight='95vh'
      columns={[1, 1, 2]}
      padding={{ base: '2rem' }}
      background={`${theme.colors.blackLight}`}
    >
      <VStack spacing={5} justifyContent='center'>
        <Heading variant='primary' fontSize={{ base: '1.5rem', lg: '2rem' }}>
          Our Services
        </Heading>
        <Text variant='medium' fontSize={{ base: '1rem', lg: '1.3rem' }}>
          RaidGuild is the premier design and dev agency of the Web3 ecosystem.
          We are deeply entrenched in the bleeding edge of DAOs, DeFi, dApps and
          everything else in between. Hailing from the MetaCartel network, our
          team consists of a diverse group of talent with over 9000 years of
          combined experience.
        </Text>
        <Text variant='medium' fontSize={{ base: '1rem', lg: '1.3rem' }}>
          We know how to buidl and have the connections, talent and experience
          to turn your ideas into reality. We are lean to the core and deliver
          high quality results with quick turnarounds.
        </Text>
        <Button variant='primary' fontSize={{ base: '1rem', lg: '1.5rem' }}>
          Hire Us
        </Button>
      </VStack>
      <SimpleGrid columns={[1, 2, 2]} gap={5} padding='2rem'>
        {services.map((service, index) => {
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
              <Heading variant='secondary' fontSize={{ base: '1.2rem' }} mb={3}>
                {service.name}
              </Heading>
              <img src={service.img} alt='consultations' />
              <br></br>
              <Text variant='small' fontSize={{ base: '1rem' }}>
                {service.text}
              </Text>
            </Flex>
          );
        })}
      </SimpleGrid>
    </SimpleGrid>
  );
};
