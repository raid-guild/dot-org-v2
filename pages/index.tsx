import { Box, VStack, Flex, Heading, Text } from "@raidguild/design-system";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Nav from "../components/page-components/Nav";
import Meta from "../components/page-components/Meta";

export default function Home() {
  return (
    <>
      <Box
        background="radial-gradient(97.27% 170.54% at 98.7% 2.73%, #24003A 0%, rgba(0, 0, 0, 0) 100%),
  radial-gradient(100% 350.19% at 100% 100%, #170011 0%, rgba(23, 0, 17, 0) 100%),
  radial-gradient(50% 175.1% at 0% 100%, #130000 0%, rgba(31, 0, 0, 0) 100%),
  radial-gradient(50% 175.1% at 0% 0%, #330F00 0%, rgba(51, 15, 0, 0) 100%),
  linear-gradient(0deg, #000000, #000000)"
      >
        <Flex maxW="100rem" mx="auto" overflowX="hidden">
          <Flex height="100%" width="100%" direction="column">
            <Meta />
            <VStack>
              <Box>
                <Nav />
              </Box>
            </VStack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
