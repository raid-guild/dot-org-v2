import { useEffect } from 'react';
import { Input, Box, VStack, SimpleGrid, Textarea, useToast, defaultTheme } from '@raidguild/design-system';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useHireState } from '../../context/appState';
import FormNavigation from './FormNavigation';
import handleError from '../../utils/forms';

interface Props {
  handleBack: () => void;
  handleNext: () => void;
}

const formFields = [
  {
    label: 'What is your name?*',
    name: 'name',
    type: 'text',
    placeholder: 'Your Name',
    helperText: 'This is the name that will appear on your profile',
  },
  {
    label: 'What is your email?*',
    name: 'email',
    type: 'email',
    placeholder: 'Your Email',
  },
  {
    label: 'Your Bio*',
    name: 'bio',
    type: 'textarea',
    placeholder: 'A short introduction',
  },
  {
    label: 'What is your Discord handle?*',
    name: 'discord',
    type: 'text',
    placeholder: 'Your Discord',
  },
  {
    label: 'What say of your Github Handle?',
    name: 'github',
    type: 'text',
    placeholder: 'Your Github',
  },
  {
    label: 'and yon well flown Tweeter Bird?',
    name: 'twitter',
    type: 'text',
    placeholder: 'Your Twitter',
  },
  {
    label: 'and your Telegram?',
    name: 'telegram',
    type: 'text',
    placeholder: 'Your Telegram',
  },
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required(),
  bio: Yup.string().required(),
  discord: Yup.string().required(),
  github: Yup.string(),
  twitter: Yup.string(),
  telegram: Yup.string(),
});

export default function StepOne({ handleNext, handleBack }: Props) {
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

  return (
    <VStack py={8}>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap='2rem' w='100%' mb='2rem'>
        {formFields.map((field) => {
          if (field.type === 'textarea') {
            return (
              <Box key={field.name} gridColumn={{ base: 1, md: 'span 2' }}>
                <Textarea
                  name={field.name}
                  localForm={localForm}
                  label={field.label}
                  placeholder={field.placeholder}
                  key={field.name}
                  border={`1px solid ${defaultTheme.colors.primary[400]}`}
                  _focus={{ border: `1.5px solid ${defaultTheme.colors.purple[400]}` }}
                  p={4}
                  borderRadius={0}
                  variant='unstyled'
                />
              </Box>
            );
          }
          return (
            <Input
              key={field.name}
              type={field.type}
              name={field.name}
              localForm={localForm}
              label={field.label}
              placeholder={field.placeholder}
              border={`1px solid ${defaultTheme.colors.primary[400]}`}
              _focus={{ border: `1.5px solid ${defaultTheme.colors.purple[400]}` }}
              p={4}
              borderRadius={0}
              variant='unstyled'
            />
          );
        })}
      </SimpleGrid>
      <FormNavigation handleBack={handleBack} handleNext={handleSubmit(onNext, handleError(toast))} />
    </VStack>
  );
}
