import React from 'react';
import { HStack, Text, Image } from '@raidguild/design-system';
import Link from '../atoms/ChakraNextLink';
import { ConnectWallet } from '../atoms/ConnectWallet';

import GuildLogo from '../../assets/illustrations/raidguild.webp';

const Nav = () => (
  <HStack gap='1rem' justifyContent='space-between' width='80vw' margin='1rem auto'>
    <Link href='/'>
      <Image src={GuildLogo.src} alt='Raidguild Logo / Home Badge' maxWidth='200px' />
    </Link>
    <HStack>
      <Link href='/#manifesto'>
        <Text>Manifesto</Text>
      </Link>
      <Link href='/#services'>
        <Text>Services</Text>
      </Link>
      <Link href='/portfolio'>
        <Text>Portfolio</Text>
      </Link>
      <Link href='/join/1'>
        <Text>Join</Text>
      </Link>
      <Link href='/hire/1'>
        <Text>Hire</Text>
      </Link>
    </HStack>
    <ConnectWallet />
  </HStack>
);

export default Nav;
