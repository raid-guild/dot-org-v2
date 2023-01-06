import React, { useState, useContext } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Stack,
  ChakraAlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Link,
  Button,
  Textarea,
  useMediaQuery,
} from '@raidguild/design-system';
import { UseFormReturn } from 'react-hook-form';

import RadioBox from '../atoms/RadioBox';
import { SUBMISSION_REQUEST_FEE } from '../../utils/config';

interface Props {
  localForm: UseFormReturn;
}

const StepFour = ({ localForm }: Props) => {
  const [dialogStatus, setDialogStatus] = useState(false);
  const [disclaimerStatus, setDisclaimerStatus] = useState(false);

  const onClose = () => setDialogStatus(false);
  const cancelRef: any = React.useRef();

  const modalConfirmHandler = () => {
    setDisclaimerStatus(true);
    onClose();
  };

  const [priorities, setPriorities] = useState('Fast & Polished');
  const [isMember] = useState(false);
  const [buttonClick, setButtonClickStatus] = useState(false);

  const [upTo780] = useMediaQuery('(max-width: 780px)');

  const paymentHandler = async () => {
    // if (context.signerAddress) {
    //   submitApplication();
    // } else {
    //   await connectWallet();
    // }
  };

  const submitHandler = async () => {
    // if (context.h_specificNeed === '') {
    //   setButtonClickStatus(true);
    //   triggerToast('Please fill in all the fields');
    //   return;
    // }
    // if (context.h_specificNeed !== '') {
    //   setButtonClickStatus(false);
    //   context.setHireStepFourData(priorities);
    //   setDialogStatus(true);
    // }
  };

  return (
    <Flex w='100%' direction='column' px={{ base: '2rem', lg: '5rem' }} py='2rem'>
      <Stack direction='column' spacing={{ base: 0, lg: 5 }} mb={10}>
        <Textarea
          label='Do you need something very specific?'
          placeholder='Tell us how you think we can best help you?'
          name='specificNeed'
          localForm={localForm}
        />

        <FormControl isRequired fontFamily='spaceMono' color='white'>
          <FormLabel as='legend'>What are your priorities?</FormLabel>
          <RadioBox
            stack={upTo780 ? 'vertical' : 'horizontal'}
            options={['Fast & Polished', 'Fast & Inexpensive', 'Polished & Inexpensive']}
            updateRadio={setPriorities}
            name='h_priorities'
            defaultValue={priorities}
            // value={priorities[0]}
          />
        </FormControl>
      </Stack>

      <Flex direction={{ base: 'column-reverse', lg: 'row' }} justifyContent='space-between' mt='2rem'>
        {/* {context.stage !== 1 && context.stage !== 8 && (
          <Flex direction={{ base: 'column', md: 'row' }}>
            <Button
              variant='outline'
              w='100%'
              mr='1rem'
              mt={{ base: '.5rem' }}
              onClick={() => context.updateStage('previous')}>
              Back
            </Button>
            <Button
              variant='outline'
              w='100%'
              mt={{ base: '.5rem' }}
              onClick={() => context.updateFaqModalStatus(true, 'hire')}>
              Read FAQ
            </Button>
          </Flex>
        )} */}

        <Button
        // isLoading={submissionPendingStatus}
        // loadingText={submissionTextUpdates}
        // onClick={() => {
        //   if (context.chainId !== 100) {
        //     triggerToast('Please switch to the Gnosis Network.');
        //     return;
        //   }

        //   if (disclaimerStatus) {
        //     paymentHandler();
        //   } else {
        //     submitHandler();
        //   }
        // }}
        >
          {/* {disclaimerStatus
            ? context.signerAddress
              ? !context.isMember
                ? `PAY ${SUBMISSION_REQUEST_FEE} $RAID`
                : 'SUBMIT' */}
          CONNECT WALLET
          {/* : 'SUBMIT'} */}
        </Button>
      </Flex>
      <Flex justify='flex-end' mt='1rem'>
        <Link
          href='https://docs.google.com/forms/d/e/1FAIpQLSdxSnfKxvo6v7eo5dJ4j445-QhvkCq05GbJpcy5r8qWiYgqlQ/viewform?usp=sf_link'
          isExternal
          textDecoration='underline'
          color='red'>
          Don&apos;t want to pay in $RAID? Give feedback here
        </Link>
      </Flex>

      <ChakraAlertDialog isOpen={dialogStatus} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Disclaimer
            </AlertDialogHeader>

            {isMember && (
              <AlertDialogBody fontFamily='jetbrains'>
                There&apos;s a one time 500 $RAID fee required to submit your application to filter spams. Make sure you
                have enough $RAID in your wallet.
                <br />
                <br />
                Once the application is submitted, you can start{' '}
                <a
                  style={{ textDecoration: 'underline' }}
                  href='https://bids.raidguild.org/'
                  target='_blank'
                  rel='noopener noreferrer'>
                  bidding
                </a>{' '}
                to move up in the queue for your submission to get eligible for a consultation.
                <br />
                <br />
                You can view your application status on the{' '}
                <a style={{ textDecoration: 'underline' }} href='/dashboard' target='_blank' rel='noopener noreferrer'>
                  dashboard
                </a>
                . On successful acceptance of a bid, you can secure your consultation with the guild by paying $15000
                $RAID.
              </AlertDialogBody>
            )}

            {isMember && (
              <AlertDialogBody fontFamily='jetbrains'>
                You are connected as a RaidGuild Member and can submit your application without paying a fee.
              </AlertDialogBody>
            )}

            <AlertDialogFooter>
              <Button variant='secondary' ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button w='100%' onClick={modalConfirmHandler} ml={3}>
                Proceed
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </ChakraAlertDialog>

      {/* <AlertModal
        alertTitle='INSUFFICIENT $RAID'
        alertMessage={`You need at least ${SUBMISSION_REQUEST_FEE} $RAID to submit the application & get into the
            consultation queue. You can buy more $RAID from honeyswap on xDai.`}
        alertAction='https://app.honeyswap.org/#/swap?inputCurrency=0x18e9262e68cc6c6004db93105cc7c001bb103e49&outputCurrency=0x6a023ccd1ff6f2045c3309768ead9e68f978f6e1&chainId=100'
      /> */}
    </Flex>
  );
};

export default StepFour;
