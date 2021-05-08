import { ChakraProvider, Flex } from '@chakra-ui/react';
import { theme } from '../theme';

export const Layout = ({ children }) => {
  return (
    <ChakraProvider>
      <Flex
        height='100%'
        width='100%'
        direction='column'
        alignItems='center'
        justifyContent='center'
        padding='1rem'
        backgroundColor={`${theme.colors.blackDark}`}
      >
        {children}
      </Flex>
    </ChakraProvider>
  );
};
