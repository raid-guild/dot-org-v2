import { useState, useEffect, useContext } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { AppContext } from '../context/AppContext';

import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
import { FAQ } from '../shared/Faq';

import { Intro } from '../components/joinus/Intro';
import { StepOne } from '../components/joinus/StepOne';
import { StepTwo } from '../components/joinus/StepTwo';
import { StepThree } from '../components/joinus/StepThree';
import { StepFour } from '../components/joinus/StepFour';
import { StepFive } from '../components/joinus/StepFive';
import { StepSix } from '../components/joinus/StepSix';
import { Confirmation } from '../components/joinus/Confirmation';

const Join = () => {
  const context = useContext(AppContext);

  const [windowWidth, setWindowWidth] = useState('');

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.removeEventListener('resize', () => {});
    window.addEventListener('resize', (e) => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  return (
    <Flex
      width='100vw'
      minHeight='100vh'
      direction='column'
      justifyContent='center'
      alignItems='center'
    >
      <Box px={{ base: '2rem', lg: '5rem' }} w='100%'>
        <Header windowWidth={windowWidth} />
      </Box>

      {context.stage === 1 && <Intro />}
      {context.stage === 2 && <StepOne />}
      {context.stage === 3 && <StepTwo />}
      {context.stage === 4 && <StepThree />}
      {context.stage === 5 && <StepFour />}
      {context.stage === 6 && <StepFive />}
      {context.stage === 7 && <StepSix />}
      {context.stage === 8 && <Confirmation />}

      <FAQ />
      <Footer />
    </Flex>
  );
};

export default Join;
