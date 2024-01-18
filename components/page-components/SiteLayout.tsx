import { Box, Flex } from '@raidguild/design-system';
import React, { ReactNode } from 'react';
import tokens from '../../utils/extendedTokens';
import Footer from './Footer';
import Nav from './Nav';

interface Props {
  children: ReactNode;
  bg?: string;
}

const SiteLayout: React.FC<Props> = ({ children, bg }: Props) => (
  <Flex w='100%' mx='auto' overflowX='hidden' flexDirection='column' id='SiteLayout' bg={bg ?? 'none'}>
    <Box
      bg={bg ? 'none' : tokens.purpleToIndigoGradient}
      alignItems='center'
      justifyContent='center'
      id='NavBar'
      px={{ base: '1rem', xl: '4rem' }}>
      <Nav />
    </Box>
    <Flex direction='column' alignItems='center' w='100%' gap={10} bgColor='black'>
      {children}
    </Flex>

    <Footer />
  </Flex>
);

export default SiteLayout;
