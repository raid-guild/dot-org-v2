import { Flex, VStack, SimpleGrid, Image, Heading, Button, Text } from '@raidguild/design-system';
import Link from '../atoms/ChakraNextLink';

import { services } from '../../utils/constants';

const SectionThree = () => (
  <SimpleGrid
    layerStyle='purpleToRedVerticalGradient'
    minHeight='95vh'
    columns={{ base: 1, md: 1, lg: 2 }}
    px={{ base: '2rem', lg: '8rem' }}
    py='2rem'>
    <VStack spacing={5} justifyContent='center' lineHeight='1.8' my='5rem'>
      <Heading fontSize={{ base: '1.5rem', lg: '36px' }}>Our Services</Heading>
      <Text fontSize={{ base: '1rem', lg: '18px' }}>
        RaidGuild is the premier design and dev agency of the Web3 ecosystem. We are deeply entrenched in the bleeding
        edge of DAOs, DeFi, dApps and everything else in between. Hailing from the MetaCartel network, our team consists
        of a diverse group of talent with over 9000 years of combined experience.
      </Text>
      <Text fontSize={{ base: '1rem', lg: '18px' }}>
        We know how to buidl and have the connections, talent and experience to turn your ideas into reality. We are
        lean to the core and deliver high quality results with quick turnarounds.
      </Text>
      <br />
      <Link href='/hire'>
        <Button fontSize={{ base: '16px', lg: '18px' }}>Hire Us</Button>
      </Link>
    </VStack>
    <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap={5} my='2rem' ml={{ lg: '3rem' }}>
      {services.map((item) => {
        return (
          <Flex
            key={item.name}
            direction='column'
            alignItems='center'
            justifyContent='space-evenly'
            py='2rem'
            px='1.5rem'
            bg='black'
            borderTop='2px solid'
            borderColor='primary.500'>
            <Heading mb={3}>{item.name}</Heading>

            <Image src={item.img} alt='consultations' my='.5rem' />

            <Text fontSize={{ base: '16px' }}>{item.text}</Text>
          </Flex>
        );
      })}
    </SimpleGrid>
  </SimpleGrid>
);

export default SectionThree;
