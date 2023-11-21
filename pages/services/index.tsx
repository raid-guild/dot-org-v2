import { Card, Flex, Heading, Image, SimpleGrid, Text, VStack } from '@raidguild/design-system';
import Link from '../../components/atoms/ChakraNextLink';
import GradientBorderButton from '../../components/atoms/GradientBorderButton';
import GradientButton from '../../components/atoms/GradientButton';
import Footer from '../../components/page-components/Footer';
import Nav from '../../components/page-components/Nav';
import { services } from '../../utils/constants';
import tokens from '../../utils/extendedTokens';

const SectionThree = () => (
  <>
    <VStack py='2rem' px={{ base: '1rem', lg: '4rem' }} bg={tokens.purpleToIndigoGradient}>
      <Nav />
      <SimpleGrid
        //   bg={tokens.purpleToRedGradient}
        id='Our Services'
        px={{ base: '2rem', xl: '8rem' }}
        columns={{ base: 1 }}
        minH={{ base: 'max-content', xl: '120vh' }}
        maxH={{ base: 'max', xl: 'max-content' }}
        gap={12}
        py={{ base: 16, xl: 24 }}
        placeItems='center'>
        <VStack spacing={5} justifyContent='center' ml={{ md: '1rem' }} maxW='500' textColor='white'>
          <Heading variant='shadow' color='white'>
            Our Services
          </Heading>
          <Text textAlign='center'>
            RaidGuild is the premier design and dev agency of the Web3 ecosystem. We are deeply entrenched in the
            bleeding edge of DAOs, DeFi, dApps and everything else in between. Hailing from the MetaCartel network, our
            team consists of a diverse group of talent with over 9000 years of combined experience.
          </Text>
          <Text textAlign='center'>
            We know how to buidl and have the connections, talent and experience to turn your ideas into reality. We are
            lean to the core and deliver high quality results with quick turnarounds.
          </Text>
          <br />
          <Link href='/hire'>
            <Flex
              w='100%'
              mt={{ base: '2rem' }}
              direction={{ base: 'column', lg: 'row' }}
              justifyContent={{ base: 'center', lg: 'flex-start' }}
              alignItems={{ base: 'center', lg: 'flex-start' }}
              gap={2}>
              <Link href='/hire/1'>
                <GradientButton width='160px'>Hire Us</GradientButton>
              </Link>
              <Link href='/join/1'>
                <GradientBorderButton label='Join Us' width='160px' />
              </Link>
            </Flex>
          </Link>
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
    </VStack>
    <Footer />
  </>
);

export default SectionThree;
