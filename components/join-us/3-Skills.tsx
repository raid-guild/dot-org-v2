import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { Flex, Stack, Checkbox, Button, useToast } from '@raidguild/design-system';
import { useJoinState } from '../../context/joinState';

import RadioBox from '../atoms/RadioBox';

import { skills } from '../../utils/constants';

interface Props {
  handleBack: () => void;
  handleNext: () => void;
}

// TODO add CheckboxGroup component to design-system

const StepThree = ({ handleNext, handleBack }: Props) => {
  const { joinState, setJoinState } = useJoinState();
  const toast = useToast();
  const { handleSubmit, reset } = localForm;
  const localForm = useForm();
  useEffect(() => {
    reset({ ...joinState.stage1 });
    console.log('reset set', JSON.stringify(joinState.stage1));
  }, []);

  const onNext = (data: any) => {
    console.log('handleNext');
    console.log(`data: ${JSON.stringify(data)}`);
    setJoinState({
      ...joinState,
      stage4: { ...data },
    });
    handleNext();
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

  return (
    <Flex w='100%' direction='column' px={{ base: '2rem', lg: '5rem' }} py='2rem'>
      <Stack direction={{ base: 'column', lg: 'row' }} mb={10} spacing={10}>
        <Checkbox options={skills} localForm={localForm} />

        <RadioBox
          name='technicalSkillType'
          label='Do you bethink yourself as technical, or non-technical?'
          localForm={localForm}
          options={['Technical', 'Non - Technical', 'Other']}
          stack='horizontal'
        />
      </Stack>

      <Flex gap={4} justify='center' mt='2rem'>
        <Button onClick={handleBack} variant='outline'>
          Back
        </Button>
        <Button onClick={handleSubmit(onNext, onError)}>Next</Button>
      </Flex>
    </Flex>
  );
};

export default StepThree;
