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
  defaultTheme,
  useBreakpointValue,
} from '@raidguild/design-system';
import * as Fathom from 'fathom-client';
import _ from 'lodash'; // Import lodash
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaBars, FaChevronDown, FaChevronRight, FaTimes } from 'react-icons/fa';

import GuildLogo from '../../assets/illustrations/raidguild.webp';
import { NavMenuData } from '../../utils/constants';
import Link from '../atoms/ChakraNextLink';
import { ConnectWallet } from '../atoms/ConnectWallet';
import NavLink from './NavLink';
import SubMenu from './SubMenuMobile';

const navItems = [
  { name: 'Blog', href: '/state-of-the-raid' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Join', href: '/join/1' },
  { name: 'Hire', href: '/hire/1' },
];

const Nav = () => {
  const [isOpen, onOpen] = useState(false);
  const hideOnBase = useBreakpointValue({ base: true, lg: false });
  const router = useRouter();
  const basePath = router.route.split('/')[1];
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<null | number>(null);

  return (
    <HStack justifyContent='space-between' width='full' color='white' id='Navigation Bar'>
      <Link href='/' zIndex={100}>
        <Image src={GuildLogo.src} alt='Raidguild Logo / Home Badge' maxWidth='200px' />
      </Link>
      {!hideOnBase ? (
        <HStack justifyContent='space-between' w='50vw'>
          <HStack spacing={8} alignItems='center' w='full'>
            {_.map(navItems, (item) =>
              item.name === 'Services' ? (
                <Popover trigger='hover' placement='bottom-start' key='services'>
                  <PopoverTrigger>
                    <Box
                      _hover={{
                        opacity: '80%',
                        borderBottom: `2px solid ${defaultTheme.colors.red[500]}`,
                      }}
                      borderBottom={
                        item.href.split('/')[1] === basePath ? `2px solid ${defaultTheme.colors.red[500]}` : ''
                      }>
                      <NavLink item={item} basePath={basePath} key={item.name} />
                    </Box>
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
                        {/* Code for Services menu */}
                        {_.map(NavMenuData, (menuItem: Record<string, string>, index: any) => (
                          <Popover trigger='hover' placement='end-start' key={`services-${index}`}>
                            <PopoverTrigger>
                              <Flex
                                display='flex'
                                flexDir='row'
                                alignItems='center'
                                justifyItems='center'
                                gap={8}
                                _hover={{
                                  bgColor: `${defaultTheme.colors.primary[500]}40`,
                                  textColor: defaultTheme.colors.primary[500],
                                }}
                                w='full'
                                p={2.5}>
                                <Castle fontSize={28} />
                                {menuItem.category}
                                <Spacer />
                                <FaChevronRight fontSize={12} />
                              </Flex>
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
                                {_.map(menuItem.items, (subMenuItem: Record<string, string>) => (
                                  <Link
                                    fontFamily='monospace'
                                    textTransform='full-size-kana'
                                    key={subMenuItem.name}
                                    display='flex'
                                    flexDir='row'
                                    alignItems='center'
                                    justifyItems='center'
                                    href={`/services/${subMenuItem.slug}`}
                                    onClick={() => Fathom.trackEvent(`Service ${subMenuItem.slug} Clicked`)}
                                    gap={8}
                                    _hover={{
                                      bgColor: `${defaultTheme.colors.primary[500]}40`,
                                      textColor: defaultTheme.colors.primary[500],
                                    }}
                                    w='full'
                                    py={2.5}
                                    px={3.5}>
                                    {subMenuItem.name}
                                  </Link>
                                ))}
                              </VStack>
                            </PopoverContent>
                          </Popover>
                        ))}
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
        <Flex position={!isOpen ? 'absolute' : 'fixed'} zIndex={100}>
          <HStack align='center' height='8rem' minW='88vw'>
            <Link href='/' zIndex={7} w='full' hidden={!isOpen}>
              <Image src={GuildLogo.src} alt='Raidguild Logo / Home Badge' maxWidth='200px' />
            </Link>
            <Spacer />
            <Button
              fontSize='2rem'
              onClick={() => {
                onOpen((o) => !o);
                setIsServicesOpen(false);
                setOpenSubMenu(null);
              }}
              variant='link'
              zIndex={7}
              mr={8}>
              <span style={{ width: '25px', color: defaultTheme.colors.red[500] }}>
                {!isOpen ? <FaBars /> : <FaTimes />}
              </span>
            </Button>
          </HStack>
          <VStack
            zIndex={6}
            position='fixed'
            left='0'
            top='0'
            bg='black'
            maxH='max-content'
            minH='100vh'
            w='full'
            pt={32}
            color='white'
            _focus={{ overflow: 'auto' }}
            direction='column'
            justify='flex-start'
            align='flex-start'
            px={8}
            textDecoration='none !important'
            hidden={!isOpen}
            pointerEvents={isOpen ? 'all' : 'none'}>
            {navItems.map((item) => {
              return (
                <Link
                  as='text'
                  href={item?.href}
                  key={item.name}
                  borderRadius={0}
                  w='full'
                  onClick={() => router.push(item.href)}
                  textAlign='left'
                  textTransform='uppercase'
                  borderBottom='0.5px solid #FFFFFF30'
                  p={2.5}
                  textDecor='none'
                  display='flex'
                  gap={2}
                  flexDir='row'
                  _hover={
                    item.name !== 'Services'
                      ? {
                          bgColor: `${defaultTheme.colors.primary[500]}20`,
                          textColor: defaultTheme.colors.primary[500],
                        }
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
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        display='flex'
                        flexDir='row'
                        justifyContent='center'
                        alignItems='center'
                        my={4}>
                        {item.name}
                        <Spacer />
                        {isServicesOpen ? <FaChevronDown fontSize={18} /> : <FaChevronRight fontSize={18} />}
                      </Box>
                      {isServicesOpen &&
                        _.map(NavMenuData, (menuItem: any, index: any) => (
                          <SubMenu
                            NavMenu={menuItem}
                            SubMenuHandler={setOpenSubMenu}
                            openSubMenu={openSubMenu}
                            id={index}
                            key={index}
                          />
                        ))}
                    </Box>
                  ) : (
                    <Box as='text'> {item.name}</Box>
                  )}
                </Link>
              );
            })}
            <ConnectWallet />
          </VStack>
        </Flex>
      )}
    </HStack>
  );
};

export default Nav;
