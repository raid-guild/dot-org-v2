import { Box, HStack } from "@chakra-ui/react";
import Nav from "../page-components/Nav";
import { Footer } from "../../shared/Footer";

export default function CMSPageTemplate(props) {
  return (
    <>
      <Box bgGradient='linear(to-l, #2B0000 0%, #3D0610 29.17%, #5A1049 61.98%, #461881 100%)' sx={{padding: `2rem`}}>
        <Nav />
      </Box>
      <Box background="blackDark">
      {props.children}
      </Box>
      <Footer />
    </>
  );
}
