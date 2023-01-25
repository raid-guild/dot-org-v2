import React, { useEffect, useRef } from 'react';
import {
  Flex,
  FormControl,
  Button,
  Stack,
  ChakraCheckbox,
  useToast,
  ChakraAlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Heading,
  useDisclosure,
} from '@raidguild/design-system';
import { useAccount } from 'wagmi';
import { useSession } from 'next-auth/react';
import _ from 'lodash';
import * as Yup from 'yup';
import { useForm, FieldValues, FieldErrorsImpl } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from '../atoms/ChakraNextLink';
import { useJoinState } from '../../context/appState';
import useSubmit from '../../hooks/useSubmit';

interface Props {
  handleBack: () => void;
  handleNext: () => void;
}

const validationSchema = Yup.object().shape({
  pledgeReadiness: Yup.bool().oneOf([true]),
  handbookRead: Yup.bool().oneOf([true]),
});

const StepSix = ({ handleNext, handleBack }: Props) => {
  const { address } = useAccount();
  const { data: session } = useSession();
  const token = _.get(session, 'token') || '';
  const { joinState, setJoinState } = useJoinState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const localForm = useForm({ resolver: yupResolver(validationSchema) });
  const { watch, setValue, handleSubmit, reset } = localForm;
  const toast = useToast();
  const cancelRef: any = useRef();
  const { submitJoinForm } = useSubmit(token);

  const handbookCheckBoxChangeHandler = () => {
    setValue('handbookRead', !watch('handbookRead'));
  };

  const pledgeReadinessCheckBoxChangeHandler = () => {
    onOpen();
  };
  const handleModalCancel = () => {
    setValue('pledgeReadiness', false);
    onClose();
  };

  useEffect(() => {
    reset({ ...joinState.join6 });
  }, []);

  const onNext = (data: FieldValues) => {
    const currJoinState = {
      ...joinState,
      join6: { ...data, ethAddress: address },
    };
    setJoinState(currJoinState);
    submitJoinForm(currJoinState);
    handleNext();
  };
  const onError = (data: FieldErrorsImpl) => {
    if (Object.keys(data).length > 0) {
      toast.error({
        title: 'Please fill in all required fields',
        iconName: 'alert',
      });
    }
  };
  const modalConfirmHandler = () => {
    setValue('pledgeReadiness', !watch('pledgeReadiness'));
    onClose();
  };

  return (
    <Flex w='100%' direction='column' px={{ base: '2rem', lg: '5rem' }} py='2rem'>
      <Stack direction='column' spacing={5}>
        <FormControl>
          <ChakraCheckbox
            fontFamily='spaceMono'
            isChecked={watch('handbookRead')}
            onChange={handbookCheckBoxChangeHandler}>
            Have you read through the{' '}
            <Link href='https://handbook.raidguild.org/' textDecoration='underline' isExternal>
              RaidGuild Handbook?*
            </Link>
          </ChakraCheckbox>
        </FormControl>
        <FormControl>
          <ChakraCheckbox
            fontFamily='spaceMono'
            isChecked={watch('pledgeReadiness')}
            onChange={pledgeReadinessCheckBoxChangeHandler}>
            Are you ready to make pledge unto our DAO?*
          </ChakraCheckbox>
        </FormControl>
      </Stack>

      <Flex gap={4} justify='center' mt='2rem'>
        <Button fontFamily='spaceMono' onClick={handleBack} variant='outline'>
          Back
        </Button>
        <Button fontFamily='spaceMono' onClick={handleSubmit(onNext, onError)}>
          Submit
        </Button>
      </Flex>

      <ChakraAlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>
              <Heading>Disclaimer</Heading>
            </AlertDialogHeader>

            <AlertDialogBody fontFamily='spaceMono'>
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
              <Button fontFamily='spaceMono' variant='outline' ref={cancelRef} onClick={handleModalCancel}>
                Cancel
              </Button>
              <Button fontFamily='spaceMono' onClick={modalConfirmHandler} ml={3}>
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
