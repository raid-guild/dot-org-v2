import { Flex, Image, Heading } from '@chakra-ui/react';

export const Community = () => {
  return (
    <Flex
      direction='column'
      alignItems='center'
      justifyContent='center'
      padding={{ base: '2rem', lg: '2rem 4rem' }}
      bg='#201F1D'
    >
      <Heading
        variant='headingTwo'
        mb='2rem'
        mt='2rem'
        fontSize={{ base: '1.5rem', lg: '36px' }}
      >
        Supported by
      </Heading>
      <Flex
        w='100%'
        justifyContent='space-evenly'
        alignItems='center'
        direction={{ base: 'column', lg: 'row' }}
      >
        <Image
          src='/assets/meta__chilli.png'
          alt='metacartel'
          w={{ base: '150px', lg: '200px' }}
        />
        <Image
          src='/assets/daohaus__logo.png'
          alt='daohaus'
          w={{ base: '150px', lg: '200px' }}
        />
        <Image
          src='/assets/moloch__logo.png'
          alt='molochdao'
          w={{ base: '150px', lg: '200px' }}
        />
      </Flex>
    </Flex>
  );
};
