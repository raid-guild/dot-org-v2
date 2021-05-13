import { Flex, HStack, Link } from '@chakra-ui/layout';
import { theme } from '../theme';

export const Footer = () => {
  return (
    <Flex
      direction='row'
      alignItems='center'
      justifyContent='space-evenly'
      padding='2rem'
      mt='2rem'
    >
      <HStack
        width='50%'
        justifyContent='space-evenly'
        fontFamily={`${theme.font.rubik}`}
        color={`${theme.colors.red}`}
        fontSize='1.5rem'
      >
        <Link>Discord</Link>
        <Link>Github</Link>
        <Link>Twitter</Link>
      </HStack>
      <img src='/assets/swords.png' alt='RaidGuild' width='100px' />
      <HStack
        width='50%'
        justifyContent='space-evenly'
        fontFamily={`${theme.font.rubik}`}
        color={`${theme.colors.red}`}
        fontSize='1.5rem'
      >
        <Link>HireUs</Link>
        <Link>JoinUs</Link>
        <Link>HandBook</Link>
        <Link>DAO</Link>
      </HStack>
    </Flex>
  );
};
