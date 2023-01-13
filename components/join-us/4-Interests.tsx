import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Flex, Button, GridItem, SimpleGrid, Textarea, useToast } from '@raidguild/design-system';
import { useForm } from 'react-hook-form';
import { useJoinState } from '../../context/joinState';

interface Props {
  handleBack: () => void;
  handleNext: () => void;
}

const inputs = [
  {
    label: 'Now prithee, Apprentice; tell us of your passions & desires!*',
    placeholder: 'What are you into?',
    name: 'passion',
  },
  {
    label: 'How doth entertain yourself? A curious book, swift blog or intelligent podcast?*',
    placeholder: 'Favorite media',
    name: 'favoriteMedia',
  },
  {
    label: "Of the unnumber'd idle pebbles, what of Crypto thrills you most?*",
    placeholder: 'Tell us which subset of Crypto excites you most',
    name: 'thrills',
  },
  {
    label: 'State your interest, Apprentice, in joining the Guild.*',
    placeholder: "Let us be well inform'd of your intentions",
    name: 'interest',
  },
];

const validationSchema = Yup.object().shape({
  passion: Yup.string().required(),
  favoriteMedia: Yup.string().required(),
  thrills: Yup.string().required(),
  interest: Yup.string().required(),
});

const StepFour = ({ handleNext, handleBack }: Props) => {
  const { joinState, setJoinState } = useJoinState();
  const localForm = useForm({ resolver: yupResolver(validationSchema) });
  const toast = useToast();
  const { handleSubmit, reset } = localForm;

  useEffect(() => {
    reset({ ...joinState.stage5 });
    console.log('reset set', JSON.stringify(joinState.stage5));
  }, []);
  const onNext = (data: any) => {
    console.log('handleNext');
    console.log(`data: ${JSON.stringify(data)}`);
    setJoinState({
      ...joinState,
      stage5: { ...data },
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

  return (
    <Flex direction='column'>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 0, lg: 5 }}>
        {inputs.map((input) => (
          <GridItem minH='175px' key={input.label}>
            <Textarea label={input.label} placeholder={input.placeholder} name={input.name} localForm={localForm} />
          </GridItem>
        ))}
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
export default StepFour;