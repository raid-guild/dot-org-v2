import { VStack, Box, Text, Spacer, Link, defaultTheme, Castle, Knight, Wizard2 } from '@raidguild/design-system';
import { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { NavMenuData } from '../../utils/constants';

const SubMenu = ({ NavMenu }: { NavMenu: (typeof NavMenuData)[0] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <VStack
      gap={1}
      justify='flex-start'
      align='flex-start'
      fontFamily='mono'
      fontWeight='bold'
      w='full'
      textTransform='uppercase'
      fontSize={18}>
      <Box
        fontFamily='monospace'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        textTransform='full-size-kana'
        key={NavMenu.category}
        display='flex'
        flexDirection='row'
        alignItems='center'
        justifyContent='center'
        gap={8}
        color={isMenuOpen ? defaultTheme.colors.primary[500] : 'white'}
        _hover={{ bgColor: '#330F00', textColor: defaultTheme.colors.primary[500] }}
        w='full'
        py={2.5}
        px={3.5}>
        {NavMenu.category === 'Development' && <Castle fontSize={28} />}
        {NavMenu.category === 'Design' && <Knight fontSize={28} />}
        {NavMenu.category === 'Web3 Specifics' && <Wizard2 fontSize={28} />}

        {NavMenu.category}
        <Spacer />
        {isMenuOpen ? <FaChevronDown fontSize={18} /> : <FaChevronRight fontSize={14} />}
      </Box>
      <Box hidden={!isMenuOpen} w='full'>
        {NavMenu.items.map((menuItem) => (
          <Link
            fontFamily='monospace'
            justifyContent='flex-start'
            alignItems='flex-start'
            textTransform='full-size-kana'
            key={menuItem.name}
            display='flex'
            flexDirection='row'
            mx={4}
            href={`/services/${menuItem.slug}`}
            gap={8}
            _hover={{ bgColor: '#330F00', textColor: defaultTheme.colors.primary[500] }}
            w='full'
            py={2.5}
            px={3.5}>
            {menuItem.name}
          </Link>
        ))}
      </Box>
    </VStack>
  );
};

export default SubMenu;
