import React from 'react';
import { HStack, Text, Image } from '@raidguild/design-system';
import Link from '../atoms/ChakraNextLink';
import { ConnectWallet } from '../atoms/ConnectWallet';

import GuildLogo from '../../assets/illustrations/raidguild.webp';

const Nav = () => (
  <HStack gap='1rem' justifyContent='space-between' width='80vw' margin='1rem auto'>
    <Link href='/' passHref>
      <Image src={GuildLogo.src} alt='Raidguild Logo / Home Badge' maxWidth='200px' />
    </Link>
    <HStack spacing={8}>
      <Link href='/#manifesto'>Manifesto</Link>
      <Link href='/#services'>Services</Link>
      {/* <Link href='/portfolio'>Portfolio</Link> */}
      <Link href='/join/1'>Join</Link>
      <Link href='/hire/1'>Hire</Link>
    </HStack>
    <ConnectWallet />
  </HStack>
);

export default Nav;
