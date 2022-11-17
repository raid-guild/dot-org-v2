import { useState, useEffect, useContext } from "react";
import {
  Box,
  Flex,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";

import { AppContext } from "../context/AppContext";

import { Header } from "../shared/Header";
import { Footer } from "../shared/Footer";
import { FAQ } from "../shared/Faq";

import { Intro } from "../views/hireus/Intro";
import { StepOne } from "../views/hireus/StepOne";
import { StepTwo } from "../views/hireus/StepTwo";
import { StepThree } from "../views/hireus/StepThree";
import { StepFour } from "../views/hireus/StepFour";
import { Confirmation } from "../views/hireus/Confirmation";

import { StyledSecondaryHeading } from "../themes/styled";

const stageHeadings = {
  1: "Personal Details",
  2: "Project Details",
  3: "Required Services",
  4: "Additional Information",
};

const Hire = () => {
  const context = useContext(AppContext);

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
      <Flex maxW="100rem" py="1rem" mx="auto" overflowX="hidden">
        <Flex
          width="100vw"
          minHeight="100vh"
          direction="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box px={{ base: "2rem", lg: "5rem" }} w="100%">
            <Header windowWidth={windowWidth} navLinks={false} />
          </Box>

          {context.stage > 1 && context.stage < 6 && (
            <Flex
              direction="row"
              alignItems="center"
              mt="2rem"
              mr="auto"
              px={{ base: "2rem", lg: "5rem" }}
            >
              <CircularProgress
                value={context.stage - 1}
                thickness="4px"
                max={4}
                color="red"
              >
                <CircularProgressLabel
                  color="red"
                  fontFamily="jetbrains"
                  fontSize={{ base: "20px", lg: "26px" }}
                >
                  {context.stage - 1}
                </CircularProgressLabel>
              </CircularProgress>{" "}
              <StyledSecondaryHeading
                fontSize={{ base: "20px", lg: "26px" }}
                ml="1rem"
              >
                {stageHeadings[context.stage - 1]}
              </StyledSecondaryHeading>
            </Flex>
          )}

          {context.stage === 1 && <Intro />}
          {context.stage === 2 && <StepOne />}
          {context.stage === 3 && <StepTwo />}
          {context.stage === 4 && <StepThree />}
          {context.stage === 5 && <StepFour windowWidth={windowWidth} />}
          {context.stage === 6 && <Confirmation />}

          <FAQ />
          <Footer />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Hire;
