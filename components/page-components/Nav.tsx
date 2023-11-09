import styled from '@emotion/styled';
import { Box, Button, Flex, HStack, Image, defaultTheme, useBreakpointValue } from '@raidguild/design-system';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from '../atoms/ChakraNextLink';
import { ConnectWallet } from '../atoms/ConnectWallet';

import GuildLogo from '../../assets/illustrations/raidguild.webp';

const StyledButton = styled(Button)`
  &::after {
    box-sizing: inherit;
    transition: all ease-in-out 0.2s;
    background: none repeat scroll 0 0 ${defaultTheme.colors.red[500]};
    content: '';
    display: block;
    height: 2px;
    width: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    font-family: ${defaultTheme.fonts.rubik};
  }
  &:hover {
    text-decoration: none;
    ::after {
      width: 100%;
    }
  }
`;

const navItems = [
  { name: 'Blog', href: '/state-of-the-raid' },
  { name: 'Services', href: '/#services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Join', href: '/join/1' },
  { name: 'Hire', href: '/hire/1' },
];

const Nav = () => {
  const [isOpen, onOpen] = useState<boolean>(false);
  const hideOnBase = useBreakpointValue({ base: true, lg: false });

  return (
    <HStack justifyContent='space-between' width='full' color='white' id='Navigation Bar'>
      <Link href='/' passHref>
        <Image src={GuildLogo.src} alt='Raidguild Logo / Home Badge' maxWidth='200px' />
      </Link>
      {!hideOnBase ? (
        <HStack justifyContent='space-between' w='50vw'>
          <HStack spacing={8} alignItems='center' w='full'>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                id={item.name}
                _hover={{ opacity: '80%' }}
                fontWeight={600}
                textColor={defaultTheme.colors.red[500]}>
                {item.name}
              </Link>
            ))}
          </HStack>
          <ConnectWallet />
        </HStack>
      ) : (
        <Flex>
          <Flex align='center' height='8rem'>
            <Button fontSize='2rem' onClick={() => onOpen((o) => !o)} variant='link' zIndex={7}>
              <span style={{ width: '25px', color: defaultTheme.colors.red[500] }}>
                {!isOpen ? <FaBars /> : <FaTimes />}
              </span>
            </Button>
          </Flex>
          <Flex
            zIndex={6}
            position='fixed'
            left='0'
            top='0'
            bg='black'
            h='100%'
            w='full'
            direction='column'
            justify='center'
            align='center'
            hidden={!isOpen}
            transition='all .8s ease-out'
            pointerEvents={isOpen ? 'all' : 'none'}
            css={{
              clipPath: isOpen ? 'circle(calc(100vw + 100vh) at 90% -10%)' : 'circle(100px at 90% -20%)',
            }}>
            {navItems.map((item) => {
              return (
                <StyledButton
                  key={item.name}
                  onClick={() => {
                    onOpen((o) => !o);
                    document.location.href = item.href;
                  }}
                  my='1rem'
                  variant='link'
                  color={`${defaultTheme.colors.red[500]}`}
                  fontWeight='normal'
                  fontSize='1.5rem'>
                  {item.name}
                </StyledButton>
              );
            })}
            <Box mt={3}>
              <ConnectWallet />
            </Box>
          </Flex>
        </Flex>
      )}
    </HStack>
  );
};

export default Nav;
