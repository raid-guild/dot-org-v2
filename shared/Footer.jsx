import { Flex, HStack, Link, Image } from '@chakra-ui/react';
import { theme } from '../themes/theme';

export const Footer = () => {
  return (
    <Flex
      direction='row'
      alignItems='center'
      justifyContent='space-evenly'
      padding='2rem'
      w='100%'
    >
      <HStack
        width='50%'
        justifyContent='space-evenly'
        fontFamily={`${theme.fonts.rubik}`}
        color={`${theme.colors.red}`}
        fontSize={{ base: '.6rem', lg: '1.3rem' }}
      >
        <Link>Discord</Link>
        <Link>Github</Link>
      </HStack>
      <Image
        src='/assets/swords.png'
        alt='RaidGuild'
        width={{ base: '50px' }}
      />
      <HStack
        width='50%'
        justifyContent='space-evenly'
        fontFamily={`${theme.fonts.rubik}`}
        color={`${theme.colors.red}`}
        fontSize={{ base: '.6rem', lg: '1.3rem' }}
      >
        <Link>Twitter</Link>
        <Link>Handbook</Link>
      </HStack>
    </Flex>
  );
};
