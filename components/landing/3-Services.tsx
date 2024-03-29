import { Card, Flex, Heading, Image, SimpleGrid, Text, VStack } from '@raidguild/design-system';
import { services } from '../../utils/constants';
import layerStyles from '../../utils/extendedTokens';
import AnimatedButton from '../atoms/AnimatedButton';
import Link from '../atoms/ChakraNextLink';
import GradientShiftButton from '../atoms/GradientShiftButton';

const SectionThree = () => (
  <SimpleGrid
    bg={layerStyles.purpleToRedGradient}
    id='Our Services'
    px={{ base: '2rem', xl: '8rem' }}
    columns={{ base: 1, xl: 2 }}
    minH={{ base: 'max-content', xl: '120vh' }}
    maxH={{ base: 'max', xl: 'max-content' }}
    gap={12}
    py={{ base: 16, xl: 24 }}
    placeItems='center'>
    <VStack spacing={5} justifyContent='center' ml={{ md: '1rem' }} maxW='500' textColor='white'>
      <Heading variant='shadow' color='white'>
        Our Services
      </Heading>
      <Text>
        RaidGuild is the premier design and dev agency of the Web3 ecosystem. We are deeply entrenched in the bleeding
        edge of DAOs, DeFi, dApps and everything else in between. Hailing from the MetaCartel network, our team consists
        of a diverse group of talent with over 9000 years of combined experience.
      </Text>
      <Text>
        We know how to buidl and have the connections, talent and experience to turn your ideas into reality. We are
        lean to the core and deliver high quality results with quick turnarounds.
      </Text>
      <br />

      <Flex gap={2} flexWrap={{ base: 'wrap', md: 'nowrap' }} w='100%' justify='center'>
        <Link href='/hire/1'>
          <GradientShiftButton w='160px'>Hire Us</GradientShiftButton>
        </Link>
        <Link href='/join/1'>
          <AnimatedButton w='160px' start='right' fontWeight={500}>
            All Services
          </AnimatedButton>
        </Link>
      </Flex>
    </VStack>
    <VStack height={{ base: 'max', md: 'full' }}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={5} my='auto' ml={{ lg: '1.5rem' }}>
        {services.map((item) => {
          return (
            <Card
              key={item.name}
              gap={2}
              alignItems='center'
              justifyContent='space-evenly'
              borderColor='primary.500'
              maxW={{ base: '100%', md: '500px' }}
              p={6}>
              <Image src={item.img} alt='consultations' my='.5rem' />

              <Heading mb={3} size='md' textAlign='center'>
                {item.name}
              </Heading>
              <Text fontSize='sm' textAlign='center'>
                {item.text}
              </Text>
            </Card>
          );
        })}
      </SimpleGrid>
    </VStack>
  </SimpleGrid>
);

export default SectionThree;
