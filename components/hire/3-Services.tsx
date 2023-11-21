import { useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Flex, Box, Stack, DatePicker, useToast, Select, VStack, SimpleGrid } from '@raidguild/design-system';
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
  services: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      }),
    )
    .min(1)
    .required(),
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
    if (new Date() > date) {
      toast.error({ title: 'Please choose a future date', iconName: 'alert' });
      return;
    }
    localForm.setValue('desiredDeliveryDate', date);
  };
  const servicesOptions = hireUsServices.map((s: string) => ({ value: mapConsultationService(s), label: s }));

  return (
    <VStack py={8}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 0, lg: 5 }} w='100%' mb='2rem'>
        <Box width='100%'>
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
      </SimpleGrid>
      <FormNavigation handleBack={handleBack} handleNext={handleSubmit(onNext, handleError(toast))} />
    </VStack>
  );
};

export default StepThree;
