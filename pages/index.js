import { Flex, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import { Meta } from '../shared/Meta';
import { SectionOne } from '../views/landing/SectionOne';
import { SectionTwo } from '../views/landing/SectionTwo';
import { SectionThree } from '../views/landing/SectionThree';
import { SectionFour } from '../views/landing/SectionFour';
import { SectionFive } from '../views/landing/SectionFive';
import { SectionSix } from '../views/landing/SectionSix';
import { Footer } from '../shared/Footer';
import { Animation } from '../views/animation/animation';

const wrapper_style = {
  position: 'relative',
  zIndex: 100,
}

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
    <Flex height="100%" width="100%" direction="column" background="#000000">
      <Meta />
      <div style={wrapper_style}>
        <SectionOne windowWidth={windowWidth} />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
        <SectionFive />
        <SectionSix />

        {windowWidth > 500 && <Box px="5rem" py="2rem" minH="20vh" bgImage="url(/layered-steps.svg)"></Box>}

        <Footer />
      </div>
      <Animation />
    </Flex>
  )
}
