import { Flex, GridItem, SimpleGrid, Textarea } from '@raidguild/design-system';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  handleBack: () => void;
  handleNext: () => void;
}

const inputs = [
  {
    label: 'Now prithee, Apprentice; tell us of your passions & desires!',
    placeholder: 'What are you into?',
    name: 'passion',
  },
  {
    label: 'How doth entertain yourself? A curious book, swift blog or intelligent podcast?',
    placeholder: 'Favorite media',
    name: 'favoriteMedia',
  },
  {
    label: "Of the unnumber'd idle pebbles, what of Crypto thrills you most?",
    placeholder: 'Tell us which subset of Crypto excites you most',
    name: 'thrills',
  },
  {
    label: 'State your interest, Apprentice, in joining the Guild.',
    placeholder: "Let us be well inform'd of your intentions",
    name: 'interest',
  },
];

const StepFour = ({ handleNext, handleBack }: Props) => (
  <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 0, lg: 5 }}>
    {inputs.map((input) => (
      <GridItem minH='175px' key={input.label}>
        <Textarea label={input.label} placeholder={input.placeholder} name={input.name} localForm={localForm} />
      </GridItem>
    ))}
  </SimpleGrid>
);

export default StepFour;
