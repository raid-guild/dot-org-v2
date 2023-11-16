import styled from '@emotion/styled';
import {
  Box,
  Button,
  Castle,
  Flex,
  HStack,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  VStack,
  Wizard2,
  defaultTheme,
  useBreakpointValue,
} from '@raidguild/design-system';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaBars, FaChevronDown, FaChevronRight, FaTimes } from 'react-icons/fa';
import { NavMenuData } from '../../utils/constants';
import Link from '../atoms/ChakraNextLink';
import { ConnectWallet } from '../atoms/ConnectWallet';
import SubMenu from './SubMenuMobile';
import GuildLogo from '../../assets/illustrations/raidguild.webp';
// import PopoverMenu from './PopOverMenu';
import NavLink from './NavLink';

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
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Join', href: '/join/1' },
  { name: 'Hire', href: '/hire/1' },
];

const Nav = () => {
  const [isOpen, onOpen] = useState<boolean>(false);
  const hideOnBase = useBreakpointValue({ base: true, lg: false });
  const router = useRouter();
  const basePath = router.route.split('/')[1];
  const [isServicesOpen, setServicesOpen] = useState(false);

  return (
    <HStack justifyContent='space-between' width='full' color='white' id='Navigation Bar'>
      <Link href='/' passHref zIndex={100}>
        <Image src={GuildLogo.src} alt='Raidguild Logo / Home Badge' maxWidth='200px' />
      </Link>
      {!hideOnBase ? (
        <HStack justifyContent='space-between' w='50vw'>
          <HStack spacing={8} alignItems='center' w='full'>
            {navItems.map((item) =>
              item.name === 'Services' ? (
                <Popover trigger='hover' placement='bottom-start' key='services'>
                  <PopoverTrigger>
                    <span>
                      <NavLink item={item} basePath={basePath} key={item.name} />
                    </span>
                  </PopoverTrigger>
                  <PopoverContent bg='black' borderColor={defaultTheme.colors.primary[500]} borderRadius={2}>
                    <PopoverArrow bg='black' shadowColor={defaultTheme.colors.primary[500]} />

                    <PopoverBody>
                      <VStack
                        gap={1}
                        justify='flex-start'
                        align='flex-start'
                        fontFamily='mono'
                        fontWeight='bold'
                        textTransform='uppercase'
                        fontSize={18}>
                        <Popover trigger='hover' placement='end-start' key='services'>
                          <PopoverTrigger>
                            <Box
                              display='flex'
                              flexDir='row'
                              alignItems='center'
                              justifyItems='center'
                              gap={8}
                              _hover={{ bgColor: '#330F00', textColor: defaultTheme.colors.primary[500] }}
                              w='full'
                              p={2.5}>
                              <Castle fontSize={28} />
                              Development
                              <Spacer />
                              <FaChevronRight fontSize={12} />
                            </Box>
                          </PopoverTrigger>
                          <PopoverContent bg='black' borderColor={defaultTheme.colors.primary[500]} borderRadius={2}>
                            <VStack
                              gap={1}
                              justify='flex-start'
                              align='flex-start'
                              fontFamily='mono'
                              fontWeight='bold'
                              textTransform='uppercase'
                              fontSize={18}>
                              {NavMenuData[0].items.map((menuItem: Record<string, string>) => (
                                <Link
                                  fontFamily='monospace'
                                  textTransform='full-size-kana'
                                  key={menuItem.name}
                                  fontWeight='normal'
                                  display='flex'
                                  flexDir='row'
                                  alignItems='center'
                                  justifyItems='center'
                                  href={`/services/${menuItem.slug}`}
                                  gap={8}
                                  _hover={{ bgColor: '#330F00', textColor: defaultTheme.colors.primary[500] }}
                                  w='full'
                                  py={2.5}
                                  px={3.5}>
                                  {menuItem.name}
                                </Link>
                              ))}
                            </VStack>
                          </PopoverContent>
                        </Popover>
                        <Popover trigger='hover' placement='end-start' key='services'>
                          <PopoverTrigger>
                            <Box
                              display='flex'
                              flexDir='row'
                              alignItems='center'
                              justifyItems='center'
                              gap={8}
                              _hover={{ bgColor: '#330F00', textColor: defaultTheme.colors.primary[500] }}
                              w='full'
                              p={2.5}>
                              <Castle fontSize={28} />
                              Design
                              <Spacer />
                              <FaChevronRight fontSize={12} />
                            </Box>
                          </PopoverTrigger>
                          <PopoverContent bg='black' borderColor={defaultTheme.colors.primary[500]} borderRadius={2}>
                            <VStack
                              gap={1}
                              justify='flex-start'
                              align='flex-start'
                              fontFamily='mono'
                              fontWeight='bold'
                              textTransform='uppercase'
                              fontSize={18}>
                              {NavMenuData[1].items.map((menuItem: Record<string, string>) => (
                                <Link
                                  fontFamily='monospace'
                                  textTransform='full-size-kana'
                                  key={menuItem.name}
                                  display='flex'
                                  flexDir='row'
                                  alignItems='center'
                                  justifyItems='center'
                                  href={`/services/${menuItem.slug}`}
                                  gap={8}
                                  _hover={{ bgColor: '#330F00', textColor: defaultTheme.colors.primary[500] }}
                                  w='full'
                                  py={2.5}
                                  px={3.5}>
                                  {menuItem.name}
                                </Link>
                              ))}
                            </VStack>
                          </PopoverContent>
                        </Popover>
                        <Popover trigger='hover' placement='end-start' key='services'>
                          <PopoverTrigger>
                            <Box
                              display='flex'
                              flexDir='row'
                              alignItems='center'
                              justifyItems='center'
                              gap={8}
                              _hover={{ bgColor: '#330F00', textColor: defaultTheme.colors.primary[500] }}
                              w='full'
                              p={2.5}>
                              <Wizard2 fontSize={28} />
                              Development
                              <Spacer />
                              <FaChevronRight fontSize={12} />
                            </Box>
                          </PopoverTrigger>
                          <PopoverContent bg='black' borderColor={defaultTheme.colors.primary[500]} borderRadius={2}>
                            <VStack
                              gap={1}
                              justify='flex-start'
                              align='flex-start'
                              fontFamily='mono'
                              fontWeight='bold'
                              textTransform='uppercase'
                              fontSize={18}>
                              {NavMenuData[2].items.map((menuItem: Record<string, string>) => (
                                <Link
                                  fontFamily='monospace'
                                  textTransform='full-size-kana'
                                  key={menuItem.name}
                                  display='flex'
                                  flexDir='row'
                                  alignItems='center'
                                  justifyItems='center'
                                  href={`/services/${menuItem.slug}`}
                                  gap={8}
                                  _hover={{ bgColor: '#330F00', textColor: defaultTheme.colors.primary[500] }}
                                  w='full'
                                  py={2.5}
                                  px={3.5}>
                                  {menuItem.name}
                                </Link>
                              ))}
                            </VStack>
                          </PopoverContent>
                        </Popover>
                      </VStack>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              ) : (
                <NavLink item={item} basePath={basePath} key={item.name} />
              ),
            )}
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
            align='flex-start'
            p={8}
            textDecoration='none !important'
            hidden={!isOpen}
            transition='all .8s ease-out'
            pointerEvents={isOpen ? 'all' : 'none'}
            css={{
              clipPath: isOpen ? 'circle(calc(100vw + 100vh) at 90% -10%)' : 'circle(100px at 90% -20%)',
            }}>
            {navItems.map((item) => {
              return (
                <Link
                  as='text'
                  href={item.href}
                  key={item.name}
                  borderRadius={0}
                  w='full'
                  textAlign='left'
                  textTransform='uppercase'
                  borderBottom='0.5px solid #FFFFFF30'
                  p={2.5}
                  textColor='white'
                  textDecor='none'
                  display='flex'
                  gap={4}
                  flexDir='row'
                  _hover={
                    item.name !== 'Services'
                      ? { bgColor: '#330F00', textColor: defaultTheme.colors.primary[500] }
                      : { bgColor: 'none' }
                  }
                  height='max-content'
                  my='1rem'
                  fontFamily='monospace'
                  fontWeight='bold'
                  fontSize={18}>
                  {item.name === 'Services' ? (
                    <Box as='text' w='full' gap={2}>
                      <Box
                        as='text'
                        w='full'
                        onClick={() => setServicesOpen(!isServicesOpen)}
                        display='flex'
                        flexDir='row'
                        justifyContent='center'
                        alignItems='center'>
                        {item.name}
                        <Spacer />
                        {isServicesOpen ? <FaChevronDown fontSize={18} /> : <FaChevronRight fontSize={18} />}
                      </Box>
                      {isServicesOpen && <SubMenu NavMenu={NavMenuData[0]} />}
                      {isServicesOpen && <SubMenu NavMenu={NavMenuData[1]} />}
                      {isServicesOpen && <SubMenu NavMenu={NavMenuData[2]} />}
                    </Box>
                  ) : (
                    <Box as='text'> {item.name}</Box>
                  )}

                  <Spacer />
                </Link>
              );
            })}
            <ConnectWallet />
          </Flex>
        </Flex>
      )}
    </HStack>
  );
};

export default Nav;
