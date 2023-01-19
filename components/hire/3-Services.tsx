import { useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Flex, Box, Stack, Input, Checkbox, useToast, Select } from '@raidguild/design-system';
import { useHireState } from '../../context/appState';
import FormNavigation from './FormNavigation';
import RadioBox from '../atoms/RadioBox';
import { hireUsServices } from '../../utils/constants';
import { handleError } from '../../utils/forms';
import { mapConsultationService } from '../../utils/mapping';

type Props = {
  handleNext: () => void;
  handleBack: () => void;
};

const validationSchema = Yup.object().shape({
  services: Yup.array().of(
    Yup.object().shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    }),
  ),
  budget: Yup.string().required(),
  expectedDeadline: Yup.string().required(),
});

const StepThree = ({ handleNext, handleBack }: Props) => {
  const { hireState, setHireState } = useHireState();
  const localForm = useForm({ resolver: yupResolver(validationSchema) });
  const toast = useToast();
  const { handleSubmit, reset } = localForm;

  useEffect(() => {
    reset({ ...hireState.hire1 });
  }, []);

  const onNext = (data: FieldValues) => {
    setHireState({
      ...hireState,
      hire1: { ...data },
    });
    handleNext();
  };
  const servicesOptions = hireUsServices.map((s: string) => ({ value: mapConsultationService(s), label: s }));
  //  TODO use date picker for expected deadline

  return (
    <Flex w='100%' direction='column' px={{ base: '2rem', lg: '5rem' }} py='2rem'>
      <Stack direction={{ base: 'column', lg: 'row' }} mb={10} spacing={10}>
        <Box width={{ base: '100%', lg: '50%' }}>
          <Select
            name='services'
            localForm={localForm}
            isMulti
            options={servicesOptions}
            label='What services are needed?*'
          />
        </Box>

        <Stack direction='column' mb={10} spacing={10}>
          <RadioBox
            name='budget'
            label="What's your budget range?*"
            options={['< $5k', '$5k - $20k', '$20k - $50k', '$50k +', 'Not Sure']}
            stack='vertical'
            localForm={localForm}
          />

          <Input label='Expected Deadline*' name='expectedDeadline' localForm={localForm} />
        </Stack>
      </Stack>
      <FormNavigation handleBack={handleBack} handleNext={handleSubmit(onNext, handleError(toast))} />
    </Flex>
  );
};

export default StepThree;
