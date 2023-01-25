import React, { useState, useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import * as Yup from 'yup';
import { Flex, useToast, Stack, Button, Textarea, useMediaQuery } from '@raidguild/design-system';
import { useSession } from 'next-auth/react';
import { useHireState } from '../../context/appState';
import handleError from '../../utils/forms';
// import Link from '../atoms/ChakraNextLink';
import RadioBox from '../atoms/RadioBox';
// import { SUBMISSION_REQUEST_FEE } from '../../utils/config';
import useSubmit from '../../hooks/useSubmit';

interface Props {
  handleNext: () => void;
  handleBack: () => void;
}

// const FEEDBACK_FORM =
//   'https://docs.google.com/forms/d/e/1FAIpQLSdxSnfKxvo6v7eo5dJ4j445-QhvkCq05GbJpcy5r8qWiYgqlQ/viewform?usp=sf_link';

const validationSchema = Yup.object().shape({
  additionalInfo: Yup.string().required(),
  deliveryPriorities: Yup.string().required(),
});

const FORM_STATE = {
  UNSUBMITTED: 'UNSUBMITTED',
  AWAITING_PAYMENT: 'AWAITING_PAYMENT',
  SUBMIT_AS_MEMBER: 'SUBMIT_AS_MEMBER',
  INITIATED_PAYMENT: 'INITIATED_PAYMENT',
  PAID_AND_SUBMITTED: 'PAID_AND_SUBMITTED',
};

const StepFour = ({ handleBack, handleNext }: Props) => {
  const { data: session } = useSession();
  const token = _.get(session, 'token') || '';
  const roles = _.get(session, 'user.roles') || [];
  const ethAddress = _.get(session, 'user.address') || '';

  const { submitHireForm, handlePayment } = useSubmit(token);
  // const cancelRef: any = React.useRef();
  const localForm = useForm({ resolver: yupResolver(validationSchema) });
  const toast = useToast();

  // const [isMember] = useState(roles.includes('member'));
  // const [submissionHash, setSubmissionHash] = useState<string>('');
  const [upTo780] = useMediaQuery('(max-width: 780px)');
  // const [dialogStatus, setDialogStatus] = useState(false);
  const { hireState, setHireState } = useHireState();
  // const [formStatus, setFormStatus] = useState<string>(FORM_STATE.UNSUBMITTED);

  const { handleSubmit, reset } = localForm;

  useEffect(() => {
    reset({ ...hireState.hire4 });
  }, []);

  // const handleFormSubmit = async () => {
  //   const currState = {
  //     ...hireState,
  //     ethAddress,
  //     submissionHash,
  //   };
  //   const res = await submitHireForm(currState);
  //   if (res.error) {
  //     toast.error({
  //       title: res.message,
  //       iconName: 'alert',
  //     });
  //   } else {
  //     toast.success({
  //       title: 'Form submitted successfully!',
  //       iconName: 'crown',
  //     });
  //     handleNext();
  //   }
  // };

  // useEffect(() => {
  //   if (submissionHash !== '' && formStatus === FORM_STATE.INITIATED_PAYMENT) {
  //     handleFormSubmit();
  //     setFormStatus(FORM_STATE.PAID_AND_SUBMITTED);
  //   }
  // }, [submissionHash]);

  // const onClose = () => setDialogStatus(false);

  // const modalConfirmHandler = () => {
  //   setFormStatus(isMember ? FORM_STATE.SUBMIT_AS_MEMBER : FORM_STATE.AWAITING_PAYMENT);
  //   onClose();
  // };

  // const paymentHandler = async () => {
  //   setFormStatus(FORM_STATE.INITIATED_PAYMENT);
  //   const res = await handlePayment(ethAddress);
  //   // const res = {
  //   //   error: false,
  //   //   message: 'successfully submitted',
  //   //   submissionHash: '0x123',
  //   // };

  //   if (res.error) {
  //     toast.error({
  //       title: res.message,
  //       iconName: 'alert',
  //     });
  //     setFormStatus(FORM_STATE.AWAITING_PAYMENT);
  //   } else {
  //     setSubmissionHash(res.submissionHash);
  //   }
  // };

  const onNext = async (data: FieldValues) => {
    const currState = {
      ...hireState,
      hire4: { ...data },
      ethAddress,
    };
    setHireState(currState);

    const res = await submitHireForm(currState);
    if (res.error) {
      toast.error({
        title: res.message,
        iconName: 'alert',
      });
    } else {
      toast.success({
        title: 'Form submitted successfully!',
        iconName: 'crown',
      });
      handleNext();
    }

    // setDialogStatus(true);
  };

  return (
    <Flex w='100%' direction='column' px={{ base: '2rem', lg: '5rem' }} py='2rem'>
      <Stack direction='column' spacing={{ base: 0, lg: 5 }} mb={10}>
        <Textarea
          label='Do you need something very specific?*'
          placeholder='Tell us how you think we can best help you?'
          name='additionalInfo'
          localForm={localForm}
        />

        <RadioBox
          name='deliveryPriorities'
          label='What are your priorities?'
          options={['Fast & Polished', 'Fast & Inexpensive', 'Polished & Inexpensive']}
          stack={upTo780 ? 'vertical' : 'horizontal'}
          localForm={localForm}
        />
      </Stack>

      {/* <Flex fontFamily='jetbrains' textDecoration='underline' justify='flex-end' mt='1rem'>
        <Link href={FEEDBACK_FORM} isExternal>
          Don&apos;t want to pay in $RAID? Give feedback here
        </Link>
      </Flex> */}
      <Flex direction='row' gap='10'>
        <Button fontFamily='spaceMono' onClick={handleBack} variant='outline'>
          Back
        </Button>
        <Button fontFamily='spaceMono' onClick={handleSubmit(onNext, handleError(toast))}>
          Submit
        </Button>
        {/* {formStatus === FORM_STATE.AWAITING_PAYMENT && (
          <Button fontFamily='spaceMono' onClick={paymentHandler}>
            Pay {SUBMISSION_REQUEST_FEE} $RAID
          </Button>
        )}
        {formStatus === FORM_STATE.INITIATED_PAYMENT && (
          <Button isLoading fontFamily='spaceMono' disabled>
            Submitting...
          </Button>
        )} */}
        {/* {formStatus === FORM_STATE.SUBMIT_AS_MEMBER && (
          <Button fontFamily='spaceMono' onClick={handleFormSubmit}>
            Submit as Member
          </Button>
        )} */}
      </Flex>
      {/* {formStatus === FORM_STATE.PAID_AND_SUBMITTED && (
        <Flex direction='column' mt='2rem'>
          <Text fontFamily='spaceMono'>$RAID has been sent to the Guild Bank. Thank you for your submission!</Text>
          <Text fontFamily='spaceMono'>Transaction hash: {submissionHash}</Text>
        </Flex>
      )} */}

      {/* <ChakraAlertDialog isOpen={dialogStatus} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
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
                    1,5000 $RAID.
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
              <Button fontFamily='spaceMono' variant='secondary' ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button fontFamily='spaceMono' w='100%' onClick={modalConfirmHandler} ml={3}>
                Proceed
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </ChakraAlertDialog> */}

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
