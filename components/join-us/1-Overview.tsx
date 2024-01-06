import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Flex, Input, SimpleGrid, Textarea, useToast } from '@raidguild/design-system';
import { useEffect } from 'react';
import { FieldErrorsImpl, FieldValues, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useJoinState } from '../../context/appState';

const inputs = [
  {
    label: 'Enter, Apprentice! What is your name?*',
    placeholder: 'Your Name',
    name: 'name',
    type: 'input',
  },
  {
    label: 'What is your email address?*',
    placeholder: 'Your email address',
    name: 'email',
    type: 'input',
  },
  {
    label: 'What is your profession? How do you busy yourself?*',
    placeholder: 'A short introduction',
    name: 'introduction',
    type: 'textarea',
  },
  {
    label: 'How do you like to learn?*',
    placeholder: 'Your learning goals',
    name: 'learningGoals',
    type: 'textarea',
  },
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required(),
  introduction: Yup.string().required(),
  learningGoals: Yup.string().required(),
});

interface Props {
  handleBack: () => void;
  handleNext: () => void;
}

const StepOne = ({ handleNext, handleBack }: Props) => {
  const { joinState, setJoinState } = useJoinState();
  const localForm = useForm({ resolver: yupResolver(validationSchema) });
  const toast = useToast();
  const { handleSubmit, reset } = localForm;

  useEffect(() => {
    reset({ ...joinState.join1 });
  }, []);

  const onNext = (data: FieldValues) => {
    setJoinState({
      ...joinState,
      join1: { ...data },
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
    <Flex direction='column' py={8}>
      <SimpleGrid spacing={{ base: 0, lg: 5 }} columns={{ base: 1, lg: 2 }}>
        {inputs.map((input) =>
          input.type === 'input' ? (
            <Input
              key={input.name}
              label={input.label}
              name={input.name}
              placeholder={input.placeholder}
              localForm={localForm}
              variant='solidOutline'
            />
          ) : (
            <Textarea
              key={input.name}
              label={input.label}
              name={input.name}
              placeholder={input.placeholder}
              localForm={localForm}
              variant='solidOutline'
              fontFamily='sans-serif'
            />
          ),
        )}
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
        <Button
          width='max-content'
          variant='bright'
          onClick={handleSubmit(onNext, onError)}
          fontWeight={500}
          fontFamily='spaceMono'>
          Next
        </Button>
      </Flex>
    </Flex>
  );
};

export default StepOne;
