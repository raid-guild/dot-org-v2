import { ChakraProvider, Flex } from '@chakra-ui/react';
import { theme } from '../themes/theme';

export const Layout = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <Flex
        height='100%'
        width='100%'
        direction='column'
        alignItems='center'
        justifyContent='center'
        padding='1rem'
        background='linear-gradient(328deg, rgba(10,10,10,1) 20%, rgba(130,46,166,1) 43%, rgba(173,36,66,1) 58%, rgba(10,10,10,1) 80%)'
      >
        {children}
      </Flex>
    </ChakraProvider>
  );
};
