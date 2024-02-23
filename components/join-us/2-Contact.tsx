import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Flex, Input, SimpleGrid, useToast } from '@raidguild/design-system';
import { useEffect } from 'react';
import { FieldErrorsImpl, FieldValues, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useJoinState } from '../../context/appState';
import GradientShiftButton from '../atoms/GradientShiftButton';

const inputs = [
  {
    label: 'What is your Discord handle?*',
    placeholder: 'Include the unique identifier after the #, no @',
    name: 'discord',
  },
  {
    label: 'What is your Github Handle?',
    placeholder: 'no @',
    name: 'github',
  },
  {
    label: 'And of Telegram?',
    placeholder: 'no @',
    name: 'telegram',
  },
  {
    label: 'Your well flown Twitter bird?',
    placeholder: 'no @',
    name: 'twitter',
  },
];

interface Props {
  handleBack: () => void;
  handleNext: () => void;
}

const validationSchema = Yup.object().shape({
  discord: Yup.string().required(),
  github: Yup.string(),
  telegram: Yup.string(),
  twitter: Yup.string(),
});

const StepTwo = ({ handleBack, handleNext }: Props) => {
  const { joinState, setJoinState } = useJoinState();
  const localForm = useForm({ resolver: yupResolver(validationSchema) });
  const toast = useToast();
  const { handleSubmit, reset } = localForm;

  useEffect(() => {
    reset({ ...joinState.join2 });
  }, []);

  const onNext = (data: FieldValues) => {
    setJoinState({
      ...joinState,
      join2: {
        ...data,
      },
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
  return (
    <Box py={8}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 0, lg: 5 }}>
        {inputs.map((input) => (
          <Input
            key={input.label}
            label={input.label}
            name={input.name}
            placeholder={input.placeholder}
            localForm={localForm}
            variant='solidOutline'
          />
        ))}
      </SimpleGrid>

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
    </Box>
  );
};

export default StepTwo;
