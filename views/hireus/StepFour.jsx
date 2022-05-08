import React, { useState, useContext } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Stack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from '@chakra-ui/react';

import { AppContext } from '../../context/AppContext';

import RadioBox from '../../shared/RadioBox';
import AlertModal from '../../shared/AlertModal';

import {
  StyledTextArea,
  StyledPrimaryButton,
  StyledSecondaryButton
} from '../../themes/styled';

import useWallet from '../../hooks/useWallet';
import useSubmit from '../../hooks/useSubmit';
import useWarnings from '../../hooks/useWarnings';

import { SUBMISSION_REQUEST_FEE } from '../../config';

export const StepFour = ({ windowWidth }) => {
  const context = useContext(AppContext);

  const [dialogStatus, setDialogStatus] = useState(false);
  const [disclaimerStatus, setDisclaimerStatus] = useState(false);

  const onClose = () => setDialogStatus(false);
  const cancelRef = React.useRef();

  const modalConfirmHandler = () => {
    setDisclaimerStatus(true);
    onClose();
  };

  const { connectWallet } = useWallet();
  const { submissionTextUpdates, submissionPendingStatus, submitApplication } =
    useSubmit('hire');
  const { triggerToast } = useWarnings();

  const [priorities, setPriorities] = useState(
    context.h_priorities || 'Fast & Polished'
  );

  const [buttonClick, setButtonClickStatus] = useState(false);

  const paymentHandler = async () => {
    if (context.signerAddress) {
      submitApplication();
    } else {
      await connectWallet();
    }
  };

  const submitHandler = async () => {
    if (context.h_specificNeed === '') {
      setButtonClickStatus(true);
      triggerToast('Please fill in all the fields');
      return;
    }
    if (context.h_specificNeed !== '') {
      setButtonClickStatus(false);
      context.setHireStepFourData(priorities);
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
      <Stack direction='column' spacing={{ base: 0, lg: 5 }} mb={10}>
        <FormControl
          isRequired
          isInvalid={
            context.h_specificNeed === '' && buttonClick ? true : false
          }
          fontFamily='spaceMono'
          color='white'
          mb={10}
        >
          <FormLabel>Do you need something very specific?</FormLabel>
          <StyledTextArea
            placeholder='Tell us how you think we can best help you?'
            onChange={context.inputChangeHandler}
            name='h_specificNeed'
            value={context.h_specificNeed}
          />
        </FormControl>

        <FormControl isRequired fontFamily='spaceMono' color='white'>
          <FormLabel as='legend'>What are your priorities?</FormLabel>
          <RadioBox
            stack={windowWidth < 400 ? 'vertical' : 'horizontal'}
            options={[
              'Fast & Polished',
              'Fast & Inexpensive',
              'Polished & Inexpensive'
            ]}
            updateRadio={setPriorities}
            name='h_priorities'
            defaultValue={context.h_priorities || priorities}
            value={context.h_priorities || priorities}
          />
        </FormControl>
      </Stack>

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
              onClick={() => context.updateFaqModalStatus(true, 'hire')}
            >
              Read FAQ
            </StyledSecondaryButton>
          </Flex>
        )}

        <StyledPrimaryButton
          isLoading={submissionPendingStatus}
          loadingText={submissionTextUpdates}
          onClick={() => {
            if (context.chainId !== 100) {
              triggerToast('Please switch to the Gnosis Network.');
              return;
            }

            if (disclaimerStatus) {
              paymentHandler();
            } else {
              submitHandler();
            }
          }}
        >
          {disclaimerStatus
            ? context.signerAddress
              ? !context.isMember
                ? `PAY ${SUBMISSION_REQUEST_FEE} $RAID`
                : 'SUBMIT'
              : 'CONNECT WALLET'
            : 'SUBMIT'}
        </StyledPrimaryButton>
      </Flex>

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

            {!context.isMember && (
              <AlertDialogBody fontFamily='jetbrains'>
                There's a one time 500 $RAID fee required to submit your
                application to filter spams. Make sure you have enough $RAID in
                your wallet.
                <br />
                <br />
                Once the application is submitted, you can start{' '}
                <a
                  style={{ textDecoration: 'underline' }}
                  href='https://bids.raidguild.org/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  bidding
                </a>{' '}
                to move up in the queue for your submission to get eligible for
                a consultation.
                <br />
                <br />
                You can view your application status on the{' '}
                <a
                  style={{ textDecoration: 'underline' }}
                  href='/dashboard'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  dashboard
                </a>
                . On successful acceptance of a bid, you can secure your
                consultation with the guild by paying $15000 $RAID.
              </AlertDialogBody>
            )}

            {context.isMember && (
              <AlertDialogBody fontFamily='jetbrains'>
                You are connected as a RaidGuild Member and can submit your
                application without paying a fee.
              </AlertDialogBody>
            )}

            <AlertDialogFooter>
              <StyledSecondaryButton
                className='dialog-button-cancel'
                ref={cancelRef}
                onClick={onClose}
              >
                Cancel
              </StyledSecondaryButton>
              <StyledPrimaryButton
                w='100%'
                className='dialog-button-select'
                onClick={modalConfirmHandler}
                ml={3}
              >
                Proceed
              </StyledPrimaryButton>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertModal
        alertTitle='INSUFFICIENT $RAID'
        alertMessage={`You need at least ${SUBMISSION_REQUEST_FEE} $RAID to submit the application & get into the
            consultation queue. You can buy more $RAID from honeyswap on xDai.`}
        alertAction='https://app.honeyswap.org/#/swap?inputCurrency=0x18e9262e68cc6c6004db93105cc7c001bb103e49&outputCurrency=0x6a023ccd1ff6f2045c3309768ead9e68f978f6e1&chainId=100'
      />
    </Flex>
  );
};
