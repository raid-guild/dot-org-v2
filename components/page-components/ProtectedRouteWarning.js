import { Box, Heading, Button, VStack, Text } from "@chakra-ui/react";
import useWallet from "../../hooks/useWallet";

export default function ProtectedRouteWarning(props) {
  const { connectWallet } = useWallet(false);

  return (
    <Box sx={{ minHeight: `100vh`, display: `grid`, placeItems: `center` }}>
      <VStack>
        <Heading mb="16px" sx={{ color: `white` }}>
          You must be signed in to view this page.
        </Heading>
        <Text sx={{ color: `white`, maxWidth: `75ch`, textAlign: `center` }}>
          To sign in, you must be a Raidguild Member. To prove this, connect
          with your wallet that has Raidguild DAO shares on Gnosis Chain. <br />
          Ensure your Web3 Provider is on Gnosis Chain or this operation will
          fail.
        </Text>
        <Box sx={{ minHeight: `16px` }}></Box>
        <Button onClick={connectWallet}>Connect Wallet</Button>
      </VStack>
    </Box>
  );
}
