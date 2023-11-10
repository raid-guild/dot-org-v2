import { Box, Flex } from '@raidguild/design-system';
import React, { ReactNode } from 'react';
import tokens from '../../utils/extendedTokens';
import Footer from './Footer';
import Nav from './Nav';

interface Props {
  children: ReactNode;
}

const SiteLayout: React.FC<Props> = ({ children }: Props) => (
  <Flex w='100%' mx='auto' overflowX='hidden' flexDirection='column' id='Site Layout'>
    <Box py='3rem' px={{ base: '1rem', lg: '5rem' }} bg={tokens.purpleToIndigoGradient}>
      <Nav />
    </Box>
    <Flex direction='column' alignItems='center' w='100%' py={20} gap={10} bgColor='black'>
      {children}
    </Flex>

    <Footer />
  </Flex>
);

export default SiteLayout;
