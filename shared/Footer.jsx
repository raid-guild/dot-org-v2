import { Flex, Link, Box, SimpleGrid, VStack, HStack } from '@chakra-ui/react';
import Image from 'next/image';

import { useContext } from 'react';

import { theme } from '../themes/theme';

import { StyledFooterHeaderText } from '../themes/styled';

import raidguild from '../public/assets/logos/raidguild.webp';
import useWallet from "../hooks/useWallet";
import { AppContext } from '../context/AppContext';


export const Footer = () => {

  const {connectWallet} = useWallet();
  const context = useContext(AppContext);

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
      <Box width={{ base: '150px', lg: '168px' }} mr='auto' mt='2rem'>
        <Image src={raidguild} alt='raidguild logo' priority />
      </Box>
      <SimpleGrid
        columns={{ base: 1, md: 3, lg: 3 }}
        spacing={{ base: '2rem', lg: '5rem' }}
        fontFamily='spaceMono'
        fontSize='1rem'
        color='greyLight'
      >
        <VStack alignItems='flex-start'>
          <StyledFooterHeaderText fontSize='1.2rem'>
            For Clients
          </StyledFooterHeaderText>
          <Link href='/#services'>Hire Us</Link>
          <Link href='/#portfolio'>Our Portfolio</Link>
          <Link href='/#portfolio'>Ask Questions</Link>
        </VStack>
        <VStack alignItems='flex-start'>
          <StyledFooterHeaderText fontSize='1.2rem'>
            For Raiders
          </StyledFooterHeaderText>
          <Link href='/#culture'>Join Us</Link>
          <Link
            href='https://handbook.raidguild.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Our Handbook
          </Link>
          {context?.signerAddress == null && 
          <Link onClick={() => connectWallet()}>Log In</Link>}
          {context?.signerAddress !== null && 
          <Link href="/admin">Admin Panel</Link>}
        </VStack>
        <VStack alignItems='flex-start'>
          <StyledFooterHeaderText fontSize='1.2rem'>
            For All
          </StyledFooterHeaderText>
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
