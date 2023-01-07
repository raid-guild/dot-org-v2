import { SimpleGrid, Input } from '@raidguild/design-system';
import { UseFormReturn } from 'react-hook-form';

const inputs = [
  {
    label: 'What is your Discord handle?',
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
  localForm: UseFormReturn;
}
// TODO handle address & ens fetch

const StepTwo = ({ localForm }: Props) => {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 0, lg: 5 }}>
      {inputs.map((input) => (
        <Input
          key={input.label}
          label={input.label}
          name={input.name}
          placeholder={input.placeholder}
          localForm={localForm}
        />
      ))}
    </SimpleGrid>
  );
};

export default StepTwo;
