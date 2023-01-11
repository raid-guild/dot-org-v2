import { useRef, useState } from 'react';
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
  ChakraAlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@raidguild/design-system';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useJoinState } from '../../context/joinState';

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

const defaultStage1State = {
  name: '',
  email: '',
  bio: '',
  goal: '',
};

const Join = () => {
  const [stage1State, setStage1State] = useState(defaultStage1State);
  const [stage2State, setStage2State] = useState({});
  const [stage3State, setStage3State] = useState({});
  const [stage4State, setStage4State] = useState({});
  const [nextTrigger, setNextTrigger] = useState(false);
  const [backTrigger, setBackTrigger] = useState(false);
  const { joinState, setJoinState } = useJoinState();

  const router = useRouter();
  const stage = Number(router.query.stage) || 1;
  const localForm = useForm({ mode: 'onBlur', resolver: yupResolver(joinSchema) });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef: any = useRef();
  const { handleSubmit } = localForm;

  const modalConfirmHandler = () => {
    onOpen();
  };
  const onSubmit = (data: any) => {
    console.log(`onSubmit data: ${JSON.stringify(data)}`);
  };
  const onError = (data: any) => {
    console.log(`onError data: ${JSON.stringify(data)}`);
  };

  const handleNext = () => {
    console.log('handleNext in page');
    router.push(`/join/${stage + 1}`);
  };

  const handleBack = () => {
    console.log('handleBack in page');
    router.push(`/join/${stage - 1}`);
  };

  console.log('stage container: joinState: ', JSON.stringify(joinState));
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

        {stage === 1 && <Intro handleNext={handleNext} handleBack={handleBack} />}
        {stage === 2 && <Overview handleNext={handleNext} handleBack={handleBack} />}
        {stage === 3 && <Contact handleNext={handleNext} handleBack={handleBack} />}
        {stage === 4 && <Skills handleNext={handleNext} handleBack={handleBack} />}
        {stage === 5 && <Interests handleNext={handleNext} handleBack={handleBack} />}
        {stage === 6 && <Misc handleNext={handleNext} handleBack={handleBack} />}
        {stage === 7 && <Agreements handleNext={handleNext} handleBack={handleBack} />}
        {stage === 8 && <Confirmation />}
      </Stack>

      <ChakraAlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>
              <Heading>Disclaimer</Heading>
            </AlertDialogHeader>

            <AlertDialogBody>
              You must attend cohort training events and apply your skills in a Raid or RIP to earn a champion for your
              membership.
              <br />
              <br />
              Once a Guilder champions your member proposal, you must pledge 500 wxDAI as tribute for 100 shares.
              <br />
              <br />
              If you prefer, apprentice, you may sweat your way to glory and tribute funds earned through raids.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button variant='outline' ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button variant='outline' onClick={modalConfirmHandler} ml={3}>
                Continue
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </ChakraAlertDialog>
    </SiteLayout>
  );
};

export default Join;
