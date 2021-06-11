import { Flex, Image, HStack, Heading } from '@chakra-ui/react';

export const Community = () => {
  return (
    <Flex
      direction='column'
      alignItems='center'
      justifyContent='center'
      padding={{ base: '2rem', lg: '2rem 4rem' }}
      bg='#201F1D'
    >
      <Heading variant='uncial' mb='2rem' mt='2rem'>
        Supported by
      </Heading>
      <HStack w='100%' justifyContent='space-evenly'>
        <Image src='/assets/meta__chilli.png' alt='metacartel' w='200px' />
        <Image src='/assets/daohaus__logo.png' alt='daohaus' w='200px' />
        <Image src='/assets/moloch__logo.png' alt='molochdao' w='200px' />
      </HStack>
    </Flex>
  );
};
