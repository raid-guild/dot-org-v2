import { Flex, Heading, Link, Text } from '@chakra-ui/react';

export const Token = () => {
  return (
    <Flex
      direction='column'
      alignItems='center'
      justifyContent='center'
      bg='blackLighter'
      py='5rem'
    >
      <Heading
        mb='2rem'
        mt='2rem'
        fontFamily='rubik'
        bg='linear-gradient(153deg, rgba(255,56,100,1) 0%, rgba(130,46,166,1) 49%, rgba(242,232,87,1) 100%)'
        bgClip='text'
      >
        RAID Token
      </Heading>
      <Text
        variant='texturina'
        fontSize='1.5rem'
        lineHeight='2'
        textAlign='center'
        maxW='70%'
        mb='2rem'
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Text>
      <Link
        fontFamily='spaceMono'
        fontSize='1.5rem'
        p='1rem'
        color='white'
        fontWeight='bold'
        bg='linear-gradient(153deg, rgba(255,56,100,1) 0%, rgba(130,46,166,1) 49%, rgba(242,232,87,1) 100%)'
      >
        Learn more
      </Link>
    </Flex>
  );
};
