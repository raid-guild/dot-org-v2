import {
  Box,
  Button,
  Castle,
  Flex,
  HStack,
  Image,
  Knight,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Stack,
  VStack,
  Wizard2,
  defaultTheme,
  useBreakpointValue,
} from '@raidguild/design-system';
import * as Fathom from 'fathom-client';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useState } from 'react'; // Import React
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

const createMobileNavItemStyle = (name: string) => {
  return {
    key: name,
    borderRadius: 0,
    width: 'full',
    textAlign: 'left',
    textTransform: 'uppercase',
    borderBottom: '0.5px solid #FFFFFF30',
    padding: 2.5,
    textDecoration: 'none',
    display: 'flex',
    gap: 2,
    flexDirection: 'row',
    _hover:
      name !== 'Services'
        ? {
            bgColor: `${defaultTheme.colors.primary[500]}20`,
            textColor: defaultTheme.colors.primary[500],
          }
        : { bgColor: 'none' },
    height: 'max-content',
    marginY: '1rem',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: 18,
  };
};

const DesktopNav = ({ basePath }: { basePath: string }) => {
  return (
    <HStack justifyContent='space-around' w='full'>
      <HStack spacing={8} alignItems='center' w='full' justifyContent='center'>
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
                    {_.map(NavMenuData, (menuItem, index) => (
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
                            {menuItem.category === 'Development' && <Castle fontSize={28} />}
                            {menuItem.category === 'Design' && <Knight fontSize={28} />}
                            {menuItem.category === 'Web3' && <Wizard2 fontSize={28} />}
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
                            {_.map(menuItem.items, (subMenuItem) => (
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
  );
};

const MobileNav = ({ isOpen, setIsOpen }: any) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  return (
    <Stack zIndex={95}>
      <HStack align='center' justifyContent='space-around' height='8rem' w='100%' position='relative'>
        <Spacer />
        <Button
          fontSize='2rem'
          right='3rem'
          position='fixed'
          onClick={() => {
            setIsOpen(!isOpen);
            setIsServicesOpen(false);
            setOpenSubMenu(null);
          }}
          variant='link'
          zIndex={100}>
          <span style={{ width: '25px', color: defaultTheme.colors.red[500] }}>
            {!isOpen ? <FaBars /> : <FaTimes />}
          </span>
        </Button>
      </HStack>
      <VStack
        zIndex={95}
        position='fixed'
        left='0'
        top='0'
        bg='black'
        maxH='max-content'
        minH='100vh'
        w='full'
        pt='150px'
        color='white'
        _focus={{ overflow: 'auto' }}
        direction='column'
        justify='flex-start'
        align='flex-start'
        px={8}
        textDecoration='none !important'
        hidden={!isOpen}
        pointerEvents={isOpen ? 'all' : 'none'}>
        {navItems.map((item) =>
          item.name === 'Services' ? (
            <>
              <Box
                as='div'
                gap={2}
                sx={createMobileNavItemStyle(item.name)}
                key={item.name}
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
                _.map(NavMenuData, (menuItem, subIndex) => (
                  <SubMenu
                    NavMenu={menuItem}
                    SubMenuHandler={setOpenSubMenu}
                    openSubMenu={openSubMenu}
                    id={subIndex}
                    key={subIndex}
                  />
                ))}
            </>
          ) : (
            <Box as={Link} href={item.href} key={item.name} sx={createMobileNavItemStyle(item.name)}>
              {item.name}
            </Box>
          ),
        )}
        <ConnectWallet />
      </VStack>
    </Stack>
  );
};
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const basePath = router.route.split('/')[1];
  const isMobile = useBreakpointValue({ base: true, xl: false });
  return (
    <HStack
      zIndex={100}
      width='100%'
      color='white'
      id='Navigation Bar'
      position='relative'
      px={{ base: 0, xl: '4rem' }}
      my={{ base: 0, xl: '3rem' }}>
      <Link
        href='/'
        zIndex={100}
        w={isMobile ? '100%' : 'max-content'}
        position={isOpen ? 'fixed' : 'relative'}
        left='50px'>
        <Image src={GuildLogo.src} alt='Raidguild Logo / Home Badge' minW='100px' maxW='200px' />
      </Link>
      <Box w='100%'>
        {isMobile ? <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} /> : <DesktopNav basePath={basePath} />}
      </Box>
    </HStack>
  );
};

export default Nav;
