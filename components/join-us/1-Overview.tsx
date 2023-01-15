import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Flex, SimpleGrid, Input, Textarea, Button, useToast } from '@raidguild/design-system';
import { useForm } from 'react-hook-form';
import { useJoinState } from '../../context/appState';

interface Props {
  state: any;
}

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

// todo: need to use app context for each stage

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required(),
  introduction: Yup.string().required(),
  learningGoals: Yup.string().required(),
});

const StepOne = ({ handleNext, handleBack }: any) => {
  const { joinState, setJoinState } = useJoinState();
  const localForm = useForm({ resolver: yupResolver(validationSchema) });
  const toast = useToast();
  const { handleSubmit, reset } = localForm;

  useEffect(() => {
    reset({ ...joinState.join1 });
    console.log('reset set', JSON.stringify(joinState.join1));
  }, []);

  const onNext = (data: any) => {
    console.log('handleNext');
    console.log(`data: ${JSON.stringify(data)}`);
    setJoinState({
      ...joinState,
      join1: { ...data },
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
    <Flex direction='column'>
      <SimpleGrid spacing={{ base: 0, lg: 5 }} columns={{ base: 1, lg: 2 }}>
        {inputs.map((input) =>
          input.type === 'input' ? (
            <Input label={input.label} name={input.name} placeholder={input.placeholder} localForm={localForm} />
          ) : (
            <Textarea label={input.label} name={input.name} placeholder={input.placeholder} localForm={localForm} />
          ),
        )}
      </SimpleGrid>

      <Flex gap={4} justify='center' mt='2rem'>
        <Button onClick={handleBack} variant='outline'>
          Back
        </Button>
        <Button onClick={handleSubmit(onNext, onError)}>Next</Button>
      </Flex>
    </Flex>
  );
};

export default StepOne;
