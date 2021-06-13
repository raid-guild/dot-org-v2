import { useState } from 'react';
import { Box, Button, Flex, Image, Link as ChakraLink } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { HamburgerIcon } from '../icons/HamburgerIcon';
import { theme } from '../themes/theme';

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

const navItems = ['Home', 'Hire Us', 'Join Us', 'HandBook', 'DAO'];

export const Header = () => {
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
      <Image
        src='/assets/raidguild__logo.png'
        alt='RaidGuild'
        width={{ base: '150px', lg: '250px' }}
      />

      <Flex
        minWidth='50%'
        direction='row'
        justifyContent='space-around'
        fontSize='1.3rem'
        color='red'
      >
        <ChakraLink>Manifesto</ChakraLink>
        <ChakraLink>Services</ChakraLink>
        <ChakraLink>Portfolio</ChakraLink>
        <ChakraLink>Join</ChakraLink>
        <ChakraLink>Hire</ChakraLink>
      </Flex>

      {/* <Flex
        mr='1rem'
        align='center'
        height='8rem'
        transition='width 1s ease-out'
      >
        <Button
          onClick={() => onOpen((o) => !o)}
          variant='link'
          ml={{ base: '0.5rem', sm: '1rem' }}
          zIndex={7}
        >
          <HamburgerIcon
            boxSize={{ base: '2rem', sm: '2.75rem' }}
            transition='all 1s ease-out'
            _hover={{
              transition: 'all 1s ease-out',
              transform: 'rotateZ(90deg)'
            }}
            color={`${theme.colors.red}`}
          />
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
        transition='all 2s ease-out'
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
                onOpen(false);
              }}
              transition='all 0.5s ease 0.4s'
              my='1rem'
              variant='link'
              color={`${theme.colors.red}`}
              fontWeight='normal'
              fontSize='1.5rem'
              fontFamily={`${theme.fonts.rubik}`}
            >
              {item}
            </StyledButton>
          );
        })}

        <ChakraLink
          href='https://discord.gg/CanD2WcK7W'
          isExternal
          _hover={{}}
        ></ChakraLink>
      </Flex> */}
    </Flex>
  );
};
