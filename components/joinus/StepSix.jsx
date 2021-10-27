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
  Heading,
  Button
} from '@chakra-ui/react';

import { AppContext } from '../../context/AppContext';

export const StepSix = () => {
  const context = useContext(AppContext);

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
      py='5rem'
    >
      <Heading
        variant='headingThree'
        fontSize={{ base: '1.5rem', lg: '26px' }}
        mb='1rem'
      >
        Step 6 of 6: Guild Readiness
      </Heading>

      <Stack direction='column' spacing={5}>
        <FormControl fontFamily='spaceMono' color='white'>
          <Checkbox
            fontFamily='jetbrains'
            isChecked={handbookCheckBoxStatus}
            onChange={handbookCheckBoxChangeHandler}
          >
            Have you read through the RaidGuild Handbook?
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
              <Button
                variant='secondary'
                className='dialog-button-cancel'
                ref={cancelRef}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                variant='primary'
                className='dialog-button-select'
                onClick={modalConfirmHandler}
                ml={3}
              >
                Continue
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Flex direction='row' justifyContent='space-between' mt='2rem'>
        {context.stage !== 1 && context.stage !== 8 && (
          <Flex>
            <Button
              mr='1rem'
              variant='secondary'
              onClick={() => context.updateStage('previous')}
            >
              Back
            </Button>
            <Button
              variant='secondary'
              onClick={() => context.updateFaqModalStatus(true)}
            >
              Read FAQ
            </Button>
          </Flex>
        )}
        <Button
          variant='primary'
          isLoading={context.submitting}
          loadingText='Submitting'
          onClick={() => {
            context.updateStage('next');
          }}
        >
          Submit
        </Button>
      </Flex>
    </Flex>
  );
};
