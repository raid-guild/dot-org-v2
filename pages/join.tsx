import { useState } from 'react';
import {
  Box,
  Flex,
  // CircularProgress,
  // CircularProgressLabel,
} from '@raidguild/design-system';
import { useForm } from 'react-hook-form';

import Nav from '../components/page-components/Nav';
import Footer from '../components/page-components/Footer';
// import { FAQ } from '../shared/Faq';

import Intro from '../components/join-us/Intro';
import StepOne from '../components/join-us/StepOne';
import StepTwo from '../components/join-us/StepTwo';
import StepThree from '../components/join-us/StepThree';
import StepFour from '../components/join-us/StepFour';
import StepFive from '../components/join-us/StepFive';
import StepSix from '../components/join-us/StepSix';
import Confirmation from '../components/join-us/Confirmation';

const stageHeadings = {
  1: 'A Quick Intro',
  2: 'Your Social Presence',
  3: 'Your SkillSet',
  4: 'Tell Us More',
  5: 'Your Crypto Journey',
  6: 'Guild Readiness',
};

const Join = () => {
  const [stage] = useState(1);
  const localForm = useForm();

  return (
    <Flex
      background='radial-gradient(97.27% 170.54% at 98.7% 2.73%, #24003A 0%, rgba(0, 0, 0, 0) 100%),
radial-gradient(100% 350.19% at 100% 100%, #170011 0%, rgba(23, 0, 17, 0) 100%),
radial-gradient(50% 175.1% at 0% 100%, #130000 0%, rgba(31, 0, 0, 0) 100%),
radial-gradient(50% 175.1% at 0% 0%, #330F00 0%, rgba(51, 15, 0, 0) 100%),
linear-gradient(0deg, #000000, #000000)'>
      <Flex maxW='100rem' py='1rem' mx='auto' overflowX='hidden'>
        <Flex width='100vw' minHeight='100vh' direction='column' justifyContent='space-between' alignItems='center'>
          <Box px={{ base: '2rem', lg: '5rem' }} w='100%'>
            <Nav />
          </Box>

          {/* {context.stage > 1 && context.stage < 8 && (
            <Flex direction='row' alignItems='center' mt='2rem' mr='auto' px={{ base: '2rem', lg: '5rem' }}>
              <CircularProgress value={context.stage - 1} thickness='4px' max={6} color='red'>
                <CircularProgressLabel color='red' fontFamily='jetbrains' fontSize={{ base: '20px', lg: '26px' }}>
                  {context.stage - 1}
                </CircularProgressLabel>
              </CircularProgress>{' '}
              <StyledSecondaryHeading fontSize={{ base: '20px', lg: '26px' }} ml='1rem'>
                {stageHeadings[context.stage - 1]}
              </StyledSecondaryHeading>
            </Flex>
          )} */}

          {stage === 1 && <Intro />}
          {stage === 2 && <StepOne localForm={localForm} />}
          {stage === 3 && <StepTwo localForm={localForm} />}
          {stage === 4 && <StepThree localForm={localForm} />}
          {stage === 5 && <StepFour localForm={localForm} />}
          {stage === 6 && <StepFive localForm={localForm} />}
          {stage === 7 && <StepSix localForm={localForm} />}
          {stage === 8 && <Confirmation />}

          {/* <FAQ /> */}
          <Footer />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Join;
