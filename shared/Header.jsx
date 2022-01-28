import { useState } from 'react';
import { Button, Flex, Image, Link as ChakraLink, Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router'

import { theme } from '../themes/theme';



const StyledAnimationReferenceElement = styled('div')`
  width: 168px;
  height: 44px;
  @media only screen and (max-width: 600px) {
    width: 150px;
    height: 40px;
  }
`


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

const navItems = [
  { name: 'Manifesto', href: '/#manifesto' },
  { name: 'Services', href: '/#services' },
  { name: 'Portfolio', href: '/#portfolio' },
  { name: 'Join', href: '/#culture' },
  { name: 'Hire', href: '/#services' }
];

export const Header = ({ windowWidth }) => {
  const [isOpen, onOpen] = useState(false);
  const router = useRouter()
  return (
    <Flex w="100%" h={{ base: '4rem' }} color="white" fontFamily="spaceMono" justify="space-between" align="center" alignSelf="flex-start" zIndex={5}>
      <Image
        src={theme.images.raidguild}
        fallbackSrc="/assets/raidguild__logo.png"
        alt="RaidGuild"
        width={{ base: '150px', lg: '168px' }}
        onClick={() => (window.location.href = '/')}
        cursor="pointer"
      />
      {windowWidth > 1200 && (
        <Flex minWidth="50%" direction="row" justifyContent="space-around" fontSize="1.3rem" color="red">
          <ChakraLink href="/#manifesto">Manifesto</ChakraLink>
          <ChakraLink href="/#services">Services</ChakraLink>
          <ChakraLink href="/#portfolio">Portfolio</ChakraLink>
          <ChakraLink href="/join" target="_blank" rel="noopener noreferrer">
            Join
          </ChakraLink>
          <ChakraLink href="https://hireus.raidguild.org" target="_blank" rel="noopener noreferrer">
            Hire
          </ChakraLink>
        </Flex>
      )}

      {windowWidth < 1200 && (
        <>
          <Flex align="center" height="8rem">
            <Button fontSize="2rem" onClick={() => onOpen((o) => !o)} variant="link" ml={{ base: '0.5rem', sm: '1rem' }} zIndex={7}>
              {!isOpen && (
                <span style={{ width: '25px', color: theme.colors.red }}>
                  <i className="fas fa-bars" />
                </span>
              )}
              {isOpen && (
                <span style={{ width: '25px', color: theme.colors.red }}>
                  <i className="fas fa-times" />
                </span>
              )}
            </Button>
          </Flex>
          <Flex
            zIndex={6}
            position="fixed"
            left="0"
            top="0"
            bg="black"
            h="100%"
            w="100%"
            direction="column"
            justify="center"
            align="center"
            transition="all .8s ease-out"
            pointerEvents={isOpen ? 'all' : 'none'}
            css={{
              clipPath: isOpen ? 'circle(calc(100vw + 100vh) at 90% -10%)' : 'circle(100px at 90% -20%)',
            }}
          >
            {navItems.map((item, index) => {
              return (
                <StyledButton
                  key={index}
                  onClick={() => {
                    onOpen((o) => !o)
                    document.location.href = item.href
                  }}
                  my="1rem"
                  variant="link"
                  color={`${theme.colors.red}`}
                  fontWeight="normal"
                  fontSize="1.5rem"
                >
                  {item.name}
                </StyledButton>
              )
            })}

            <ChakraLink href="https://discord.gg/CanD2WcK7W" isExternal _hover={{}}></ChakraLink>
          </Flex>
        </>
      )}
    </Flex>
  )
};
