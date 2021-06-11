import { Flex, Link, Image, SimpleGrid, VStack, Text } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Flex
      direction='row'
      alignItems='flex-start'
      justifyContent='space-between'
      px='5rem'
      py='2rem'
      w='100%'
    >
      <Image src='/assets/raidguild__logo.png' alt='raidguild logo' w='250px' />

      <SimpleGrid
        columns='3'
        spacing='5rem'
        fontFamily='spaceMono'
        fontSize='1rem'
        color='greyLight'
      >
        <VStack alignItems='flex-start'>
          <Text fontWeight='bold' fontSize='1.2rem' color='red'>
            For Clients
          </Text>
          <Link>Hire Us</Link>
          <Link>Our Portfolio</Link>
          <Link>FAQ</Link>
        </VStack>
        <VStack alignItems='flex-start'>
          <Text fontWeight='bold' fontSize='1.2rem' color='red'>
            For Raiders
          </Text>
          <Link>Join Us</Link>
          <Link>Our Handbook</Link>
        </VStack>
        <VStack alignItems='flex-start'>
          <Text fontWeight='bold' fontSize='1.2rem' color='red'>
            For All
          </Text>
          <Link>
            <i className='fab fa-twitter'></i> Twitter
          </Link>
          <Link>
            <i className='fab fa-github'></i> Github
          </Link>
          <Link>
            <i className='fab fa-discord'></i> Discord
          </Link>
          <Link>
            <i className='fas fa-newspaper'></i> Newsletter
          </Link>
        </VStack>
      </SimpleGrid>
    </Flex>
  );
};
