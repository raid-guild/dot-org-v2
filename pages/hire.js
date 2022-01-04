import { useState, useEffect, useContext } from 'react';
import {
  Box,
  Flex,
  CircularProgress,
  CircularProgressLabel
} from '@chakra-ui/react';
import Head from 'next/head';

import { AppContext } from '../context/AppContext';

import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
import { FAQ } from '../shared/Faq';

import { Intro } from '../components/hireus/Intro';
import { StepOne } from '../components/hireus/StepOne';
import { StepTwo } from '../components/hireus/StepTwo';
import { StepThree } from '../components/hireus/StepThree';
import { StepFour } from '../components/hireus/StepFour';
import { Confirmation } from '../components/hireus/Confirmation';

import { StyledSecondaryHeading } from '../themes/styled';

const stageHeadings = {
  1: 'Personal Details',
  2: 'Project Details',
  3: 'Required Services',
  4: 'Additional Information'
};

const Hire = () => {
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
      justifyContent='space-between'
      alignItems='center'
    >
      <Head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css'
          integrity='sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=='
          crossorigin='anonymous'
        />
        <script
          src='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/js/all.min.js'
          integrity='sha512-YSdqvJoZr83hj76AIVdOcvLWYMWzy6sJyIMic2aQz5kh2bPTd9dzY3NtdeEAzPp/PhgZqr4aJObB3ym/vsItMg=='
          crossorigin='anonymous'
        ></script>
      </Head>
      <Box px={{ base: '2rem', lg: '5rem' }} w='100%'>
        <Header windowWidth={windowWidth} />
      </Box>

      {context.stage > 1 && context.stage < 6 && (
        <Flex
          direction='row'
          alignItems='center'
          mt='2rem'
          mr='auto'
          px={{ base: '2rem', lg: '5rem' }}
        >
          <CircularProgress
            value={context.stage - 1}
            thickness='4px'
            max={4}
            color='red'
          >
            <CircularProgressLabel
              color='red'
              fontFamily='jetbrains'
              fontSize={{ base: '20px', lg: '26px' }}
            >
              {context.stage - 1}
            </CircularProgressLabel>
          </CircularProgress>{' '}
          <StyledSecondaryHeading
            fontSize={{ base: '20px', lg: '26px' }}
            ml='1rem'
          >
            {stageHeadings[context.stage - 1]}
          </StyledSecondaryHeading>
        </Flex>
      )}

      {context.stage === 1 && <Intro />}
      {context.stage === 2 && <StepOne />}
      {context.stage === 3 && <StepTwo />}
      {context.stage === 4 && <StepThree />}
      {context.stage === 5 && <StepFour windowWidth={windowWidth} />}
      {context.stage === 6 && <Confirmation />}

      <FAQ />
      <Footer />
    </Flex>
  );
};

export default Hire;
