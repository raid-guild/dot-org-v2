import { yupResolver } from '@hookform/resolvers/yup';
import { Box, DatePicker, Select, SimpleGrid, Stack, VStack, useToast } from '@raidguild/design-system';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useHireState } from '../../context/appState';
import { hireUsServices } from '../../utils/constants';
import handleError from '../../utils/forms';
import { mapConsultationService } from '../../utils/mapping';
import RadioBox from '../atoms/RadioBox';
import FormNavigation from './FormNavigation';
import 'react-datepicker/dist/react-datepicker.css';

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
  const { handleSubmit, reset, watch } = localForm;

  const desiredDeliveryDate = watch('desiredDeliveryDate');

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
  const handleDateChange = () => {
    console.log(desiredDeliveryDate);
    if (new Date() > desiredDeliveryDate) {
      toast.error({ title: 'Please choose a future date', iconName: 'alert' });
    }
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
          <Box w='50%'>
            <DatePicker
              label='Expected Deadline*'
              name='desiredDeliveryDate'
              localForm={localForm}
              selected={desiredDeliveryDate}
              onCalendarClose={handleDateChange}
            />
          </Box>
        </Stack>
      </SimpleGrid>
      <FormNavigation handleBack={handleBack} handleNext={handleSubmit(onNext, handleError(toast))} />
    </VStack>
  );
};

export default StepThree;
