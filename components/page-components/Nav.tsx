import React from "react";
import {
  Box,
  HStack,
  VStack,
  Heading,
  Text,
  Link,
  Image,
} from "@raidguild/design-system";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Nav = () => {
  return (
    <HStack
      gap="1rem"
      justifyContent={"space-between"}
      outline="1px solid red"
      width="80vw"
      margin="1rem auto"
    >
      <Link href="/">
        <Image
          src="/illustrations/raidguild.webp"
          alt="Raidguild Logo / Home Badge"
          maxWidth="200px"
        />
      </Link>
      <HStack>
        <Link href="/Manifesto">
          <Text>Manifesto</Text>
        </Link>
        <Link href="/Services">
          <Text>Services</Text>
        </Link>
        <Link href="/Portfolio">
          <Text>Portfolio</Text>
        </Link>
        <Link href="/Join">
          <Text>Join</Text>
        </Link>
        <Link href="/Hire">
          <Text>Hire</Text>
        </Link>
      </HStack>
      <ConnectButton />
    </HStack>
  );
};

export default Nav;
