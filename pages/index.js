import { Flex, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import { theme } from '../themes/theme';

import { Meta } from '../shared/Meta';
import { FirstPaint } from '../components/landing/FirstPaint';
import { Manifesto } from '../components/landing/Manifesto';
import { Services } from '../components/landing/Services';
import { Portfolio } from '../components/landing/Portfolio';
import { Culture } from '../components/landing/Culture';
import { Community } from '../components/landing/Community';
import { Footer } from '../shared/Footer';

export default function Home() {
  const [windowWidth, setWindowWidth] = useState('');

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.removeEventListener('resize', () => {});
    window.addEventListener('resize', (e) => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  return (
    <Flex height='100%' width='100%' direction='column'>
      <Meta />

      <FirstPaint windowWidth={windowWidth} />
      <Manifesto />
      <Services />
      <Portfolio />
      <Culture />

      <Community />

      {windowWidth > 500 && (
        <Box
          px='5rem'
          py='2rem'
          minH='20vh'
          bgImage={`url(${theme.images.steps})`}
        ></Box>
      )}

      <Footer />
    </Flex>
  );
}
