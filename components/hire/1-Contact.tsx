import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAccount } from 'wagmi';
import { Input, Box, Button, VStack, SimpleGrid, Textarea, useToast } from '@raidguild/design-system';
import { useForm, FieldValues, FieldErrorsImpl } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useHireState } from '../../context/appState';

interface Props {}

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
  github: Yup.string().required(),
  twitter: Yup.string().required(),
  telegram: Yup.string().required(),
});

export default function StepOne({ handleNext, handleBack }: { handleNext: () => void; handleBack: () => void }) {
  const { hireState, setHireState } = useHireState();
  const { isConnected } = useAccount();
  const { data: session } = useSession();
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
  const onError = (data: FieldErrorsImpl) => {
    if (Object.keys(data).length > 0) {
      toast.error({
        title: 'Please fill in all required fields',
        iconName: 'alert',
      });
    }
  };

  if (!session || !isConnected) {
    return (
      <SiteLayout>
        <Stack mt='2rem' mx='auto' w='80%' spacing={10}>
          <Text>Please sign in with your wallet to continue</Text>
        </Stack>
      </SiteLayout>
    );
  }
  return (
    <VStack>
      <SimpleGrid columns={2} gap='2rem' w='100%'>
        {formFields.map((field) => {
          if (field.type === 'textarea') {
            return (
              <Box key={field.name} gridColumn='span 2'>
                <Textarea name={field.name} localForm={localForm} label={field.label} placeholder={field.placeholder} />
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
            />
          );
        })}
      </SimpleGrid>

      <SimpleGrid mt='2rem' gridTemplateColumns={['1fr', null, null, '1fr 1fr']} gap={2}>
        <Button onClick={handleBack} variant='outline'>
          Back
        </Button>
        <Button onClick={handleSubmit(onNext, onError)}>Next</Button>
      </SimpleGrid>
    </VStack>
  );
}
