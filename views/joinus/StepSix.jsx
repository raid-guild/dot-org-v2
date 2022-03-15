import React, { useState, useContext } from 'react';
import {
  Flex,
  FormControl,
  Stack,
  Checkbox,
  AlertDialog,
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
  PopoverArrow
} from '@chakra-ui/react';

import { AppContext } from '../../context/AppContext';

import {
  StyledPrimaryButton,
  StyledSecondaryButton
} from '../../themes/styled';

import useSubmit from '../../hooks/useSubmit';

export const StepSix = () => {
  const context = useContext(AppContext);

  const { submissionTextUpdates, submissionPendingStatus, submitApplication } =
    useSubmit('join');

  const [handbookCheckBoxStatus, setHandBookCheckBoxStatus] = useState(false);
  const [pledgeCheckBoxStatus, setPledgeCheckBoxStatus] = useState(false);

  const [dialogStatus, setDialogStatus] = useState(false);

  const onClose = () => setDialogStatus(false);
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
    <Flex
      w='100%'
      direction='column'
      px={{ base: '2rem', lg: '5rem' }}
      py='2rem'
    >
      <Stack direction='column' spacing={5}>
        <FormControl fontFamily='spaceMono' color='white'>
          <Checkbox
            fontFamily='jetbrains'
            isChecked={handbookCheckBoxStatus}
            onChange={handbookCheckBoxChangeHandler}
          >
            Have you read through the{' '}
            <Link
              href='https://handbook.raidguild.org/'
              isExternal
              color='purple'
            >
              RaidGuild Handbook?
            </Link>
          </Checkbox>
        </FormControl>

        <FormControl fontFamily='spaceMono' color='white'>
          <Checkbox
            fontFamily='jetbrains'
            isChecked={pledgeCheckBoxStatus}
            onChange={pledgeCheckBoxChangeHandler}
          >
            Are you ready to make pledge unto our DAO?
          </Checkbox>
        </FormControl>
      </Stack>

      <AlertDialog
        isOpen={dialogStatus}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Disclaimer
            </AlertDialogHeader>

            <AlertDialogBody>
              You must attend cohort training events and apply your skills in a
              Raid or RIP to earn a champion for your membership.
              <br />
              <br />
              Once a Guilder champions your member proposal, you must pledge 500
              wxDAI as tribute for 100 shares.
              <br />
              <br />
              If you prefer, apprentice, you may sweat your way to glory and
              tribute funds earned through raids.
            </AlertDialogBody>

            <AlertDialogFooter>
              <StyledSecondaryButton
                className='dialog-button-cancel'
                ref={cancelRef}
                onClick={onClose}
              >
                Cancel
              </StyledSecondaryButton>
              <StyledPrimaryButton
                className='dialog-button-select'
                onClick={modalConfirmHandler}
                ml={3}
              >
                Continue
              </StyledPrimaryButton>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Flex
        direction={{ base: 'column-reverse', lg: 'row' }}
        justifyContent='space-between'
        mt='2rem'
      >
        {context.stage !== 1 && context.stage !== 8 && (
          <Flex direction={{ base: 'column', md: 'row' }}>
            <StyledSecondaryButton
              w='100%'
              mr='1rem'
              mt={{ base: '.5rem' }}
              onClick={() => context.updateStage('previous')}
            >
              Back
            </StyledSecondaryButton>
            <StyledSecondaryButton
              w='100%'
              mt={{ base: '.5rem' }}
              onClick={() => context.updateFaqModalStatus(true, 'join')}
            >
              Read FAQ
            </StyledSecondaryButton>
          </Flex>
        )}
        <Popover placement='top'>
          <PopoverTrigger>
            <StyledPrimaryButton
              isLoading={submissionPendingStatus}
              loadingText={submissionTextUpdates}
              onClick={() => {
                context.setJoinStepSixData(
                  handbookCheckBoxStatus,
                  pledgeCheckBoxStatus
                );
                submitApplication();
              }}
            >
              Submit
            </StyledPrimaryButton>
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
