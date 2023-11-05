import { Flex, VStack, SimpleGrid, Image, Heading, Button, Text, Card } from '@raidguild/design-system';
import Link from '../atoms/ChakraNextLink';

import { culture } from '../../utils/constants';

const SectionFive = () => (
  <Flex
    layerStyle='redToPurpleHorizontalGradient'
    minHeight='100vh'
    direction='column'
    alignItems='center'
    justifyContent='center'
    px={{ base: '2rem', lg: '8rem' }}
    minH={{ base: 'max', md: '100vh' }}
    py='6rem'>
    <VStack spacing={5} justifyContent='center'>
      <Heading mb='1rem'>Join the Guild</Heading>
      <Text maxW='60%' textAlign='center'>
        We believe workers should be self-sovereign and able to work when, where and how they want, as long as they
        create high value output. We&apos;re looking for top talent that can take things into their own hands and bring
        unique value to the guild.
      </Text>
      <br />
      <Link href='/join'>
        <Button>Join Us</Button>
      </Link>
    </VStack>

    <SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} gap={5} mt='6rem'>
      {culture.map((item) => (
        <Card
          key={item.name}
          gap={6}
          alignItems='center'
          justifyContent='space-evenly'
          borderColor='primary.500'
          maxW={{ base: '100%', md: '500px' }}
          p={12}>
          <Image src={item.img} alt='culture' my='.5rem' />
          <Heading size='md' mb={3} textAlign='center'>
            {item.name}
          </Heading>
          <Text textAlign='center'>{item.text}</Text>
        </Card>
      ))}
    </SimpleGrid>
  </Flex>
);

export default SectionFive;
