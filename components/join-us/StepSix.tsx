import React, { useState } from 'react';
import {
  Flex,
  FormControl,
  Stack,
  ChakraCheckbox,
  ChakraAlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverCloseButton,
  PopoverArrow,
  Button,
  useDisclosure,
} from '@raidguild/design-system';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  localForm: UseFormReturn;
}

const StepSix = ({ localForm }: Props) => {
  // const { submissionTextUpdates, submissionPendingStatus, submitApplication } = useSubmit('join');

  const [handbookCheckBoxStatus, setHandBookCheckBoxStatus] = useState(false);
  const [pledgeCheckBoxStatus, setPledgeCheckBoxStatus] = useState(false);

  const [dialogStatus, setDialogStatus] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const modalConfirmHandler = () => {
    setPledgeCheckBoxStatus(true);
    onClose();
  };

  const handbookCheckBoxChangeHandler = () => {
    setHandBookCheckBoxStatus(!handbookCheckBoxStatus);
  };

  const pledgeCheckBoxChangeHandler = () => {
    if (pledgeCheckBoxStatus) {
      setPledgeCheckBoxStatus(false);
    }
    if (!pledgeCheckBoxStatus) {
      setDialogStatus(true);
    }
  };

  return (
    <Flex w='100%' direction='column' px={{ base: '2rem', lg: '5rem' }} py='2rem'>
      <Stack direction='column' spacing={5}>
        <FormControl fontFamily='spaceMono' color='white'>
          <ChakraCheckbox
            fontFamily='jetbrains'
            isChecked={handbookCheckBoxStatus}
            onChange={handbookCheckBoxChangeHandler}>
            Have you read through the{' '}
            <Link href='https://handbook.raidguild.org/' isExternal color='purple'>
              RaidGuild Handbook?
            </Link>
          </ChakraCheckbox>
        </FormControl>

        <FormControl fontFamily='spaceMono' color='white'>
          <ChakraCheckbox
            fontFamily='jetbrains'
            isChecked={pledgeCheckBoxStatus}
            onChange={pledgeCheckBoxChangeHandler}>
            Are you ready to make pledge unto our DAO?
          </ChakraCheckbox>
        </FormControl>
      </Stack>

      <ChakraAlertDialog isOpen={dialogStatus} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Disclaimer
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

      <Flex direction={{ base: 'column-reverse', lg: 'row' }} justifyContent='space-between' mt='2rem'>
        {/* {context.stage !== 1 && context.stage !== 8 && ( */}
        <Flex direction={{ base: 'column', md: 'row' }}>
          <Button
            variant='outline'
            w='100%'
            mr='1rem'
            mt={{ base: '.5rem' }}
            // onClick={() => context.updateStage('previous')}>
          >
            Back
          </Button>
          <Button
            variant='outline'
            w='100%'
            mt={{ base: '.5rem' }}
            // onClick={() => context.updateFaqModalStatus(true, 'join')}>
          >
            Read FAQ
          </Button>
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
              Check you wallet & sign the message to confirm your submission.
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </Flex>
  );
};

export default StepSix;
