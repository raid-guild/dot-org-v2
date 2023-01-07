import React, { useState } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Stack,
  Text,
  ChakraAlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Textarea,
  useMediaQuery,
} from '@raidguild/design-system';
import { UseFormReturn } from 'react-hook-form';

import Link from '../atoms/ChakraNextLink';
import RadioBox from '../atoms/RadioBox';
// import { SUBMISSION_REQUEST_FEE } from '../../utils/config';

interface Props {
  localForm: UseFormReturn;
}

const FEEDBACK_FORM =
  'https://docs.google.com/forms/d/e/1FAIpQLSdxSnfKxvo6v7eo5dJ4j445-QhvkCq05GbJpcy5r8qWiYgqlQ/viewform?usp=sf_link';

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

        <RadioBox
          name='priorities'
          label='What are your priorities?'
          options={['Fast & Polished', 'Fast & Inexpensive', 'Polished & Inexpensive']}
          stack={upTo780 ? 'vertical' : 'horizontal'}
          localForm={localForm}
        />
      </Stack>

      <Flex justify='flex-end' mt='1rem'>
        <Link href={FEEDBACK_FORM} isExternal>
          Don&apos;t want to pay in $RAID? Give feedback here
        </Link>
      </Flex>

      <ChakraAlertDialog isOpen={dialogStatus} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Disclaimer
            </AlertDialogHeader>

            {!isMember && (
              <AlertDialogBody>
                <Stack spacing={10}>
                  <Text>
                    There&apos;s a one time 500 $RAID fee required to submit your application to filter spams. Make sure
                    you have enough $RAID in your wallet.
                  </Text>
                  <Text>
                    Once the application is submitted, you can start{' '}
                    <Link href='https://bids.raidguild.org/' isExternal>
                      bidding
                    </Link>{' '}
                    to move up in the queue for your submission to get eligible for a consultation.
                  </Text>
                  <Text>
                    You can view your application status on the{' '}
                    <Link href='/dashboard' isExternal>
                      dashboard
                    </Link>
                    . On successful acceptance of a bid, you can secure your consultation with the guild by paying
                    $15000 $RAID.
                  </Text>
                </Stack>
              </AlertDialogBody>
            )}

            {isMember && (
              <AlertDialogBody>
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
