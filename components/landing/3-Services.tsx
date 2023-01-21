import { Flex, VStack, SimpleGrid, Image, Heading, Button, Text, Card } from '@raidguild/design-system';
import Link from '../atoms/ChakraNextLink';

import { services } from '../../utils/constants';

const SectionThree = () => (
  <Flex
    id='services'
    layerStyle='purpleToRedDiagonalGradient'
    minHeight='95vh'
    direction={['column', null, null, 'row']}
    px={{ base: '2rem', lg: '8rem' }}
    py='2rem'>
    <VStack spacing={5} justifyContent='center' my='5rem' maxW='500px'>
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
    <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap={5} my='auto' ml={{ lg: '3rem' }}>
      {services.map((item) => {
        return (
          <Card
            key={item.name}
            // direction='column'
            alignItems='center'
            justifyContent='space-evenly'
            variant='topBorderOnly'>
            <Heading mb={3} size='md'>
              {item.name}
            </Heading>

            <Image src={item.img} alt='consultations' my='.5rem' />

            <Text fontSize='sm' textAlign='center'>
              {item.text}
            </Text>
          </Card>
        );
      })}
    </SimpleGrid>
  </Flex>
);

export default SectionThree;
