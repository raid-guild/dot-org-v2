import { useState, useEffect, useContext } from 'react';
import {
  Box,
  Flex,
  CircularProgress,
  CircularProgressLabel,
  Heading
} from '@chakra-ui/react';
import Head from 'next/head';

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

const stageHeadings = {
  1: 'A Quick Intro',
  2: 'Your Social Presence',
  3: 'Your SkillSet',
  4: 'Tell Us More',
  5: 'Your Crypto Journey',
  6: 'Guild Readiness'
};

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

      {context.stage > 1 && context.stage < 8 && (
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
            max={6}
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
          <Heading
            variant='headingThree'
            fontSize={{ base: '20px', lg: '26px' }}
            fontFamily='uncial'
            ml='1rem'
          >
            {stageHeadings[context.stage - 1]}
          </Heading>
        </Flex>
      )}

      {context.stage === 1 && <Intro />}
      {context.stage === 2 && <StepOne />}
      {context.stage === 3 && <StepTwo />}
      {context.stage === 4 && <StepThree />}
      {context.stage === 5 && <StepFour />}
      {context.stage === 6 && <StepFive windowWidth={windowWidth} />}
      {context.stage === 7 && <StepSix />}
      {context.stage === 8 && <Confirmation />}

      <FAQ />
      <Footer />
    </Flex>
  );
};

export default Join;
