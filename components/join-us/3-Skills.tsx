import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { Flex, Stack, Checkbox, Button, useToast, Select } from '@raidguild/design-system';
import { useJoinState } from '../../context/appState';

import RadioBox from '../atoms/RadioBox';

import { skills } from '../../utils/constants';

interface Props {
  handleBack: () => void;
  handleNext: () => void;
}

// TODO add CheckboxGroup component to design-system

const validationSchema = Yup.object().shape({
  primarySkills: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      }),
    )
    .required(),
  secondarySkills: Yup.array().of(
    Yup.object().shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    }),
  ),
  technicalSkillType: Yup.string(),
});

const StepThree = ({ handleNext, handleBack }: Props) => {
  const { joinState, setJoinState } = useJoinState();
  const localForm = useForm({ resolver: yupResolver(validationSchema) });
  const toast = useToast();
  const { handleSubmit, reset } = localForm;
  useEffect(() => {
    const currPrimarySkills = joinState.join3.primarySkills
      ? joinState.join3.primarySkills.map((s: string) => ({ value: s, label: s }))
      : [];
    const currSecondarySkills = joinState.join3.secondarySkills
      ? joinState.join3.secondarySkills.map((s: string) => ({ value: s, label: s }))
      : [];
    const currData = {
      primarySkills: currPrimarySkills,
      secondarySkills: currSecondarySkills,
      technicalSkillType: joinState.join3.technicalSkillType || undefined,
    };
    reset({ ...currData });
    console.log(`currData: ${currData}`);
  }, []);

  const onNext = (data: any) => {
    console.log('handleNext');
    console.log(`data: ${JSON.stringify(data)}`);
    const primarySkills = data.primarySkills.map((s: any) => s.value);
    const secondarySkills =
      data.secondarySkills && data.secondarySkills.length > 0 ? data.secondarySkills.map((s: any) => s.value) : [];
    console.log(`join3: ${JSON.stringify({ ...data, primarySkills, secondarySkills })}`);

    setJoinState({
      ...joinState,
      join3: { ...data, primarySkills, secondarySkills },
    });
    handleNext();
  };
  // todo: set types
  const onError = (data: any) => {
    console.log(`error: ${JSON.stringify(data)}`);

    if (Object.keys(data).length > 0) {
      toast.error({
        title: 'Please fill in all required fields',
        iconName: 'alert',
      });
    }
  };
  const multiOptions = skills.map((s: string) => ({ value: s, label: s }));

  return (
    <Flex w='100%' direction='column' px={{ base: '2rem', lg: '5rem' }} py='2rem'>
      <Stack direction={{ base: 'column', lg: 'row' }} mb={10} spacing={10}>
        <Stack direction='column' w={{ base: 'auto', lg: '50%' }}>
          <Select
            name='primarySkills'
            localForm={localForm}
            isMulti
            options={multiOptions}
            label="What say'st are your primary skills?*"
          />
          <Select
            name='secondarySkills'
            localForm={localForm}
            isMulti
            options={multiOptions}
            label='And your secondary skills?'
          />
        </Stack>
        <Stack w={{ base: 'auto', lg: '50%' }}>
          <RadioBox
            name='technicalSkillType'
            label='Do you bethink yourself as technical, or non-technical?'
            localForm={localForm}
            options={['Technical', 'Non - Technical', 'Other']}
            stack='horizontal'
          />
        </Stack>
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
