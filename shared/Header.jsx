import { useState, useContext } from 'react';
import {
  Button,
  Flex,
  Box,
  Link as ChakraLink,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';

import { AppContext } from '../context/AppContext';
import { StyledPrimaryButton } from '../themes/styled';
import { theme } from '../themes/theme';

import useWallet from '../hooks/useWallet';

import raidguild from '../public/assets/logos/raidguild.webp';

const StyledButton = styled(Button)`
  &::after {
    box-sizing: inherit;
    transition: all ease-in-out 0.2s;
    background: none repeat scroll 0 0 ${theme.colors.red};
    content: '';
    display: block;
    height: 2px;
    width: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    font-family: ${theme.fonts.rubik};
  }
  &:hover {
    text-decoration: none;
    ::after {
      width: 100%;
    }
  }
`;

export const NavButton = ({ onClick, children }) => (
  <StyledButton
    onClick={onClick}
    transition='all 0.5s ease 0.4s'
    my='1rem'
    variant='link'
    color={`${theme.colors.red}`}
    fontWeight='normal'
    fontSize='1.5rem'
  >
    {children}
  </StyledButton>
);

const getAccountString = (account) => {
  const len = account.length;
  return `0x${account.substr(2, 3).toUpperCase()}...${account
    .substr(len - 3, len - 1)
    .toUpperCase()}`;
};

const navItems = [
  { name: 'Manifesto', href: '/#manifesto' },
  { name: 'Services', href: '/#services' },
  { name: 'Portfolio', href: '/#portfolio' },
  { name: 'Join', href: '/#culture' },
  { name: 'Hire', href: '/#services' }
];

export const Header = ({ windowWidth, navLinks = true }) => {
  const context = useContext(AppContext);
  const { connectWallet, disconnect } = useWallet();
  const [isOpen, onOpen] = useState(false);

  return (
    <Flex
      w='100%'
      h={{ base: '4rem' }}
      color='white'
      fontFamily='spaceMono'
      justify='space-between'
      align='center'
      zIndex={5}
    >
      <Box
        width={{ base: '150px', lg: '168px' }}
        onClick={() => (window.location.href = '/')}
        cursor='pointer'
      >
        <Image src={raidguild} priority alt='RaidGuild' />
      </Box>

      {!navLinks && !context.signerAddress && (
        <StyledPrimaryButton onClick={connectWallet}>
          CONNECT
        </StyledPrimaryButton>
      )}

      {!navLinks && context.signerAddress && (
        <Flex justify='center' align='center' zIndex={5}>
          <Popover placement='left'>
            <PopoverTrigger>
              <Button
                h='auto'
                fontWeight='normal'
                bg={theme.colors.blackDark}
                _hover={{ backgroundColor: 'greyLight' }}
                p={{ base: 0, md: 3 }}
              >
                <Text
                  px={2}
                  display={{ base: 'none', md: 'flex' }}
                  fontFamily='jetbrains'
                  color='red'
                >
                  {getAccountString(context.signerAddress)}
                </Text>
              </Button>
            </PopoverTrigger>
            <PopoverContent bg='none' w='auto'>
              <Button
                onClick={() => {
                  disconnect();
                  window.location.reload();
                }}
                variant='primary'
                mt='0'
              >
                Disconnect
              </Button>
            </PopoverContent>
          </Popover>
        </Flex>
      )}

      {windowWidth > 1200 && navLinks && (
        <Flex
          minWidth='50%'
          direction='row'
          justifyContent='space-around'
          fontSize='1.3rem'
          color='red'
        >
          <Link href='/#manifesto' passHref>
            <Text cursor='pointer' _hover={{ textDecoration: 'underline' }}>
              Manifesto
            </Text>
          </Link>
          <Link href='/#services' passHref>
            <Text cursor='pointer' _hover={{ textDecoration: 'underline' }}>
              Services
            </Text>
          </Link>
          <Link href='/#portfolio' passHref>
            <Text cursor='pointer' _hover={{ textDecoration: 'underline' }}>
              Portfolio
            </Text>
          </Link>
          <Link href='/join' passHref>
            <Text cursor='pointer' _hover={{ textDecoration: 'underline' }}>
              Join
            </Text>
          </Link>
          <Link href='/hire' passHref>
            <Text cursor='pointer' _hover={{ textDecoration: 'underline' }}>
              Hire
            </Text>
          </Link>
        </Flex>
      )}

      {windowWidth < 1200 && navLinks && (
        <>
          <Flex align='center' height='8rem'>
            <Button
              fontSize='2rem'
              onClick={() => onOpen((o) => !o)}
              variant='link'
              ml={{ base: '0.5rem', sm: '1rem' }}
              zIndex={7}
            >
              {!isOpen && (
                <span style={{ width: '25px', color: theme.colors.red }}>
                  <i className='fas fa-bars' />
                </span>
              )}
              {isOpen && (
                <span style={{ width: '25px', color: theme.colors.red }}>
                  <i className='fas fa-times' />
                </span>
              )}
            </Button>
          </Flex>
          <Flex
            zIndex={6}
            position='fixed'
            left='0'
            top='0'
            bg='black'
            h='100%'
            w='100%'
            direction='column'
            justify='center'
            align='center'
            transition='all .8s ease-out'
            pointerEvents={isOpen ? 'all' : 'none'}
            css={{
              clipPath: isOpen
                ? 'circle(calc(100vw + 100vh) at 90% -10%)'
                : 'circle(100px at 90% -20%)'
            }}
          >
            {navItems.map((item, index) => {
              return (
                <StyledButton
                  key={index}
                  onClick={() => {
                    onOpen((o) => !o);
                    document.location.href = item.href;
                  }}
                  my='1rem'
                  variant='link'
                  color={`${theme.colors.red}`}
                  fontWeight='normal'
                  fontSize='1.5rem'
                >
                  {item.name}
                </StyledButton>
              );
            })}

            <ChakraLink
              href='https://discord.gg/CanD2WcK7W'
              isExternal
              _hover={{}}
            ></ChakraLink>
          </Flex>
        </>
      )}
    </Flex>
  );
};
