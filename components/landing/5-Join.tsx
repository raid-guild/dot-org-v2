import { Flex, VStack, SimpleGrid, Image, Heading, Button, Text, Card, Box } from '@raidguild/design-system';
import Link from '../atoms/ChakraNextLink';

import { culture, swordsImage } from '../../utils/constants';
import tokens from '../../utils/extendedTokens';

const SectionFive = () => (
  <Flex
    bg={tokens.purpleToIndigoGradient}
    minHeight='100vh'
    direction='column'
    alignItems='center'
    justifyContent='center'
    px={{ base: '2rem', lg: '8rem' }}
    minH={{ base: 'max', md: '120vh' }}
    py='6rem'>
    <VStack spacing={5} justifyContent='center' textColor='white'>
      <Heading variant='shadow' color='white' mb='1rem'>
        Join the Guild
      </Heading>
      <Text maxW='560px' textAlign='center'>
        We believe workers should be self-sovereign and able to work when, where and how they want, as long as they
        create high value output. We&apos;re looking for top talent that can take things into their own hands and bring
        unique value to the guild.
      </Text>
      <br />
      <Link href='/join'>
        <Button bgGradient={tokens.orangeToPurpleGradient} borderRadius={2}>
          Join Us
        </Button>
      </Link>
    </VStack>

    <SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} gap={8} mt='6rem'>
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

          <Image
            src={swordsImage}
            alt='Raidguild Swords Icon'
            bottom='-21px'
            width='42px'
            height='42px'
            position='absolute'
          />
        </Card>
      ))}
    </SimpleGrid>
  </Flex>
);

export default SectionFive;
