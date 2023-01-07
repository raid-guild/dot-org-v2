import React from 'react';
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
  Button,
  useDisclosure,
  Heading,
  Checkbox,
} from '@raidguild/design-system';
import { UseFormReturn, FieldValues } from 'react-hook-form';
import Link from '../atoms/ChakraNextLink';

interface Props {
  localForm: UseFormReturn<FieldValues>;
}

const StepSix = ({ localForm }: Props) => {
  const { watch, setValue } = localForm;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef: any = React.useRef();

  const modalConfirmHandler = () => {
    onOpen();
  };

  const handbookCheckBoxChangeHandler = () => {
    setValue('handbook', !watch('handbook'));
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

        <Checkbox options={['Are you ready to make pledge unto our DAO?']} localForm={localForm} />
      </Stack>

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
