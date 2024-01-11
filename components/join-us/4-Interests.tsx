import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Flex, GridItem, SimpleGrid, Textarea, useToast } from '@raidguild/design-system';
import { useEffect } from 'react';
import { FieldErrorsImpl, FieldValues, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import GradientShiftButton from '../atoms/GradientShiftButton';
import { useJoinState } from '../../context/appState';

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
    name: 'cryptoThrills',
  },
  {
    label: 'State your interest, Apprentice, in joining the Guild.*',
    placeholder: "Let us be well inform'd of your intentions",
    name: 'whyRaidguild',
  },
];

const validationSchema = Yup.object().shape({
  passion: Yup.string().required(),
  favoriteMedia: Yup.string().required(),
  cryptoThrills: Yup.string().required(),
  whyRaidguild: Yup.string().required(),
});

const StepFour = ({ handleNext, handleBack }: Props) => {
  const { joinState, setJoinState } = useJoinState();
  const localForm = useForm({ resolver: yupResolver(validationSchema) });
  const toast = useToast();
  const { handleSubmit, reset } = localForm;

  useEffect(() => {
    reset({ ...joinState.join4 });
  }, []);
  const onNext = (data: FieldValues) => {
    setJoinState({
      ...joinState,
      join4: { ...data },
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
      <SimpleGrid columns={{ base: 1, lg: 2 }} placeItems='center' gap={{ base: 8, lg: 2 }}>
        {inputs.map((input) => (
          <GridItem minH='175px' key={input.label} maxW='520px'>
            <Textarea
              label={input.label}
              placeholder={input.placeholder}
              name={input.name}
              localForm={localForm}
              variant='solidOutline'
              fontFamily='sans-serif'
            />
          </GridItem>
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
    </Flex>
  );
};
export default StepFour;
