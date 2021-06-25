import { Button, Flex, Heading, Text } from '@chakra-ui/react';

import Link from 'next/link';

export const Token = () => {
  return (
    <Flex
      direction='column'
      alignItems='center'
      justifyContent='center'
      bg='blackLighter'
      py='5rem'
      px={{ base: '2rem', lg: '8rem' }}
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
      <Text variant='textOne' fontSize='18px' textAlign='center' mb='2rem'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Text>
      <Button
        h='50px'
        borderRadius='none'
        fontFamily='spaceMono'
        fontSize={{ base: '1rem', lg: '1.5rem' }}
        p='1rem'
        color='white'
        fontWeight='bold'
        bg='linear-gradient(153deg, rgba(255,56,100,1) 0%, rgba(130,46,166,1) 49%, rgba(242,232,87,1) 100%)'
        _hover={{
          background:
            'linear-gradient(153deg, #dd2049 0%, #5e177c 49%, #bdb332 100%)'
        }}
      >
        <Link href='/'>
          <a>Learn more</a>
        </Link>
      </Button>
    </Flex>
  );
};
