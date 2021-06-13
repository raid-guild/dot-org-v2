import { ChakraProvider, Flex } from '@chakra-ui/react';
import { theme } from '../themes/theme';

export const Layout = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <Flex
        overflowX='hidden'
        background='linear-gradient(328deg, rgba(10,10,10,1) 25%, rgba(130,46,166,1) 43%, rgba(173,36,66,1) 58%, rgba(10,10,10,1) 90%)'
      >
        {children}
      </Flex>
    </ChakraProvider>
  );
};
