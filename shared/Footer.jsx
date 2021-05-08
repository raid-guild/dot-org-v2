import { Flex, HStack, Link } from '@chakra-ui/layout';
import { theme } from '../theme';

export const Footer = () => {
  return (
    <Flex
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      padding='2rem'
    >
      <img src='/assets/raidguild__logo.png' alt='RaidGuild' width='250px' />
      <HStack
        width='50%'
        justifyContent='space-evenly'
        fontFamily={`${theme.font.rubik}`}
        color={`${theme.colors.red}`}
        fontSize='1.5rem'
      >
        <Link>Hire Us</Link>
        <Link>Join Us</Link>
        <Link>HandBook</Link>
        <Link>DAO</Link>
      </HStack>
    </Flex>
  );
};
