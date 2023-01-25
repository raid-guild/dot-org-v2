import { useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Flex, Box, Stack, DatePicker, useToast, Select } from '@raidguild/design-system';
import { useHireState } from '../../context/appState';
import FormNavigation from './FormNavigation';
import RadioBox from '../atoms/RadioBox';
import { hireUsServices } from '../../utils/constants';
import handleError from '../../utils/forms';
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
  desiredDeliveryDate: Yup.string().required(),
});

const StepThree = ({ handleNext, handleBack }: Props) => {
  const { hireState, setHireState } = useHireState();
  const localForm = useForm({ resolver: yupResolver(validationSchema) });
  const toast = useToast();
  const { handleSubmit, reset } = localForm;

  useEffect(() => {
    const currData = {
      ...hireState.hire3,
      desiredDeliveryDate: hireState.hire3.desiredDeliveryDate
        ? new Date(hireState.hire3.desiredDeliveryDate)
        : new Date(),
    };

    reset({ ...currData });
  }, []);

  const onNext = (data: FieldValues) => {
    setHireState({
      ...hireState,
      hire3: { ...data },
    });
    handleNext();
  };
  const handleDateChange = (date: any) => {
    localForm.setValue('desiredDeliveryDate', date);
  };
  const servicesOptions = hireUsServices.map((s: string) => ({ value: mapConsultationService(s), label: s }));

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
          <DatePicker
            label='Expected Deadline*'
            name='desiredDeliveryDate'
            localForm={localForm}
            onChange={handleDateChange}
          />
        </Stack>
      </Stack>
      <FormNavigation handleBack={handleBack} handleNext={handleSubmit(onNext, handleError(toast))} />
    </Flex>
  );
};

export default StepThree;
