import { Flex, SimpleGrid, Input, Textarea } from '@raidguild/design-system';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  localForm: UseFormReturn;
}

const inputs = [
  {
    label: 'Enter, Apprentice! What is your name?',
    placeholder: 'Your Name',
    name: 'name',
    type: 'input',
  },
  {
    label: 'What is your email address?',
    placeholder: 'Your email address',
    name: 'email',
    type: 'input',
  },
  {
    label: 'What is your profession? How do you busy yourself?',
    placeholder: 'A short introduction',
    name: 'bio',
    type: 'textarea',
  },
  {
    label: 'How do you like to learn?',
    placeholder: 'Your learning goals',
    name: 'goals',
    type: 'textarea',
  },
];

const StepOne = ({ localForm }: Props) => (
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
  </Flex>
);

export default StepOne;
