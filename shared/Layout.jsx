import { ChakraProvider, Flex } from "@chakra-ui/react";
import AppContextProvider from "../context/AppContext";
import { theme } from "../themes/theme";
import { Toaster } from "react-hot-toast";

export const Layout = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <AppContextProvider>{children}</AppContextProvider>
      <Toaster/>
    </ChakraProvider>
  );
};
