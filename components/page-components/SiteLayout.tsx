import { ReactNode } from 'react';
import { Flex, Box } from '@raidguild/design-system';
import Nav from './Nav';
import Footer from './Footer';

interface Props {
  children: ReactNode;
}

const SiteLayout = ({ children }: Props) => (
  <Flex layerStyle='primaryGradient'>
    <Flex maxW='100rem' py='1rem' mx='auto' overflowX='hidden'>
      <Flex width='100vw' minHeight='100vh' direction='column' justifyContent='space-between' alignItems='center'>
        <Box px={{ base: '2rem', lg: '5rem' }} w='100%'>
          <Nav />
        </Box>

        <Flex direction='column' alignItems='center' w='100%' mt='2rem' py={20} gap={10}>
          {children}
        </Flex>

        <Box w='100%' mt='200px'>
          <Footer />
        </Box>
      </Flex>
    </Flex>
  </Flex>
);

export default SiteLayout;
