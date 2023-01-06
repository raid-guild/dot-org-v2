import React from 'react';
import { HStack, Text, Link, Image } from '@raidguild/design-system';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import GuildLogo from '../../assets/illustrations/raidguild.webp';

const Nav = () => {
  return (
    <HStack gap='1rem' justifyContent='space-between' width='80vw' margin='1rem auto'>
      <Link href='/'>
        <Image src={GuildLogo.src} alt='Raidguild Logo / Home Badge' maxWidth='200px' />
      </Link>
      <HStack>
        <Link href='/Manifesto'>
          <Text>Manifesto</Text>
        </Link>
        <Link href='/Services'>
          <Text>Services</Text>
        </Link>
        <Link href='/Portfolio'>
          <Text>Portfolio</Text>
        </Link>
        <Link href='/Join'>
          <Text>Join</Text>
        </Link>
        <Link href='/Hire'>
          <Text>Hire</Text>
        </Link>
      </HStack>
      <ConnectButton />
    </HStack>
  );
};

export default Nav;
