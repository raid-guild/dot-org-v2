import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Input, SimpleGrid, Textarea, VStack, Select, useToast, Option } from '@raidguild/design-system';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useHireState } from '../../context/appState';
import handleError from '../../utils/forms';
import FormNavigation from './FormNavigation';

import useReferrerTypes from '../../hooks/useReferrerTypes';

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
  {
    label: 'Where did you hear about us?',
    name: 'referredBy',
    type: 'select',
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
  referredBy: Yup.array().of(
    Yup.object().shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    }),
  ),
});

export default function StepOne({ handleNext, handleBack }: Props) {
  const { hireState, setHireState } = useHireState();
  const localForm = useForm({ resolver: yupResolver(validationSchema) });
  const toast = useToast();
  const { data: referrerTypes } = useReferrerTypes();
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
      <SimpleGrid columns={{ base: 1, md: 2 }} gap='2rem' w='100%' mb='2rem' fontFamily='texturina'>
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
                  variant='solidOutline'
                  fontFamily='texturina'
                />
              </Box>
            );
          }
          if (field.type === 'select') {
            return (
              <Select
                name='services'
                localForm={localForm}
                options={referrerTypes as Option[]}
                placeholder={field.placeholder}
                label={field.label}
              />
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
              variant='solidOutline'
            />
          );
        })}
      </SimpleGrid>
      <FormNavigation handleBack={handleBack} handleNext={handleSubmit(onNext, handleError(toast))} />
    </VStack>
  );
}
