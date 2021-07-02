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
      direction={{ base: 'column-reverse', md: 'row', lg: 'row' }}
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
        width={{ base: '150px', lg: '168px' }}
        mr='auto'
        mt='2rem'
      />

      <SimpleGrid
        columns={{ base: 1, md: 3, lg: 3 }}
        spacing={{ base: '2rem', lg: '5rem' }}
        fontFamily='spaceMono'
        fontSize='1rem'
        color='greyLight'
      >
        <VStack alignItems='flex-start'>
          <Text fontWeight='bold' fontSize='1.2rem' color='red'>
            For Clients
          </Text>
          <Link href='#services'>Hire Us</Link>
          <Link href='#portfolio'>Our Portfolio</Link>
        </VStack>
        <VStack alignItems='flex-start'>
          <Text fontWeight='bold' fontSize='1.2rem' color='red'>
            For Raiders
          </Text>
          <Link href='#culture'>Join Us</Link>
          <Link
            href='https://handbook.raidguild.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Our Handbook
          </Link>
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
              <Link
                href='https://twitter.com/RaidGuild'
                target='_blank'
                rel='noopener noreferrer'
              >
                Twitter
              </Link>
            </HStack>
          </Link>

          <Link>
            <HStack>
              <span style={{ width: '15px', marginRight: '5px' }}>
                <i className='fab fa-github'></i>
              </span>
              <Link
                href='https://github.com/orgs/raid-guild/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Github
              </Link>
            </HStack>
          </Link>

          <Link>
            <HStack>
              <span style={{ width: '15px', marginRight: '5px' }}>
                <i className='fab fa-discord'></i>
              </span>
              <Link
                href='https://discord.gg/rGFpfQf'
                target='_blank'
                rel='noopener noreferrer'
              >
                Discord
              </Link>
            </HStack>
          </Link>

          <Link>
            <HStack>
              <span style={{ width: '15px', marginRight: '5px' }}>
                <i className='fas fa-newspaper'></i>
              </span>
              <Link
                href='https://raidguild.substack.com/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Newsletter
              </Link>
            </HStack>
          </Link>
        </VStack>
      </SimpleGrid>
    </Flex>
  );
};
