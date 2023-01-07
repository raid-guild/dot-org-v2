import { useRouter } from 'next/router';
import {
  Flex,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  Button,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverCloseButton,
  PopoverArrow,
} from '@raidguild/design-system';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import SiteLayout from '../../components/page-components/SiteLayout';
import Intro from '../../components/join-us/0-Intro';
import Overview from '../../components/join-us/1-Overview';
import Contact from '../../components/join-us/2-Contact';
import Skills from '../../components/join-us/3-Skills';
import Interests from '../../components/join-us/4-Interests';
import Misc from '../../components/join-us/5-Misc';
import Agreements from '../../components/join-us/6-Agreements';
import Confirmation from '../../components/join-us/7-Confirmation';
import Link from '../../components/atoms/ChakraNextLink';
import { joinSchema } from '../../utils';

const stageHeadings: { [key: number]: string } = {
  1: 'A Quick Intro',
  2: 'Your Social Presence',
  3: 'Your SkillSet',
  4: 'Tell Us More',
  5: 'Your Crypto Journey',
  6: 'Guild Readiness',
};

const Join = () => {
  const router = useRouter();
  const stage = Number(router.query.stage) || 1;
  const localForm = useForm({ mode: 'onBlur', resolver: yupResolver(joinSchema) });

  return (
    <SiteLayout>
      <Stack mt='2rem' mx='auto' w='80%' spacing={10}>
        {stage > 1 && stage < 8 && (
          <Flex direction='row' alignItems='center'>
            <CircularProgress value={stage - 1} thickness='4px' max={6} color='primary.500'>
              <CircularProgressLabel color='primary.500' fontFamily='jetbrains' fontSize={{ base: '20px', lg: '26px' }}>
                {stage - 1}
              </CircularProgressLabel>
            </CircularProgress>{' '}
            <Heading ml='1rem'>{stageHeadings[stage - 1]}</Heading>
          </Flex>
        )}

        {stage === 1 && <Intro />}
        {stage === 2 && <Overview localForm={localForm} />}
        {stage === 3 && <Contact localForm={localForm} />}
        {stage === 4 && <Skills localForm={localForm} />}
        {stage === 5 && <Interests localForm={localForm} />}
        {stage === 6 && <Misc localForm={localForm} />}
        {stage === 7 && <Agreements localForm={localForm} />}
        {stage === 8 && <Confirmation />}

        {stage < 7 ? (
          <Flex gap={4} justify='center'>
            <Link href={`/join/${stage - 1}`}>
              <Button variant='outline' isDisabled={stage === 1}>
                Back
              </Button>
            </Link>

            <Link href={`/join/${stage + 1}`}>
              <Button>{stage === 1 ? 'Start Application' : 'Next'}</Button>
            </Link>
          </Flex>
        ) : (
          <Flex direction={{ base: 'column-reverse', lg: 'row' }} justifyContent='space-between' mt='2rem'>
            {/* {context.stage !== 1 && context.stage !== 8 && ( */}
            <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
              <Link href={`/join/${stage - 1}`}>
                <Button
                  variant='outline'
                  w='100%'
                  mr='1rem'
                  mt={{ base: '.5rem' }}
                  // onClick={() => context.updateStage('previous')}>
                >
                  Back
                </Button>
              </Link>

              {/* <Link href={`/join/${stage + 1}`}>
                <Button
                  variant='outline'
                  w='100%'
                  mt={{ base: '.5rem' }}
                  // onClick={() => context.updateFaqModalStatus(true, 'join')}>
                >
                  Read FAQ
                </Button>
              </Link> */}
            </Flex>
            {/* )} */}
            <Popover placement='top'>
              <PopoverTrigger>
                <Button
                // isLoading={submissionPendingStatus}
                // loadingText={submissionTextUpdates}
                // onClick={() => {
                //   context.setJoinStepSixData(handbookCheckBoxStatus, pledgeCheckBoxStatus);
                //   submitApplication();
                // }}>
                >
                  Submit
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody fontFamily='spaceMono'>
                  Check your wallet & sign the message to confirm your submission.
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
        )}
      </Stack>
    </SiteLayout>
  );
};

export default Join;
