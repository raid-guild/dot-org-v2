import { Input, Box, SimpleGrid, Textarea } from '@raidguild/design-system';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  localForm: UseFormReturn;
}

export default function StepOne({ localForm }: Props) {
  const formFields = [
    {
      label: 'What is your name?',
      name: 'name',
      type: 'text',
      placeholder: 'Your Name',
      helperText: 'This is the name that will appear on your profile',
    },
    {
      label: 'What is your email?',
      name: 'email',
      type: 'email',
      placeholder: 'Your Email',
    },
    {
      label: 'Your Bio',
      name: 'bio',
      type: 'textarea',
      placeholder: 'A short introduction',
    },
    {
      label: 'What is your Discord handle?',
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

  return (
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
  );
}
