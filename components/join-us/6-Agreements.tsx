import { yupResolver } from '@hookform/resolvers/yup';
import {
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ChakraAlertDialog,
  ChakraCheckbox,
  Flex,
  FormControl,
  Heading,
  Stack,
  useDisclosure,
  useToast,
} from '@raidguild/design-system';
import * as Fathom from 'fathom-client';
import _ from 'lodash';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { FieldErrorsImpl, FieldValues, useForm } from 'react-hook-form';
import { useAccount } from 'wagmi';
import * as Yup from 'yup';
import { useJoinState } from '../../context/appState';
import useSubmit from '../../hooks/useSubmit';
import layerStyles from '../../utils/extendedTokens';
import Link from '../atoms/ChakraNextLink';
import GradientShiftButton from '../atoms/GradientShiftButton';

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
    Fathom.trackEvent('Join Form Submitted');
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
    <Flex w='100%' direction='column' px={{ base: '2rem', lg: '5rem' }} py={8}>
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
        <Button onClick={handleBack} variant='gradientOutline'>
          Back
        </Button>

        <GradientShiftButton width='max-content' onClick={handleSubmit(onNext, onError)}>
          Next
        </GradientShiftButton>
      </Flex>

      <ChakraAlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent bg={layerStyles.darkBrownRedGradient} p={10}>
            <AlertDialogHeader textColor='primary.500'>
              <Heading>Disclaimer</Heading>
            </AlertDialogHeader>

            <AlertDialogBody fontFamily='spaceMono' textColor='white'>
              You must attend cohort training events and apply your skills in a Raid or RIP to earn a champion for your
              membership.
              <br />
              <br />
              Once a Guilder champions your member proposal, you must pledge 500 wxDAI as tribute for 100 shares.
              <br />
              <br />
              If you prefer, apprentice, you may sweat your way to glory and tribute funds earned through raids.
            </AlertDialogBody>

            <AlertDialogFooter gap={4}>
              <Button
                width='max-content'
                variant='gradientOutline'
                onClick={handleBack}
                fontWeight={500}
                fontFamily='spaceMono'>
                Back
              </Button>
              <GradientShiftButton width='max-content' onClick={handleSubmit(onNext, onError)}>
                Next
              </GradientShiftButton>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </ChakraAlertDialog>
    </Flex>
  );
};

export default StepSix;
