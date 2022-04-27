import { ChakraProvider, Flex } from '@chakra-ui/react';
import AppContextProvider from '../context/AppContext';
import { theme } from '../themes/theme';

export const Layout = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <AppContextProvider>
        <Flex
          background='radial-gradient(97.27% 170.54% at 98.7% 2.73%, #24003A 0%, rgba(0, 0, 0, 0) 100%),
        radial-gradient(100% 350.19% at 100% 100%, #170011 0%, rgba(23, 0, 17, 0) 100%),
        radial-gradient(50% 175.1% at 0% 100%, #130000 0%, rgba(31, 0, 0, 0) 100%),
        radial-gradient(50% 175.1% at 0% 0%, #330F00 0%, rgba(51, 15, 0, 0) 100%),
        linear-gradient(0deg, #000000, #000000)'
        >
          <Flex maxW='100rem' py='1rem' mx='auto' overflowX='hidden'>
            {children}
          </Flex>
        </Flex>
      </AppContextProvider>
    </ChakraProvider>
  );
};
