import React, { useEffect, useRef } from 'react';
import {
  Flex,
  FormControl,
  Button,
  Stack,
  ChakraCheckbox,
  Checkbox,
  useToast,
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
  Heading,
  useDisclosure,
} from '@raidguild/design-system';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from '../atoms/ChakraNextLink';
import { useJoinState } from '../../context/joinState';

interface Props {
  handleBack: () => void;
  handleNext: () => void;
}

const validationSchema = Yup.object().shape({
  pledgeReadiness: Yup.bool().required(),
  handbook: Yup.string().required(),
});

const StepSix = ({ handleNext, handleBack }: Props) => {
  const { joinState, setJoinState } = useJoinState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const localForm = useForm({ resolver: yupResolver(validationSchema) });
  const { watch, setValue, handleSubmit, reset, formState, getValues } = localForm;
  const watchPledgeReadiness = watch('pledgeReadiness', false);
  const toast = useToast();
  const cancelRef: any = useRef();

  const handbookCheckBoxChangeHandler = () => {
    setValue('handbook', !watch('handbook'));
    onOpen();
    console.log('handbookCheckBoxChangeHandler called', formState);
  };
  console.log('render - ', getValues());

  useEffect(() => {
    reset({ ...joinState.stage6 });
    console.log('reset set', JSON.stringify(joinState.stage6));
  }, []);

  const onNext = (data: any) => {
    console.log('handleNext');
    console.log(`data: ${JSON.stringify(data)}`);
    setJoinState({
      ...joinState,
      stage6: { ...data },
    });
    handleNext();
    // todo: submit form
  };
  // todo: set types
  const onError = (data: any) => {
    if (Object.keys(data).length > 0) {
      toast.error({
        title: 'Please fill in all required fields',
        iconName: 'alert',
      });
    }
  };
  const modalConfirmHandler = () => {
    onClose();
  };

  return (
    <Flex w='100%' direction='column' px={{ base: '2rem', lg: '5rem' }} py='2rem'>
      <Stack direction='column' spacing={5}>
        <FormControl>
          <ChakraCheckbox isChecked={watch('handbook')} onChange={handbookCheckBoxChangeHandler}>
            Have you read through the{' '}
            <Link href='https://handbook.raidguild.org/' isExternal>
              RaidGuild Handbook?
            </Link>
          </ChakraCheckbox>
        </FormControl>

        {/* <Checkbox
          name='handbook'
          options={['Are you ready to make pledge unto our DAO?']}
          localForm={localForm}
          label={
            <>
              Have you read through the{' '}
              <Link href='https://handbook.raidguild.org/' isExternal>
                RaidGuild Handbook?
              </Link>
            </>
          }
        /> */}

        <Checkbox
          name='pledgeReadiness'
          options={['Are you ready to make pledge unto our DAO?']}
          localForm={localForm}
        />
      </Stack>

      <Flex gap={4} justify='center' mt='2rem'>
        <Button onClick={handleBack} variant='outline'>
          Back
        </Button>
        <Button onClick={handleSubmit(onNext, onError)}>Submit</Button>

        <Popover placement='top'>
          <PopoverTrigger>
            <Button
            // isLoading={submissionPendingStatus}
            // loadingText={submissionTextUpdates}
            // onClick={() => {
            //   context.setJoinStepSixData(
            //     handbookCheckBoxStatus,
            //     pledgeCheckBoxStatus
            //   );
            //   submitApplication();
            // }}
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
    </Flex>
  );
};

export default StepSix;
