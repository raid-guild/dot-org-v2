import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Flex, Select, Stack, useToast } from '@raidguild/design-system';
import { useEffect } from 'react';
import { FieldErrorsImpl, FieldValues, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useJoinState } from '../../context/appState';
import { skills } from '../../utils/constants';
import RadioBox from '../atoms/RadioBox';
import GradientShiftButton from '../atoms/GradientShiftButton';

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
interface Props {
  handleBack: () => void;
  handleNext: () => void;
}

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
  }, []);

  const onNext = (data: FieldValues) => {
    const primarySkills = data.primarySkills.map((s: any) => s.value);
    const secondarySkills =
      data.secondarySkills && data.secondarySkills.length > 0 ? data.secondarySkills.map((s: any) => s.value) : [];

    setJoinState({
      ...joinState,
      join3: { ...data, primarySkills, secondarySkills },
    });
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
  const multiOptions = skills.map((s: string) => ({ value: s, label: s }));

  return (
    <Flex w='100%' direction='column' px={{ base: '2rem', lg: '5rem' }} py={8}>
      <Stack direction={{ base: 'column', lg: 'row' }} mb={10} spacing={10}>
        <Stack direction='column' w={{ base: 'auto', lg: '50%' }}>
          <Select
            name='primarySkills'
            localForm={localForm}
            isMulti
            options={multiOptions}
            label="What say'st are your primary skills?*"
            variant='solidOutline'
          />
          <Select
            name='secondarySkills'
            localForm={localForm}
            isMulti
            options={multiOptions}
            label='And your secondary skills?'
            variant='solidOutline'
          />
        </Stack>
        <Stack w={{ base: 'auto', lg: '50%' }}>
          <RadioBox
            name='technicalSkillType'
            label='Do you bethink yourself as technical, or non-technical?'
            localForm={localForm}
            size='lg'
            options={['Technical', 'Non - Technical', 'Other']}
            stack='horizontal'
            variant='solidOutline'
          />
        </Stack>
      </Stack>

      <Flex gap={4} justify='center' mt='2rem'>
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
      </Flex>
    </Flex>
  );
};

export default StepThree;
