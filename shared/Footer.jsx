import {
  Flex,
  Link,
  Image,
  SimpleGrid,
  VStack,
  HStack,
  Text
} from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Flex
      direction={{ base: 'column-reverse', lg: 'row' }}
      alignItems='flex-start'
      justifyContent='space-between'
      px={{ base: '2rem', lg: '5rem' }}
      py='2rem'
      w='100%'
      bg='black'
    >
      <Image
        src='/assets/raidguild__logo.png'
        alt='raidguild logo'
        w={{ base: '150px', lg: '200px' }}
        mr='auto'
        mt='2rem'
      />

      <SimpleGrid
        columns={[1, 3]}
        spacing={{ base: '2rem', lg: '5rem' }}
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
            <HStack>
              <span style={{ width: '15px', marginRight: '5px' }}>
                <i className='fab fa-twitter'></i>
              </span>
              <p>Twitter</p>
            </HStack>
          </Link>

          <Link>
            <HStack>
              <span style={{ width: '15px', marginRight: '5px' }}>
                <i className='fab fa-github'></i>
              </span>
              <p>Github</p>
            </HStack>
          </Link>

          <Link>
            <HStack>
              <span style={{ width: '15px', marginRight: '5px' }}>
                <i className='fab fa-discord'></i>
              </span>
              <p>Discord</p>
            </HStack>
          </Link>

          <Link>
            <HStack>
              <span style={{ width: '15px', marginRight: '5px' }}>
                <i className='fas fa-newspaper'></i>
              </span>
              <p>Newsletter</p>
            </HStack>
          </Link>
        </VStack>
      </SimpleGrid>
    </Flex>
  );
};
