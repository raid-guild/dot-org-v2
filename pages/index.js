import { Flex, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { Meta } from "../shared/Meta";
import { SectionOne } from "../views/landing/SectionOne";
import { SectionTwo } from "../views/landing/SectionTwo";
import { SectionThree } from "../views/landing/SectionThree";
import { SectionFour } from "../views/landing/SectionFour";
import { SectionFive } from "../views/landing/SectionFive";
import { SectionSix } from "../views/landing/SectionSix";
import { Footer } from "../shared/Footer";

export default function Home() {
  const [windowWidth, setWindowWidth] = useState("");

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.removeEventListener("resize", () => {});
    window.addEventListener("resize", (e) => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  return (
    <Flex
      background="radial-gradient(97.27% 170.54% at 98.7% 2.73%, #24003A 0%, rgba(0, 0, 0, 0) 100%),
  radial-gradient(100% 350.19% at 100% 100%, #170011 0%, rgba(23, 0, 17, 0) 100%),
  radial-gradient(50% 175.1% at 0% 100%, #130000 0%, rgba(31, 0, 0, 0) 100%),
  radial-gradient(50% 175.1% at 0% 0%, #330F00 0%, rgba(51, 15, 0, 0) 100%),
  linear-gradient(0deg, #000000, #000000)"
    >
      <Flex maxW="100rem" mx="auto" overflowX="hidden">
        <Flex height="100%" width="100%" direction="column">
          <Meta />
          <SectionOne windowWidth={windowWidth} />
          <SectionTwo />
          <SectionThree />
          <SectionFour />
          <SectionFive />
          <SectionSix />

          {windowWidth > 500 && (
            <Box
              px="5rem"
              py="2rem"
              minH="20vh"
              bgImage="url(/layered-steps.svg)"
            ></Box>
          )}

          <Footer />
        </Flex>
      </Flex>
    </Flex>
  );
}
