import React from 'react';
import { Flex, FormControl, Stack, ChakraCheckbox, Checkbox } from '@raidguild/design-system';
import { UseFormReturn, FieldValues } from 'react-hook-form';
import Link from '../atoms/ChakraNextLink';

interface Props {
  handleBack: () => void;
  handleNext: () => void;
}

const StepSix = ({ handleNext, handleBack }: Props) => {
  const { watch, setValue } = localForm;
  const watchPledgeReadiness = watch('pledgeReadiness', false);

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
    </Flex>
  );
};

export default StepSix;
